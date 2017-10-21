'use strict';

const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const jsdoc2md = require('jsdoc-to-markdown');

gulp.task('generateDocs', () => {
  return fs.ensureDir(path.join(__dirname, './docs'))
    .then(() => { return jsdoc2md.render({ files: './lib/*.js' }); })
    .then((output) => {
      return fs.writeFile('docs/app.md', output);
    });
});
