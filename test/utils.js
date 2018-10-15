import test from 'ava';
import { formatFileName } from '../utils';

test('Returns an appropriate filename', t => {
  const output = formatFileName('hello.txt');
  t.is(output, 'hello.json');
});

test('Returns right filename with relative path', t => {
  const output = formatFileName('./hello.txt');
  t.is(output, 'hello.json');
});

test('Returns right filename with crazy dot syntax scheme', t => {
  const output = formatFileName('../../util/something/name.txt');
  t.is(output, 'name.json');
});
