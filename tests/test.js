const Civo = require('../index');

const fakecivo = new Civo('wrong key');
const civo = new Civo('G8lNRyrEIFnXbl0br2mpOgZC21xoVcxOAnWT35nCgMRT3JYw0f');


civo.uploadSSHKeyFile('test', '/home/carbon/.ssh/id_rsa.pub').then((payload) => {
  console.info(payload);
}).catch((err) => {
  console.error(err);
});

// civo.listSSHKeys().then((payload) => {
//   console.log(payload);
//   return civo.uploadSSHKey('test', 'AAAAB3NzaC1yc2EAAAADAQABAAACAQDMIrEkJT4eR1ogPlPubqjLreH8MX0Hq9IDgTSy+GQDI70J671qo7jsZsSF2aqqv7SsUmDv7VIlGKCHG08TWqwxOZQ+ZV+lN7VKrry4PYnk3MF3KfTcDlxB1/i2ePIuylZqRulVG9x/dxUojTFnkxGe31nMpnWkGEhh+bG4jUap9HuVOix7Uaewli6VklG42UsKHEhR+dbGjeBakTEKbr9zh8dbQ3/DU+6wDFV0YDjcM4O4wyk7fl6TaFl9KEqgFWkVus988OkA0gyyRjj2F33b1PBjVDGrLkBkqH7VJ1cF+F//eQLZK5+YqW+uB3D3vtlk3PTbqFMzqI3f6dw6mCWMah/6z4mvVF0//UaFgClUf+7se9zw6wP0a8SevrethvrbTWQZ3HBy4Zvvy21owt7kqZTRUolhcjE9lvluqMiKVT1VS6awiB/87mPJSE0VIWf37VLJfS2E+mxeq0bBBPD5GTHpOzxbn5jM74VTpLotjWYjPdRQKuIY67fmgEOYRboApcIQVxnbhtoknmCDvM2OBsxOUTzsYDDIwXu4NX2c8/mDeuq+K2stWsJvFjPI/2URLN0dYQAZcDY86RuXhB+41zktmyvPiSLg9UVIqo4IAiIC23O45cKHkM7Cqt6ULKG8gd89yfF7qgREYEIC6ooHcTMmCV6aAmrkj6ACW4xu7Q==');
// }).then((payload) => {
//   console.log(payload);
//   return civo.listSSHKeys()
// }).then((payload) => {
//   console.log(payload);
// }).catch((err) => {
//   console.error(err);
// });

// fakecivo.listSSHKeys().then((payload) => {
//   console.log(payload);
// }).catch((err) => {
//   console.error(err);
// });
