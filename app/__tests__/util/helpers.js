const fs = require('fs');
const path = require('path');

export const getAllFiles = function(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
};

export const findInFile = function(filePath, query) {
  if (filePath.match(/spec.js$/)) {
    return false;
  }
  let matched = false;
  let contents = fs.readFileSync(filePath, 'utf8')

  if (contents.match(query)) {
    matched = true;
  } else {
    matched = false;
  }
  return matched;
};
