'use strict';

const http = require('http');
const qs = require('querystring');
const url = require('url');

class civoAPIStub {
  constructor(event) {
    this.responses = {
      getSSHKeys: {
        response: [ { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'test', public_key: 'AAAA', fingerprint: 'a6:79' } ]
      },
      postSSHKey: {
        response: { result: 'success', id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' }
      },
      getNetworks: {
        response: [ { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'Default', region: 'lon1', default: true, label: 'Default' }]
      },
      postNetworks: { 
        response: { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'carbon-collins-xxxx-testregion-xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', result: 'success' }
      },
      putNetworks: {
        response: { id: 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', name: 'renamed', result: 'success' }
      },
      deleteNetworks: {
        response: { result: 'success' }
      }
    };
    this.errors = {
      authentication: { code: 'authentication_invalid_key', reason: 'The API key provided is invalid, please contact us', result: 'Invalid API Key' },
      invalidSSHKey: { code: 'database_ssh_key_create', reason: 'The SSH key entered is invalid, please check it and try again', result: 'Server error' },
      duplicateSSHKey: { code: 'sshkey_duplicate', reason: 'An SSH key with this name already exists, please choose another', result: 'Server error' },
      invalidName: { code: 'parameter_name_invalid', reason: 'The name supplied was empty', result: 'Server error' },
      invalidLabel: { code: 'parameter_label_invalid', reason: 'The label supplied was empty', result: 'Server error' },
      invalidId: { code: 'database_network_not_found', reason: 'Failed to find the network within the internal database', result: 'Resource not found' }
    };
    this.eventEmitter = event;
    this.server = http.createServer((req, res) => {
      let data = '';
      let params = {};
      let url = req.url;
      let body;
      let status = 500;

      req.on('data', (chunk) => { data += chunk; });

      req.on('end', () => {
        const urlChips = req.url.split('/');
        if (urlChips.length > 2) {
          url = `/${urlChips[1]}`;
          switch(urlChips[1]) {
            case 'networks':
              params = {
                id: urlChips[2] || undefined
              };
              break;
            default:
              params = {};
          }
        }

        if (req.query && Object.keys(req.query).length > 0) {
          params = url.parse(req.url, true);
        }

        body = qs.parse(data) || {};

        res.writeHead(200);
        if (req.headers.authorization === 'Bearer validAPIKey') {
          if (req.method === 'GET') {
            switch (url) {
              case '/sshkeys':
                status = 200; res.write(JSON.stringify(this.responses.getSSHKeys.response)); break;
              case '/networks': 
                status = 200; res.write(JSON.stringify(this.responses.getNetworks.response)); break;
              default:
                status = 500; res.write('Response not written'); break;
            }
          } else if (req.method === 'POST') {
            switch (url) {
              case '/sshkeys':
                if (body.name && body.name === 'name' && body.public_key && body.public_key === 'ssh-rsa AAAAAA==') {
                  status = 200; res.write(JSON.stringify(this.responses.postSSHKey.response)); break;
                } else if (body.name && body.name === 'name' && body.public_key && body.public_key === '') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidSSHKey)); break;
                } else if (body.name && body.name === 'name' && !body.public_key) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidSSHKey)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/networks':
                if (body.label && body.label === 'name' && body.region && body.region === 'lon1') {
                  status = 200; res.write(JSON.stringify(this.responses.postNetworks.response)); break;
                } else if (body.label && body.label === 'name') {
                  status = 200; res.write(JSON.stringify(this.responses.postNetworks.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidLabel)); break;
                }
              default:
                status = 500; res.write('Response not written'); break;
            }
          } else if (req.method === 'PUT') {
            switch (url) {
              case '/networks':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && body.label && body.label === 'new name') {
                  status = 200; res.write(JSON.stringify(this.responses.putNetworks.response)); break;
                } else if (params.id && params.id === 'invalidId') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidLabel)); break;
                }
            }
          } else if (req.method === 'DELETE') {
            switch (url) {
              case '/networks':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteNetworks.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              default:
                status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
            }
          } else {
            status = 500; res.write('method response not written');
          }
        } else {
          status = 401; res.write(JSON.stringify(this.errors.authentication));
        }
        this.eventEmitter.emit('received', {
          method: req.method,
          status,
          headers: req.headers,
          url: url,
          body,
          params
        });
        res.end()
      });
    });
  }

  listen() {
    this.server.listen(3000);
  }
}

module.exports = civoAPIStub;
