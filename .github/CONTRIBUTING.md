# How to contribute

This just contains some information if you are looking to contribute to the package either for a bug fix, missing feature, missing documentation, or anything else. Most of this information is about tooling and general coding conventions for the package.

## Tooling & Services

There are several tools and services used within this package to (hopefully) improve the code base and to make developing this package a bit easier. 

### Linter

[ESLint](https://eslint.org/) is used for Linting in this application and uses [.eslintrc.json](./.eslintrc.json) to configure this.

if you want to run the linter on its own run the following:
```
yarn run lint
```

### Task Runner

this package uses [gulp](https://gulpjs.com/) as its task runner to perform build tasks and generate documentation.

an example task is to regenerate the documentation you can run:
```
gulp generateDocs
```
or
```
yarn run generateDocs
```

### Transpiling

this project uses [Babel](https://babeljs.io/) which transpiles the [ES6 source](src) into an [ES5 library](lib/es5) for use on older versions of Node.JS.
This can be run

to build source you can run:
```
gulp generate-lib
```
or
```
yarn run generateLib
```

### Testing & Coverage

Tests are run using the [Mocha](https://mochajs.org/) framework with the [Chai](http://www.chaijs.com/) assertion library.
Test coverage is performed using the [Istanbul](https://istanbul.js.org/) library and outputs a html report normally found in the coverage directory.

[Travis-CI](https://travis-ci.org/) is also used to run tests automatically when committing to the GitHub repository.

if you want to run the test suite then run the following (a coverage report is done at the same time):
```
yarn run test
```

### Code Analysis & Metrics

this project also integrated with [CodeClimate](https://codeclimate.com/) to perform code analysis and to provide metrics on code quality and maintainability. This is done automatically when committing to the GitHub repository and pulls in the test results from [Travis-CI](https://travis-ci.org/) to provide coverage analysis.
