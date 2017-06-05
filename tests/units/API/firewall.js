module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
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
};