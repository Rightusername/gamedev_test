/* eslint-disable */

const fs = require('fs');
const path = require('path');
import { getAllFiles, findInFile } from './util/helpers';
const appRoot = path.resolve(__dirname, './../')


test('files should not contain not FIXED issues', async () => {
  let files = getAllFiles(appRoot, []);
  let notFixedFiles = null;
  files.forEach(file => {
    if(findInFile(file, /FIX/g)) {
      if(notFixedFiles == null) {
        notFixedFiles = [];
      }
      notFixedFiles.push( file );
    }
  })
  if (notFixedFiles) {
    console.log('NOT fixed files ', notFixedFiles);
  }

  expect(notFixedFiles).toBeFalsy()
}, 5000)

