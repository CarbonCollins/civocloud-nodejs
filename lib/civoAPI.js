'use strict';

const http = require('http');
const qs = require('querystring');

class civoAPIStub {
  constructor(event) {
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
        uif (urlChips.length > 2) 

          url = `/${urlChips[1]}`;
          switch(urlChips[1]) {
            case 'sshkeys':
            case 'networks':
            case 'templates':
            case 'firewalls':
            case 'instances':
            case 'dns':
              params = Object.assign({}, params, {
                id: urlChips[2] || undefined
              });
              if (urlChips.length > 3) {
                url = `/${urlChips[1]}/${urlChips[3]}`
              }
              if (urlChips.length > 4) {
                if (urlChips[3] === 'ip') {
                  params = Object.assign({}, params, {
                    ip_address: urlChips[4] || undefined
                  });
                } else if (urlChips[3] === 'records') {
                  params = Object.assign({}, params, {
                    id: urlChips[4] || undefined,
                    domain_id: urlChips[2] || undefined
                  });
                } else {
                  params = Object.assign({}, params, {
                    rule_id: urlChips[4] || undefined
                  });
                }
              }
              break;
            case 'snapshots':
              params = Object.assign({}, params, {
                name: urlChips[2] || undefined
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
              case '/firewalls/rules':
                status = 200; res.write(JSON.stringify(this.responses.getFirewallRules.response)); break;
              case '/snapshots':
                status = 200; res.write(JSON.stringify(this.responses.getSnapshots.response)); break;
              case '/instances':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 200; res.write(JSON.stringify(this.responses.getInstances.getresponse)); break;
                } else if (params.id) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                } else {
                  status = 200; res.write(JSON.stringify(this.responses.getInstances.listresponse)); break;
                }
              case '/dns':
                status = 200; res.write(JSON.stringify(this.responses.getDomainNames.response)); break;
              case '/dns/records':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 200; res.write(JSON.stringify(this.responses.getDomainNames.recordsresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
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
              case '/firewalls':
                if (body.name && body.name === 'test firewall') {
                  status = 200; res.write(JSON.stringify(this.responses.postFirewalls.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/firewalls/rules':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && body.start_port) {
                  status = 202; res.write(JSON.stringify(this.responses.postFirewallRules.response)); break;
                } else if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidStartPort)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/templates':
                if (body.image_id && body.name) {
                  status = 200; res.write(JSON.stringify(this.responses.postTemplates.response)); break;
                } else if (body.name) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidImageId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/instances':
                if (body.size && body.network_id && body.hostname) {
                  status = 200; res.write(JSON.stringify(this.responses.postInstances.response)); break;
                } else if (body.size && body.network_id) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidHostname)); break;
                } else if (body.size) {
                  status = 500; res.write(JSON.stringify(this.errors.invalidNetworkId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidSize)); break;
                }
              case '/instances/reboot':
              case '/instances/soft_reboot':
              case '/instances/hard_reboot':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 200; res.write(JSON.stringify(this.responses.postInstances.rebootresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/dns':
                if (body.name && body.name === 'test.com') {
                  status = 200; res.write(JSON.stringify(this.responses.postDomainNames.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/dns/records':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && body.type && body.name && body.value) {
                  status = 200; res.write(JSON.stringify(this.responses.postDomainNames.recordresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
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
              case '/snapshots':
                if (params.name && params.name === 'test'
                && body.instance_id && body.instance_id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 200; res.write(JSON.stringify(this.responses.putSnapshots.response)); break;
                } else if (params.name && params.name === 'test') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/instances/tags':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/stop':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.stopresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/start':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.startresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/resize':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && body.size && body.size === 'g1.small') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.resizeresponse)); break;
                } else if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidSize)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/rebuild':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.rebuildresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/restore':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && body.snapshot && body.snapshot === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' ) {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.restoreresponse)); break;
                } else if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidSnapshot)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/firewall':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.firewallresponse)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/instances/ip':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && params.ip_address && params.ip_address === '0.0.0.0' ) {
                  status = 202; res.write(JSON.stringify(this.responses.putInstances.moveipresponse)); break;
                } else if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidIpAddress)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
            }
          } else if (req.method === 'DELETE') {
            switch (url) {
              case '/sshkeys':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteSSHKey.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
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
              case '/firewalls/rules':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx'
                && params.rule_id && params.rule_id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteFirewalls.response)); break;
                } else if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/templates':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteTemplates.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/snapshots':
                if (params.name && params.name === 'test') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteSnapshots.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidName)); break;
                }
              case '/instances':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteInstances.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/dns':
                if (params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteDomainNames.response)); break;
                } else {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
                }
              case '/dns/records':
                if (params.domain_id && params.domain_id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx' && params.id && params.id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 202; res.write(JSON.stringify(this.responses.deleteDomainNames.recordresponse)); break;
                } else if (params.domain_id && params.domain_id === 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx') {
                  status = 500; res.write(JSON.stringify(this.errors.invalidId)); break;
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
