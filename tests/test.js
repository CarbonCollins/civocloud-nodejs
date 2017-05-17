const Civo = require('../index');

const civo = new Civo('G8lNRyrEIFnXbl0br2mpOgZC21xoVcxOAnWT35nCgMRT3JYw0f');

civo.getInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
})
