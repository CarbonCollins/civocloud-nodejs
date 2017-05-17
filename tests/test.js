const path = require('path');

const Civo = require('../index');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const fakecivo = new Civo('wrong key');
const civo = new Civo(process.env.civo_apiToken);


civo.listNetworks().then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});

fakecivo.listNetworks().then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
