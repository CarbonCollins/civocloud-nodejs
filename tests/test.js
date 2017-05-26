const path = require('path');

const Civo = require('../index');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const fakecivo = new Civo('wrong key');
const civo = new Civo(process.env.civo_apiToken);
console.log(process.env.civo_apiToken);

// civo.deleteNetwork('no')
// .then((payload) => {
//   console.log(payload);
// })

const dateNow = new Date('2017-05-11T00:00:00Z');
const dateTenDaysAgo = new Date('2017-05-01T00:00:00Z');

civo.listCharges(dateTenDaysAgo)
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
