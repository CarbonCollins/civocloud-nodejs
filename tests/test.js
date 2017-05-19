const path = require('path');

const Civo = require('../index');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const fakecivo = new Civo('wrong key');
const civo = new Civo(process.env.civo_apiToken);
console.log(process.env.civo_apiToken);


civo.listNetworks().then((payload) => {
  console.log(payload);
  return civo.createNetwork('test');
}).then((payload) => {
  console.log(payload);
  return civo.renameNetwork('ad3668a4-2851-40c3-5f75-442d78129cd5', 'test2');
}).then((payload) => {
  console.log(payload);
  return civo.deleteNetwork('ad3668a4-2851-40c3-5f75-442d78129cd5');
}).then((payload) => {
  console.log(payload);
  return civo.listNetworks();
}).then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});

// fakecivo.createNetwork('test').then((payload) => {
//   console.log(payload);
// }).catch((err) => {
//   console.error(err);
// });
