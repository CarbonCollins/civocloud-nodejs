'use strict';

const expect = require('chai').expect;
const EventEmitter = require('promise-once-events');

const CivoAPIStub = require('./stubs/civoAPI');
const CivoCloud = require('../index');
const eventEmitter = new EventEmitter();

const civoStub = new CivoAPIStub(eventEmitter);
civoStub.listen(3000);

describe('civocloud-nodejs test suite', () => {
  describe('package tests', () => {
    it('package exports CivoAPI class', () => {
      expect(CivoCloud).to.be.an('function', 'package should export the CivoAPI class constructor');
    });
    describe('package endpoint tests', () => {
      it('endpoint defaults to civo v2 api url', (done) => {
        try {
          const civo = new CivoCloud('noApiToken');
          expect(civo.endpoint).to.exist;
          expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
          expect(civo.endpoint).to.be.equal('https://api.civo.com/v2', 'civo.endpoint URL should be "https://api.civo.com/v2"');
          done();
        } catch(err) {
          done(err);
        }
      });
      it('custom endpoint correctly defined', (done) => {
        try {
          const civo = new CivoCloud('noApiToken', 'customEndpoint');
          expect(civo.endpoint).to.exist;
          expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
          expect(civo.endpoint).to.be.equal('customEndpoint', 'civo.endpoint URL should be "customEndpoint"');
          done();
        } catch(err) {
          done(err);
        }
      });
    });
    describe('package apiToken tests', () => {
      it('valid apiToken input test', () => {
        const civo = new CivoCloud('noApiToken');
        expect(civo.apiToken).to.exist;
        expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
        expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');
      });
      it('invalid apiToken input test (undefined apiToken)', (done) => {
        try {
          const civoNoKey = new CivoCloud();
          expect(civoNoKey.apiToken).to.not.exist;
          done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
        } catch(err) {
          expect(err).to.exist;
          expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
          expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
          done();
        }
      });
      it('invalid apiToken input test (defined empty apiToken)', (done) => {
        try {
          const civoEmptyKey = new CivoCloud('');
          expect(civoEmptyKey.apiToken).to.exist;
          expect(civoEmptyKey.apiToken).to.be.equal('', 'apiToken should be an empty string for test');
          done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
        } catch(err) {
          expect(err).to.exist;
          expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
          expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
          done();
        }
      });
    });
  });

  describe('API tests', () => {
    const validCivo = new CivoCloud('validAPIKey', 'http://localhost:3000');
    const invalidCivo = new CivoCloud('invalidAPIKey', 'http://localhost:3000');

    describe('SSH Keys API tests', () => { // ----- SSH KEYS TESTS
      describe('listSSHKeys()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listSSHKeys()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listSSHKeys() should be a GET request');
            expect(request.url).to.be.equal('/sshkeys', 'listSSHKeys() should call "/sshkeys" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getSSHKeys.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listSSHKeys()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listSSHKeys() should be a GET request');
            expect(request.url).to.be.equal('/sshkeys', 'listSSHKeys() should call "/sshkeys" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('uploadSSHKey()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.uploadSSHKey('name', 'ssh-rsa AAAAAA==')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'uploadSSHKeys() should be a POST request');
            expect(request.url).to.be.equal('/sshkeys', 'uploadSSHKeys() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('name', 'expects body to contain name');
            expect(request.body.name).to.be.equal('name', 'the "name" body field did not match');
            expect(bodyKeys).to.include('public_key', 'expects body to contain public_key');
            expect(request.body.public_key).to.be.equal('ssh-rsa AAAAAA==', 'the "public_key" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postSSHKey.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.uploadSSHKey('name', 'ssh-rsa AAAAAA==')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('POST', 'uploadSSHKeys() should be a POST request');
            expect(request.url).to.be.equal('/sshkeys', 'uploadSSHKeys() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('name', 'expects body to contain name');
            expect(request.body.name).to.be.equal('name', 'the "name" body field did not match');
            expect(bodyKeys).to.include('public_key', 'expects body to contain public_key');
            expect(request.body.public_key).to.be.equal('ssh-rsa AAAAAA==', 'the "public_key" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid private_key', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.uploadSSHKey('name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'uploadSSHKeys() should be a POST request');
            expect(request.url).to.be.equal('/sshkeys', 'uploadSSHKeys() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(bodyKeys).to.include('name', 'expects body to contain name');
            expect(request.body.name).to.be.equal('name', 'the "name" body field did not match');
            expect(bodyKeys).to.not.include('public_key', 'expects body to contain public_key');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidSSHKey), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid name', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.uploadSSHKey()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'uploadSSHKeys() should be a POST request');
            expect(request.url).to.be.equal('/sshkeys', 'uploadSSHKeys() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
            expect(bodyKeys).to.not.include('name', 'expects body to not contain name');
            expect(bodyKeys).to.not.include('public_key', 'expects body to not contain public_key');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('deleteSSHKey()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteSSHKey('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
            expect(request.method).to.be.equal('DELETE', 'deleteSSHKey() should be a DELETE request');
            expect(request.url).to.be.equal('/sshkeys', 'deleteSSHKey() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteSSHKey.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.deleteSSHKey('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('DELETE', 'deleteSSHKey() should be a DELETE request');
            expect(request.url).to.be.equal('/sshkeys', 'deleteSSHKey() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteSSHKey()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteSSHKey() should be a DELETE request');
            expect(request.url).to.be.equal('/sshkeys', 'deleteSSHKey() should call "/sshkeys" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Network API tests', () => { // ----- NETWORK API TESTS
      describe('listNetworks()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listNetworks()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listNetworks() should be a GET request');
            expect(request.url).to.be.equal('/networks', 'listNetworks() should call "/networks" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getNetworks.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listNetworks()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listNetworks() should be a GET request');
            expect(request.url).to.be.equal('/networks', 'listNetworks() should call "/networks" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('createNetworks()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createNetwork('name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
            expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(bodyKeys).to.include('label', 'expects body to contain label');
            expect(request.body.label).to.be.equal('name', 'the "label" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postNetworks.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.createNetwork('name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
            expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(bodyKeys).to.include('label', 'expects body to contain label');
            expect(request.body.label).to.be.equal('name', 'the "label" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid label', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createNetwork()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
            expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
            expect(bodyKeys).to.not.include('label', 'expects no label to be sent');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('optional region', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createNetwork('name', 'lon1')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
            expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
            expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, 'no body data should be recived');
            expect(bodyKeys).to.include('label', 'expects no label to be sent');
            expect(request.body.label).to.be.equal('name', 'optional region was not in the body');
            expect(bodyKeys).to.include('region', 'expects no label to be sent');
            expect(request.body.region).to.be.equal('lon1', 'optional region was not in the body');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postNetworks.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('renameNetwork()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'new name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
            expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
            expect(bodyKeys).to.include('label', 'expects body to contain label');
            expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putNetworks.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'new name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
            expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
            expect(bodyKeys).to.include('label', 'expects body to contain label');
            expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid label', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
            expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
            expect(bodyKeys).to.not.include('label', 'expects body to not contain label');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.renameNetwork('invalidId', 'new name')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
            expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
            expect(bodyKeys).to.include('label', 'expects body to contain label');
            expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('invalidId', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('no params', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.renameNetwork()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
            expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            expect(bodyKeys).to.not.include('label', 'expects body to not contain label');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, 'one parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to not specify an id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter should be empty');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('deleteNetwork()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
            expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
            expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteNetworks.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.deleteNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
            expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteNetwork()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
            expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Snapshot API tests', () => { // ----- SNAPSHOT API TESTS
      describe('listSnapshots()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listSnapshots()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listSnapshots() should be a GET request');
            expect(request.url).to.be.equal('/snapshots', 'listSnapshots() should call "/snapshots" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getSnapshots.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listSnapshots()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listSnapshots() should be a GET request');
            expect(request.url).to.be.equal('/snapshots', 'listSnapshots() should call "/snapshots" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('createSnapshot()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            expect(bodyKeys).to.include('safe', 'expects body to contain safe');
            expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            expect(bodyKeys).to.include('safe', 'expects body to contain safe');
            expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('missing optionals', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
            expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createSnapshot('test')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid name', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createSnapshot()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('undefined', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('updateSnapshot()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            expect(bodyKeys).to.include('safe', 'expects body to contain safe');
            expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            expect(bodyKeys).to.include('safe', 'expects body to contain safe');
            expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('missing optionals', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
            expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
            expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
            expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.updateSnapshot('test')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid name', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.updateSnapshot()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
            expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('name', 'expects parameters to specify an name');
            expect(request.params.name).to.be.equal('undefined', 'received name parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Firewall API tests', () => { // ----- FIREWALL TESTS
      describe('listFirewalls()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listFirewalls()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listFirewalls() should be a GET request');
            expect(request.url).to.be.equal('/firewalls', 'listFirewalls() should call "/firewalls" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getFirewalls.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listFirewalls()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listFirewalls() should be a GET request');
            expect(request.url).to.be.equal('/firewalls', 'listFirewalls() should call "/firewalls" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('createFirewall()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewall('test firewall')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createFirewall() should be a POST request');
            expect(request.url).to.be.equal('/firewalls', 'createFirewall() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(bodyKeys).to.include('name', 'expects body to contain name');
            expect(request.body.name).to.be.equal('test firewall', 'the "name" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postFirewalls.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.createFirewall('test firewall')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('POST', 'createFirewall() should be a POST request');
            expect(request.url).to.be.equal('/firewalls', 'createFirewall() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(bodyKeys).to.include('name', 'expects body to contain label');
            expect(request.body.name).to.be.equal('test firewall', 'the "name" body field did not match');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid name', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewall()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createFirewall() should be a POST request');
            expect(request.url).to.be.equal('/firewalls', 'createFirewalk() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
            expect(bodyKeys).to.not.include('name', 'expects no name to be sent');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('deleteFirewall()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteFirewall('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewall() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls', 'deleteFirewall() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteFirewalls.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.deleteFirewall('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewall() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls', 'deleteFirewall() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteFirewall()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewall() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls', 'deleteFirewall() should call "/firewalls" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('listFirewallRules()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listFirewallRules('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listFirewallRules() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'listFirewallRules() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect()
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getFirewallRules.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listFirewallRules('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listFirewallRules() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'listFirewallRules() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listFirewallRules()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listFirewallRules() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'listFirewallRules() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one params should be passed');
            expect(request.params.id).to.be.equal('undefined', 'No id should have been passed');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('createFirewallRule()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'tcp', '80', '80', 'inwards', '0.0.0.0/0')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(5, '5 body data keys should be recived');
            expect(request.body).to.have.all.keys('protocol', 'start_port', 'end_port', 'direction', 'cidr');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postFirewallRules.response), 'correct response was not returned'); done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.createFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'tcp', '80', '80', 'inwards', '0.0.0.0/0')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(5, '5 body data keys should be recived');
            expect(request.body).to.have.all.keys('protocol', 'start_port', 'end_port', 'direction', 'cidr');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('valid no optionals', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'tcp', '80')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(2, '2 body data keys should be recived');
            expect(request.body).to.have.all.keys('protocol', 'start_port');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postFirewallRules.response), 'correct response was not returned'); done();
          }).catch((err) => {
            done(err);
          });
        });
        it('valid no optionals', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'tcp', '80')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(2, '2 body data keys should be recived');
            expect(request.body).to.have.all.keys('protocol', 'start_port');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postFirewallRules.response), 'correct response was not returned'); done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid start_port', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'no body data keys should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidStartPort), 'correct response was not returned'); done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createFirewallRule()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createFirewallRule() should be a GET request');
            expect(request.url).to.be.equal('/firewalls/rules', 'createFirewallRule() should call "/firewalls/:id/rules" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'no body data keys should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(1, 'one param should be used');
            expect(request.params).to.have.all.keys('id');
            expect(request.params.id).to.be.equal('undefined', 'the parsed id is not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned'); done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('deleteFirewallRule()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewallRule() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls/rules', 'deleteFirewallRule() should call "/firewalls/:id/rules/:rule_id" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(paramKeys).to.include('rule_id', 'expects parameters to specify an rule_id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(request.params.rule_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received rule_id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteFirewalls.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.deleteFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') ]).then((data) => { const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewall() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls/rules', 'deleteFirewallRule() should call "/firewalls/:id/rules/:rule_id" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(paramKeys).to.include('rule_id', 'expects parameters to specify n rule_id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(request.params.rule_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received rule_id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid rule_id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteFirewallRule('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewallRule() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls/rules', 'deleteFirewallRule() should call "/firewalls/:id/rules/:rule_id" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(paramKeys).to.include('rule_id', 'expects parameters to specify an rule_id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(request.params.rule_id).to.be.equal('undefined', 'received rule_id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteFirewallRule()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteFirewallRule() should be a DELETE request');
            expect(request.url).to.be.equal('/firewalls/rules', 'deleteFirewallRule() should call "/firewalls/:id/rules/:rule_id" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(paramKeys).to.include('rule_id', 'expects parameters to specify an rule_id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
            expect(request.params.rule_id).to.be.equal('undefined', 'received rule_id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Instance Sizing API tests', () => { // ----- INSTANCE SIZING TESTS
      describe('listInstanceSizes()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listInstanceSizes()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listInstanceSizes() should be a GET request');
            expect(request.url).to.be.equal('/sizes', 'listInstanceSizes() should call "/sizes" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getSizes.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listInstanceSizes()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listInstanceSizes() should be a GET request');
            expect(request.url).to.be.equal('/sizes', 'listInstanceSizes() should call "/sizes" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Instance Regions API tests', () => { // ----- INSTANCE REGIONS TESTS
      describe('listRegions()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listRegions()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listRegions() should be a GET request');
            expect(request.url).to.be.equal('/regions', 'listRegions() should call "/regions" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getRegions.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listRegions()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listRegions() should be a GET request');
            expect(request.url).to.be.equal('/regions', 'listRegions() should call "/regions" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });
    describe('Instance Template API tests', () => { // ----- INSTANCE TEMPLATE TESTS
      describe('listTemplates()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listTemplates()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listTemplates() should be a GET request');
            expect(request.url).to.be.equal('/templates', 'listTemplates() should call "/templates" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getTemplates.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listTemplates()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listTemplates() should be a GET request');
            expect(request.url).to.be.equal('/templates', 'listTemplates() should call "/templates" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('createTemplate()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createTemplate('test template', 'ubuntu-16.04', 'test template', 'a testing template', 'root', '')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
            expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(6, '6 keys of body data should be recived');
            expect(request.body).to.have.all.keys('image_id', 'name', 'short_description', 'description', 'default_username', 'cloud_config');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postTemplates.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.createTemplate('test template', 'ubuntu-16.04', 'test template', 'a testing template', 'root', '')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
            expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(6, '6 keys of body data should be recived');
            expect(request.body).to.have.all.keys('image_id', 'name', 'short_description', 'description', 'default_username', 'cloud_config');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('optional vars removed', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createTemplate('test template', 'ubuntu-16.04')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
            expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(2, '2 keys of body data should be recived');
            expect(request.body).to.have.all.keys('image_id', 'name');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postTemplates.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('missing image_id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createTemplate('test template')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
            expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(1, '1 key of body data should be recived');
            expect(request.body).to.have.all.keys('name');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidImageId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('missing all params', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.createTemplate()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
            expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'no body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      describe('deleteTemplate()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteTemplate('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
            expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
            expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteTemplates.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.deleteTemplate('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
            expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid id', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.deleteTemplate()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
            expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
            const bodyKeys = Object.keys(request.body);
            expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('id', 'expects parameters to specify an id');
            expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

    describe('Account Quota API tests', () => { // ----- QUOTA TESTS
      describe('getQuota()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.getQuota()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'getQuota() should be a GET request');
            expect(request.url).to.be.equal('/quota', 'getQuota() should call "/quota" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getQuotas.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.getQuota()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'getQuota() should be a GET request');
            expect(request.url).to.be.equal('/quota', 'getQuota() should call "/quota" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });
  
    describe('Account Charges API tests', () => { // ----- ACCOUNT CHARGES TESTS
      describe('listCharges()', () => {
        it('valid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listCharges()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
            expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.response), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid auth', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            invalidCivo.listCharges()
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
            expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
            expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('valid date range (Strings)', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listCharges('2017-05-01T00:00:00Z', '2017-05-11T00:00:00Z')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
            expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
            expect(request.params.from).to.be.equal('2017-05-01T00:00:00Z', 'received from parameter was not the same as sent');
            expect(paramKeys).to.include('to', 'expects parameters to specify a to date string');
            expect(request.params.to).to.be.equal('2017-05-11T00:00:00Z', 'received to parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.responseTenDays), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('valid date range (Date() Object)', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listCharges(new Date('2017-05-01T00:00:00Z'), new Date('2017-05-11T00:00:00Z'))
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(200, 'returned status should be 200');
            expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
            expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
            expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
            expect(request.params.from).to.be.equal('2017-05-01T00:00:00.000Z', 'received from parameter was not the same as sent');
            expect(paramKeys).to.include('to', 'expects parameters to specify a to date string');
            expect(request.params.to).to.be.equal('2017-05-11T00:00:00.000Z', 'received to parameter was not the same as sent');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.responseTenDays), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
        it('invalid date range (missing one param)', (done) => {
          Promise.all([
            eventEmitter.once('received'),
            validCivo.listCharges('2017-05-01T00:00:00Z')
          ]).then((data) => {
            const request = data[0][0];
            const response = data[1];
            expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
            expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
            expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
            expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
            const paramKeys = Object.keys(request.params);
            expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
            expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
            expect(request.params.from).to.be.equal('2017-05-01T00:00:00Z', 'received from parameter was not the same as sent');
            expect(paramKeys).to.not.include('to', 'expects parameters to not specify a to date string');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidDateOrder), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });

  });
});
