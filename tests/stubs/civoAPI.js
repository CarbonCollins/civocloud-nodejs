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
      },
      getQuotas: {
        response: { "id": "xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx", "default_user_id": "xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx", "default_user_email_address": "xxxxx@xxxxx.uk", "instance_count_limit": 16, "instance_count_usage": 2, "cpu_core_limit": 16, "cpu_core_usage": 3, "ram_mb_limit": 16384, "ram_mb_usage": 3072, "disk_gb_limit": 400, "disk_gb_usage": 75, "disk_volume_count_limit": 16, "disk_volume_count_usage": 2, "disk_snapshot_count_limit": 30, "disk_snapshot_count_usage": 0, "public_ip_address_limit": 16, "public_ip_address_usage": 2, "subnet_count_limit": 1, "subnet_count_usage": 1, "network_count_limit": 1, "network_count_usage": 1, "security_group_limit": 16, "security_group_usage": 4, "security_group_rule_limit": 160, "security_group_rule_usage": 4, "port_count_limit": 32, "port_count_usage": 3 }
      },
      getTemplates: {
        response: [ { "id": "centos-6", "name": "CentOS 6", "tenant": "", "short_description": "CentOS 6 - aiming to be compatible with RHEL 6", "description": "", "default_username": "centos" }, { "id": "centos-7", "name": "CentOS 7", "tenant": "", "short_description": "CentOS 7 - aiming to be compatible with RHEL 7", "description": "", "default_username": "centos" }, { "id": "coreos", "name": "CoreOS", "tenant": "", "short_description": "CoreOS - lightweight Linux operating system built within containers", "description": "", "default_username": "core" }, { "id": "debian-jessie", "name": "Debian Jessie", "tenant": "", "short_description": "Debian v8 (Jessie), current stable Debian release", "description": "", "default_username": "admin" }, { "id": "ubuntu-14.04", "name": "Ubuntu 14.04", "tenant": "", "short_description": "Ubuntu 14.04.2 LTS", "description": "", "default_username": "ubuntu" }, { "id": "ubuntu-16.04", "name": "Ubuntu 16.04", "tenant": "", "short_description": "Ubuntu 16.04", "description": "", "default_username": "ubuntu" } ]
      },
      postTemplates: {
        response: { "result": "success" }
      },
      deleteTemplates: {
        response: { result: 'success' }
      },
      getFirewalls: {
        response: [ { "id": "xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx", "name": "Carbon IoT", "openstack_security_group_id": "xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx", "rules_count": 0, "instances_count": 0, "region": "lon1" }]
      },
      postFirewalls: {
        response: { "id": "xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx", "name": "test firewall", "result": "success" }
      },
      deleteFirewalls: {
        response: { result: 'success' }
      }
    };
    this.errors = {
      authentication: { code: 'authentication_invalid_key', reason: 'The API key provided is invalid, please contact us', result: 'Invalid API Key' },
      invalidSSHKey: { code: 'database_ssh_key_create', reason: 'The SSH key entered is invalid, please check it and try again', result: 'Server error' },
      duplicateSSHKey: { code: 'sshkey_duplicate', reason: 'An SSH key with this name already exists, please choose another', result: 'Server error' },
      invalidName: { code: 'parameter_name_invalid', reason: 'The name supplied was empty', result: 'Server error' },
      invalidLabel: { code: 'parameter_label_invalid', reason: 'The label supplied was empty', result: 'Server error' },
      invalidId: { code: 'database_network_not_found', reason: 'Failed to find the network within the internal database', result: 'Resource not found' },
      invalidDateRange: { code: 'parameter_date_range_too_long', reason: 'The date range spanned more than 31 days', result: 'Server error' },
      invalidDateOrder: { code: 'parameter_date_range', reason: 'The date range provided had the finish before the start', result: 'Server error' },
      invalidImageId: { code: 'parameter_image_id_missing', reason: "The image ID wasn't supplied", result: 'Server error' },
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
            case 'templates':
            case 'firewalls':
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
                } else if (params.to || params.from) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidDateOrder)); break;
                } else {
                  status = 200; res.write(JSON.stringify(this.responses.getCharges.response)); break;
                }
              case '/quota':
                status = 200; res.write(JSON.stringify(this.responses.getQuotas.response)); break;
              case '/templates':
                status = 200; res.write(JSON.stringify(this.responses.getTemplates.response)); break;
              case '/firewalls':
                status = 200; res.write(JSON.stringify(this.responses.getFirewalls.response)); break;
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
              case '/firewalls':
                if (body.name && body.name === 'test firewall') {
                  status = 200; res.write(JSON.stringify(this.responses.postFirewalls.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/templates':
                if (body.image_id && body.name) {
                  status = 200; res.write(JSON.stringify(this.responses.postTemplates.response)); break;
                } else if (body.name) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidImageId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
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
              case '/firewalls':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteFirewalls.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/templates':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteTemplates.response)); break;
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
