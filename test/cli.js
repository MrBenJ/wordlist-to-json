import sinon from 'sinon';
import mockery from 'mockery';
import test, { before, after } from 'ava';

let cliArgs;
let utilsMock;
let wordListToJsonMock;
let wordListToJsonCallback;
let fsMock;
let processExit;
let processCwd;

const file = 'abc.txt';

function mockProcess() {
  processExit = process.exit;
  processCwd = process.cwd;
  process.exit = sinon.spy();
  process.cwd = sinon.spy(() => '');
}

function restoreProcess() {
  process.exit = processExit;
  process.cwd = processCwd;
}

function resetSpies() {
  fsMock.writeFileSync.resetHistory();
  utilsMock.showHelp.resetHistory();
  wordListToJsonMock.resetHistory();
  process.exit.resetHistory();
  process.cwd.resetHistory();
}

function runCli(args = {}) {
  cliArgs = args;
  mockery.resetCache();
  resetSpies();
  require('../cli');
}

before(() => {
  mockProcess();

  mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  });

  mockery.registerMock('minimist', () => cliArgs);
  mockery.registerMock('fs', fsMock = {
    writeFileSync: sinon.spy()
  })
  mockery.registerMock('./utils', utilsMock = {
    log: sinon.spy(),
    showHelp: sinon.spy()
  });
  mockery.registerMock('./', wordListToJsonMock = sinon.spy(
    () => ({ then: (cb) => { wordListToJsonCallback = cb }})
  ));
});

after(() => {
  mockery.deregisterAll();
  mockery.disable();
  restoreProcess();
});

test('Should log help info if help flag used', t => {
  runCli({ help: true, file });
  t.is(utilsMock.showHelp.callCount, 1);
});

test('Should exit process if help flag used', t => {
  runCli({ help: true, file });
  t.is(process.exit.args[0][0], 0);
});

test('Should log help info if no file provided', t => {
  runCli();
  t.is(utilsMock.showHelp.callCount, 1);
});

test('Should exit process if no file provided', t => {
  runCli();
  t.is(process.exit.args[0][0], 0);
});

test('Should convert file to json', t => {
  runCli({ file });
  t.is(wordListToJsonMock.callCount, 1);
  t.is(wordListToJsonMock.args[0][0], file);
});

test('Should create object rather than array if value flag provided', t => {
  runCli({ file, value: true });
  t.deepEqual(wordListToJsonMock.args[0][1], { value: true });
});

test('Should write converted json to file', t => {
  runCli({ file });
  wordListToJsonCallback(['a', 'b', 'c']);
  t.is(fsMock.writeFileSync.callCount, 1);
  t.is(fsMock.writeFileSync.args[0][0], 'abc.json');
  t.is(fsMock.writeFileSync.args[0][1], '["a","b","c"]');
});

test('Should format json with value of space flag if provided', t => {
  runCli({ file, space: 1 });
  wordListToJsonCallback(['a', 'b', 'c']);
  t.is(fsMock.writeFileSync.args[0][1], '[\n "a",\n "b",\n "c"\n]');
});

test('Should log message when json file written', t => {
  runCli({ file });
  wordListToJsonCallback(['a', 'b', 'c']);
  t.is(utilsMock.log.args[0][0], 'File written!');
});
