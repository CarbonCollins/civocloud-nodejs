const Civo = require('../index');

const fakecivo = new Civo('wrong key');
const civo = new Civo('G8lNRyrEIFnXbl0br2mpOgZC21xoVcxOAnWT35nCgMRT3JYw0f');


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
