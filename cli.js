#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const args = require('minimist')(process.argv.slice(2));
const WordlistToJSON = require('./');
const Utils = require('./utils');

const { help, file, value, space = 0 } = args;

if (help || !file) {
  Utils.showHelp();
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
.then(() => Utils.log('File has been written to:', chalk.cyan.bold(`${fileName}.json`)))
.catch(error => console.error(error.message));
