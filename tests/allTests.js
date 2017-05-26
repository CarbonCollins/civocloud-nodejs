'use strict';

const expect = require('chai').expect;
const EventEmitter = require('promise-once-events');

const CivoAPIStub = require('./stubs/civoAPI');
const CivoCloud = require('../index');
const eventEmitter = new EventEmitter();

const civoStub = new CivoAPIStub(eventEmitter);
civoStub.listen(3000);

describe('civocloud-nodejs test suite', () => {
  before(() => {
    console.warn('Tests have not been written to fully cover code yet');
  });

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
      });
    });
  });
});
