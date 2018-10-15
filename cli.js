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

const fileName = path.resolve(process.cwd(), file);

WordlistToJSON(fileName, { value }).then( output => {
  const outputFileName = Utils.formatFileName(fileName);

  fs.writeFileSync(
    path.resolve(process.cwd(), `./${outputFileName}`),
    JSON.stringify(output, undefined, +space)
  );
  Utils.log('File written!', chalk.cyan.bold(`./${outputFileName}`));
});
