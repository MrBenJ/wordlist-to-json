const fs = require("fs");

const WordListToJON = (filePath, { value } = {}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, buffer) => {
      if (error) {
        return reject(error);
      }
      const array = buffer.toString().split("\n");

      // If the --value flag is present, create a JSONObject
      // instead of a JSONArray
      if (value) {
        const output = {};
        array.forEach(word => {
          if (word) {
            output[word] = value;
          }
        });
        resolve(output);
        return;
      }

      // If there are any trailing falsy values at the end
      // of the JSONArray, remove them.
      while (!array[array.length - 1]) {
        array.pop();
      }
      resolve(array);
    });
  });
};

module.exports = WordListToJON;
