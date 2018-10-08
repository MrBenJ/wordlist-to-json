wordlist-to-json
================

## Convert wordlists to JSON format

Quickly convert a list of words to a JSON object or JSON array quickly with the command line.


## System Requirements

* Node v8 or higher
* npm v5 or higher
* A burning desire to turn a wordlist into a JSON object or JSON array

## Installation

```sh
npm install -g wordlist-to-json
```

Installing this module allows you to use this tool as a CLI tool:
```sh
$ wordlist-to-json --file "path/to/wordlist.txt"
```



## Usage

### CLI
Run `wordlist-to-json --help` for usage information.

### As a module

Because `fs.readFile` runs asynchronously, `wordlist-to-json` returns a `Promise`.

```js
const WordlistToJSON = require('wordlist-to-json');

WordListToJSON('path/to/list.txt').then( array => {
  console.log(array); // ['hello', 'list', 'of', 'words' ]
});

```

Because this module is Promise based, you can use it in an `async function` like this:
```js
import WordlistToJSON from 'wordlist-to-json';

async function SuperAwesomeAsyncFunction() {
  const obj = await WordListToJSON('path/to/file.txt', { value: 2 });
  return obj; // { hello: 2, list: 2, of: 2, words: 2 }
}

```
## Notes

This was a quick script that I created to help internationalize [`get-alex/alex`](https://www.github.com/get-alex/alex) - which is a pretty awesome project :D

Made with <3 by [@MrBenJ](https://www.github.com/MrBenJ).
