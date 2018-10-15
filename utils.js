const chalk = require('chalk');

const log = (...args) => console.log(...args);

const showHelp = () => {
  log(
    chalk.white.bold('wordlist-to-json'),
    chalk.cyan('Created with <3 by'),
    chalk.white.bold('@MrBenJ'),
    '\n',
    'Twitter: @MrBenJ5', 'https://www.twitter.com/MrBenJ5',
    '\n',
    'Github: @MrBenJ', 'https://www.github.com/MrBenJ'
  );
  log(
    'Turns a list of words into a JSON Array. Use the ',
    chalk.white.bold('--value '),
    'option to create a JSON object instead',
    '\n'
  );
  log(
    chalk.cyan('Usage: node index.js --file [filename] [options]')
  );
  log(
    chalk.white.bold('filename:'), 'A list of words separated by newline "\\n" characters');
  log(
    chalk.white.bold('--value [some_value]: '), 'Turns the list into an object instead of a JSON array.'
  );
  log(
    chalk.white.bold('--space [Number]'), 'Number of spaces for JSON array format. Default is 0 (minfied)'
  );
};

const formatFileName = fileName => {
  const nameArray = fileName.split('.');
  let name = nameArray[nameArray.length - 2];

  if (name.includes('/')) {
    const pathArray = name.split('/');
    name = pathArray[pathArray.length - 1];
  }
  return name + '.json';
};

module.exports = {
  log,
  showHelp,
  formatFileName
};
