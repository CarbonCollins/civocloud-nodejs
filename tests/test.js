const path = require('path');

const Civo = require('../index');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const fakecivo = new Civo('wrong key');
const civo = new Civo(process.env.civo_apiToken);
console.log(process.env.civo_apiToken);


civo.listCharges().then((payload) => {
  console.log(payload);
  return civo.listCharges('2017-05-21T13:46:40Z', new Date());
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
