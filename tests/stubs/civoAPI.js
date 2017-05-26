'use strict';

const http = require('http');
const qs = require('querystring');

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
      },
      getSizes: {
        response: [ { id: 0, name: 'g1.xsmall', nice_name: 'Extra Small', cpu_cores: 1, ram_mb: 1024, disk_gb: 25, description: 'Extra Small - 1GB RAM, 1 CPU Core, 25GB SSD Disk' } ]
      },
      getRegions: {
        response: [ { code: 'lon1' } ]
      },
      getCharges: {
        response: [ { code: 'instance-g1.small', label: 'test', from: '2017-04-23T18:07:00Z', to: '2017-05-01T13:46:40Z', num_hours: 0 } ],
        responseTenDays: [ { code: 'instance-g1.small', label: 'test', from: '2017-05-01T00:00:00Z', to: '2017-05-11T00:00:00Z', num_hours: 0 } ]
      }
    };
    this.errors = {
      authentication: { code: 'authentication_invalid_key', reason: 'The API key provided is invalid, please contact us', result: 'Invalid API Key' },
      invalidSSHKey: { code: 'database_ssh_key_create', reason: 'The SSH key entered is invalid, please check it and try again', result: 'Server error' },
      duplicateSSHKey: { code: 'sshkey_duplicate', reason: 'An SSH key with this name already exists, please choose another', result: 'Server error' },
      invalidName: { code: 'parameter_name_invalid', reason: 'The name supplied was empty', result: 'Server error' },
      invalidLabel: { code: 'parameter_label_invalid', reason: 'The label supplied was empty', result: 'Server error' },
      invalidId: { code: 'database_network_not_found', reason: 'Failed to find the network within the internal database', result: 'Resource not found' },
      invalidDateRange: { code: 'parameter_date_range_too_long', reason: 'The date range spanned more than 31 days', result: 'Server error' }
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
        if (req.url.includes('?')) {
          const urlSegments = req.url.split('?');
          params = qs.parse(urlSegments[1]);
          url = urlSegments[0]
        }

        const urlChips = req.url.split('/');
        if (urlChips.length > 2) {
          url = `/${urlChips[1]}`;
          switch(urlChips[1]) {
            case 'networks':
              params = Object.assign({}, params, {
                id: urlChips[2] || undefined
              });
              break;
            default:
              // no default code
          }
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
              case '/sizes': 
                status = 200; res.write(JSON.stringify(this.responses.getSizes.response)); break;
              case '/regions': 
                status = 200; res.write(JSON.stringify(this.responses.getRegions.response)); break;
              case '/charges': 
                if (params.to && params.from) {
                  status = 200; res.write(JSON.stringify(this.responses.getCharges.responseTenDays)); break;
                } else {
                  status = 200; res.write(JSON.stringify(this.responses.getCharges.response)); break;
                }
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
