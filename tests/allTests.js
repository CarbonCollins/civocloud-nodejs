'use strict';

const expect = require('chai').expect;
const http = require('http');
const EventEmitter = require('promise-once-events');
const qs = require('querystring');
const url = require('url');

const CivoCloud = require('../index');
const eventEmitter = new EventEmitter();

const responses = {
  getSSHKeys: {
    response: [ { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'test', public_key: 'AAAA', fingerprint: 'a6:79' } ]
  },
  postSSHKey: {
    response: { result: 'success', id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' }
  },
  getNetworks: {
    response: [ { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'Default', region: 'lon1', default: true, label: 'Default' }]
  }
}

const errors = {
  authentication: { code: 'authentication_invalid_key', reason: 'The API key provided is invalid, please contact us', result: 'Invalid API Key' },
  invalidSSHKey: { code: 'database_ssh_key_create', reason: 'The SSH key entered is invalid, please check it and try again', result: 'Server error' },
  emptySSHKey: { code: 'parameter_public_key_empty', reason: 'The public key was empty', result: 'Server error' },
  duplicateSSHKey: { code: 'sshkey_duplicate', reason: 'An SSH key with this name already exists, please choose another', result: 'Server error' },
  invalidName: { code: 'parameter_name_invalid', reason: 'The name supplied was empty', result: 'Server error' },
  emptyName: { code: 'parameter_name_invalid', reason: 'The name supplied was empty', result: 'Server error' },
}

const server = http.createServer((req, res) => {
  let data = '';
  let params = {};
  let body;
  let status = 500;

  req.on('data', (chunk) => { data += chunk; });

  req.on('end', () => {
    if (req.query && Object.keys(req.query).length > 0) {
      params = url.parse(req.url, true);
    }
    body = qs.parse(data) || {};


    res.writeHead(200);
    if (req.headers.authorization === 'Bearer validAPIKey') {
      if (req.method === 'GET') {
        switch (req.url) {
          case '/sshkeys':
            status = 200; res.write(JSON.stringify(responses.getSSHKeys.response)); break;
          case '/networks': 
            status = 200; res.write(JSON.stringify(responses.getNetworks.response)); break;
          default:
            status = 500; res.write('Response not written'); break;
        }
      } else if (req.method === 'POST') {
        switch (req.url) {
          case '/sshkeys':
            if (body.name && body.name === 'name' && body.public_key && body.public_key === 'ssh-rsa AAAAAA==') {
              status = 200; res.write(JSON.stringify(responses.postSSHKey.response)); break;
            } else if (body.name && body.name === 'name' && body.public_key && body.public_key === '') {
              status = 500; res.write(JSON.stringify(errors.invalidSSHKey)); break;
            } else if (body.name && body.name === 'name' && !body.public_key) {
              status = 500; res.write(JSON.stringify(errors.emptySSHKey)); break;
            } else {
              status = 500; res.write(JSON.stringify(errors.emptyName)); break;
            }
          default:
            status = 500; res.write('Response not written'); break;
        }
      } else {
        status = 500; res.write('method response not written');
      }
    } else {
      status = 401; res.write(JSON.stringify(errors.authentication));
    }
    eventEmitter.emit('received', {
      method: req.method,
      status,
      headers: req.headers,
      url: req.url,
      body,
      params
    });
    res.end()
  });
});

server.listen(3000);

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

    describe('SSH Keys API tests', () => {
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(responses.getSSHKeys.response), 'correct response was not returned');
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(errors.authentication), 'correct response was not returned');
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(responses.postSSHKey.response), 'correct response was not returned');
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(errors.authentication), 'correct response was not returned');
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(errors.emptySSHKey), 'correct response was not returned');
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
            expect(bodyKeys).to.not.include('name', 'expects body to contain name');
            expect(bodyKeys).to.not.include('public_key', 'expects body to contain public_key');
            expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(errors.emptyName), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
    });
    describe('Network API tests', () => {
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(responses.getNetworks.response), 'correct response was not returned');
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
            expect(JSON.stringify(response)).to.be.equal(JSON.stringify(errors.authentication), 'correct response was not returned');
            done();
          }).catch((err) => {
            done(err);
          });
        });
      });
      it('createNetworks()', () => {
        expect(true).to.be.false;
      });
      it('renameNetworks()', () => {
        expect(true).to.be.false;
      });
      it('deleteNetworks()', () => {
        expect(true).to.be.false;
      });
    });
  });
  it('force failed because not all tests have been written', () => {
    expect(true).to.be.false;
  });
});
