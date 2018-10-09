import test from 'ava';
import path from 'path'
import WordlistToJSON from '../index';

test('Should import as a function', t => {
  const type = typeof WordlistToJSON;
  t.is(type, 'function');
});

test('Should convert a list of words', async t => {
  const array = await WordlistToJSON(
    path.resolve(__dirname, './test_list.txt')
  );

  t.deepEqual(array, [
    'hello',
    'test',
    'list',
    'of',
    'words'
  ]);
});

test('Should return an object if value is passed in', async t => {
  const obj = await WordlistToJSON(
    path.resolve(__dirname, './test_list.txt'),
    { value: 1 }
  );

  t.deepEqual(obj, {
    hello: 1,
    test: 1,
    list: 1,
    of: 1,
    words: 1
  });
});

test('Should not include empty array values for extra newlines', async t => {
  const arr = await WordlistToJSON(
    path.resolve(__dirname, './test_list.txt')
  );

  t.truthy(arr[arr.length - 1]);
});

test('Should throw an error if bad values are passed in', async t => {
  try {
    await WordlistToJSON('bad-stuff-here :(');
  } catch (error) {
    t.truthy(error);
  }
});
