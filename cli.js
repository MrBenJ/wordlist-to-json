#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));
const WordlistToJSON = require('./');

const { help, file, value, space = 0 } = args;

if (help || !file) {
  console.log(
    chalk.white.bold('wordlist-to-json'),
    chalk.cyan('Created with <3 by'),
    chalk.white.bold('@MrBenJ'),
    '\n',
    'Twitter: @MrBenJ5', 'https://www.twitter.com/MrBenJ5',
    '\n',
    'Github: @MrBenJ', 'https://www.github.com/MrBenJ'
  );
  console.log(
    'Turns a list of words into a JSON Array. Use the ',
    chalk.white.bold('--value '),
    'option to create a JSON object instead',
    '\n'
  );
  console.log(
    chalk.cyan('Usage: node index.js --file [filename] [options]'),
  );
  console.log(
    chalk.white.bold('filename:'), 'A list of words separated by newline "\\n" characters');
  console.log(
    chalk.white.bold('--value [some_value]: '), 'Turns the list into an object instead of a JSON array.',
    chalk.cyan.bold('[some_value]'), 'will become the value of all the words, which will turn into keys'
  );
  console.log(
    chalk.white.bold('--space [Number]'), 'Number of spaces for JSON array format. Default is 0 (minfied)'
  );
  process.exit(0);
  return;
}

const pathToFile = path.resolve(process.cwd(), file);
const fileName = path.basename(pathToFile).split('.').slice(0, -1).join('.');

WordlistToJSON(pathToFile, { value }).then( output => {
  fs.writeFileSync(
    path.resolve(process.cwd(), `${fileName}.json`),
    JSON.stringify(output, undefined, +space)
  );
})
.then(() => console.log('File has been written to:', chalk.cyan.bold(`${fileName}.json`)))
.catch(error => console.error(error.message));
