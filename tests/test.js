const Civo = require('../index');

const civo = new Civo('G8lNRyrEIFnXbl0br2mpOgZC21xoVcxOAnWT35nCgMRT3JYw0fp');

civo.getInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
})
