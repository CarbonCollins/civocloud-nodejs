const path = require('path');

const Civo = require('../index');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const fakecivo = new Civo('wrong key');
const civo = new Civo(process.env.civo_apiToken);
console.log(process.env.civo_apiToken);


civo.listNetworks()
.then((payload) => {
  console.log(payload);
  return civo.renameNetwork('f133ebbb-f888-4cef-6348-d95af3546923', 'renamed')
})
.then((payload) => {
  console.log(payload);
})
.catch((err) => {
  console.error(err);
});

// fakecivo.createNetwork('test').then((payload) => {
//   console.log(payload);
// }).catch((err) => {
//   console.error(err);
// });
