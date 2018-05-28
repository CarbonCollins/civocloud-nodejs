/* eslint prefer-arrow-callback: "off" */
/* eslint no-unused-expressions: "off" */

import jsdoc2md from 'jsdoc-to-markdown';
import * as diff from 'diff';
import fs from 'fs-extra';

const apiDocPath = 'docs/api.md';

export default function documentationSuite() {
  it('api.md is up-to-date', function docsUpToDate(done) {
    fs.pathExists(apiDocPath)
      .then((exists) => {
        if (exists) {
          return jsdoc2md.render({
            'no-cache': true,
            separators: true,
            files: ['src/*.mjs', 'src/**/*.mjs'],
            configure: '.jsdoc.json'
          });
        }
        return Promise.reject(new Error('api.md is not present in documentation folder'));
      })
      .then((output) => {
        fs.readFile(apiDocPath, 'utf-8')
          .then((fileString) => {
            const diffs = diff.diffLines(fileString, output, { ignoreWhitespace: true })
              .filter((change) => {
                return (change.added || change.removed);
              });
            if (diffs.length === 0) {
              done(null);
            } else {
              console.log(JSON.stringify({ d: diffs }));
              done(new Error('Existing api.md is not up to date with current code'));
            }
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });
}
