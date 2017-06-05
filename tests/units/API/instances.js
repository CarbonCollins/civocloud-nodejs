module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
  describe('listInstances()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listInstances()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listInstances() should be a GET request');
        expect(request.url).to.be.equal('/instances', 'listInstances() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getInstances.listresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listInstances()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listInstances() should be a GET request');
        expect(request.url).to.be.equal('/instances', 'listInstances() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createInstance('gl.large', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'test-instance', 'ubuntu-16.04', 'test', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'lon1', true, 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'some test tags here')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(10, '10 body data should be recived');
        expect(request.body).to.have.all.keys('size', 'network_id', 'hostname', 'template', 'initial_user', 'ssh_key_id', 'region', 'public_ip', 'snapshot_id', 'tags');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createInstance('gl.large', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'test-instance', 'ubuntu-16.04', 'test', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'lon1', true, 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'some test tags here')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(10, '10 body data should be recived');
        expect(request.body).to.have.all.keys('size', 'network_id', 'hostname', 'template', 'initial_user', 'ssh_key_id', 'region', 'public_ip', 'snapshot_id', 'tags');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('missing optionals', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createInstance('gl.large', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'test-instance')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(3, '3 body data should be recived');
        expect(request.body).to.have.all.keys('size', 'network_id', 'hostname');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid hostname', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createInstance('gl.large', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(2, '2 body data should be recived');
        expect(request.body).to.have.all.keys('size', 'network_id');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidHostname), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid network_id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createInstance('gl.large')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(1, '1 body data should be recived');
        expect(request.body).to.have.all.keys('size');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidNetworkId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid size', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances', 'createInstance() should call "/instances" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidSize), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('DELETE', 'deleteInstance() should be a DELETE request');
        expect(request.url).to.be.equal('/instances', 'deleteInstance() should call "/instances" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteInstance() should be a DELETE request');
        expect(request.url).to.be.equal('/instances', 'deleteInstance() should call "/instances" endpoint');
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
        validCivo.deleteInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteInstance() should be a DELETE request');
        expect(request.url).to.be.equal('/instances', 'deleteInstance() should call "/instances" endpoint');
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
  describe('getInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.getInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'getInstance() should be a DELETE request');
        expect(request.url).to.be.equal('/instances', 'getInstance() should call "/instances" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getInstances.getresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.getInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'getInstance() should be a GET request');
        expect(request.url).to.be.equal('/instances', 'getInstance() should call "/instances" endpoint');
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
        validCivo.getInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('GET', 'getInstance() should be a GET request');
        expect(request.url).to.be.equal('/instances', 'getInstance() should call "/instances" endpoint');
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
  describe('retagInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.retagInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'test tags')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'retagInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/tags', 'retagInstance() should call "/instances/:id/tags" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('tags', 'expects parameters to specify an tags');
        expect(request.body.tags).to.be.equal('test tags', 'received tags parameter was not the same as sent');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.retagInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'test tags')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'retagInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/tags', 'retagInstance() should call "/instances/:id/tags" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('tags', 'expects parameters to specify an tags');
        expect(request.body.tags).to.be.equal('test tags', 'received tags parameter was not the same as sent');
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
    it('misssing optional tags', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.retagInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'retagInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/tags', 'retagInstance() should call "/instances/:id/tags" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('valid tags (as array)', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.retagInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', ['test', 'tags'])
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'retagInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/tags', 'retagInstance() should call "/instances/:id/tags" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('tags', 'expects parameters to specify an tags');
        expect(request.body.tags).to.be.equal('test tags', 'received tags parameter was not the same as sent');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.retagInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'retagInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/tags', 'retagInstance() should call "/instances/:id/tags" endpoint');
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
  describe('rebootInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.rebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'rebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/reboot', 'rebootInstance() should call "/instances/:id/reboot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postInstances.rebootresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.rebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'rebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/reboot', 'rebootInstance() should call "/instances/:id/reboot" endpoint');
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
        validCivo.rebootInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'rebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/reboot', 'rebootInstance() should call "/instances/:id/reboot" endpoint');
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
  describe('hardRebootInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.hardRebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'hardRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/hard_reboot', 'hardRebootInstance() should call "/instances/:id/hard_reboot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postInstances.rebootresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.hardRebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'hardRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/hard_reboot', 'hardRebootInstance() should call "/instances/:id/hard_reboot" endpoint');
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
        validCivo.hardRebootInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'hardRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/hard_reboot', 'hardRebootInstance() should call "/instances/:id/hard_reboot" endpoint');
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
  describe('softRebootInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.softRebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'softRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/soft_reboot', 'softRebootInstance() should call "/instances/:id/soft_reboot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postInstances.rebootresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.softRebootInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'softRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/soft_reboot', 'softRebootInstance() should call "/instances/:id/soft_reboot" endpoint');
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
        validCivo.softRebootInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'softRebootInstance() should be a POST request');
        expect(request.url).to.be.equal('/instances/soft_reboot', 'softRebootInstance() should call "/instances/:id/soft_reboot" endpoint');
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
  describe('stopInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.stopInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202');
        expect(request.method).to.be.equal('PUT', 'stopInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/stop', 'stopInstance() should call "/instances/:id/stop" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.stopresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.stopInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'stopInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/stop', 'stopInstance() should call "/instances/:id/stop" endpoint');
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
        validCivo.stopInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'stopInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/stop', 'stopInstance() should call "/instances/:id/stop" endpoint');
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
  describe('startInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.startInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 200');
        expect(request.method).to.be.equal('PUT', 'startInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/start', 'startInstance() should call "/instances/:id/start" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.startresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.startInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'startInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/start', 'startInstance() should call "/instances/:id/start" endpoint');
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
        validCivo.startInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'startInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/start', 'startInstance() should call "/instances/:id/start" endpoint');
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
  describe('resizeInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.resizeInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'g1.small')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'resizeInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/resize', 'resizeInstance() should call "/instances/:id/resize" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('size', 'expects parameters to specify a size');
        expect(request.body.size).to.be.equal('g1.small', 'received size parameter was not the same as sent');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.resizeresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.resizeInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'g1.small')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'resizeInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/resize', 'resizeInstance() should call "/instances/:id/resize" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('size', 'expects parameters to specify a size');
        expect(request.body.size).to.be.equal('g1.small', 'received size parameter was not the same as sent');
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
    it('invalid size', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.resizeInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'resizeInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/resize', 'resizeInstance() should call "/instances/:id/resize" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidSize), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.resizeInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'resizeInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/resize', 'resizeInstance() should call "/instances/:id/resize" endpoint');
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
  describe('rebuildInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.rebuildInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'rebuildInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/rebuild', 'rebuildInstance() should call "/instances/:id/rebuild" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.rebuildresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.rebuildInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'rebuildInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/rebuild', 'rebuildInstance() should call "/instances/:id/rebuild" endpoint');
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
        validCivo.rebuildInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'rebuildInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/rebuild', 'rebuildInstance() should call "/instances/:id/rebuild" endpoint');
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
  describe('restoreInstance()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.restoreInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'restoreInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/restore', 'restoreInstance() should call "/instances/:id/restore" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(bodyKeys).to.include('snapshot', 'expects parameters to specify an snapshot');
        expect(request.body.snapshot).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.restoreresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.restoreInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'restoreInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/restore', 'restoreInstance() should call "/instances/:id/restore" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(bodyKeys).to.include('snapshot', 'expects parameters to specify an snapshot');
        expect(request.body.snapshot).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
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
    it('invalid snapshot', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.restoreInstance('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'restoreInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/restore', 'restoreInstance() should call "/instances/:id/restore" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no parameter should be used');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidSnapshot), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.restoreInstance()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'restoreInstance() should be a PUT request');
        expect(request.url).to.be.equal('/instances/restore', 'restoreInstance() should call "/instances/:id/restore" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no parameter should be used');
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
  describe('updateInstanceFirewall()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateInstanceFirewall('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'pdateInstanceFirewall() should be a PUT request');
        expect(request.url).to.be.equal('/instances/firewall', 'pdateInstanceFirewall() should call "/instances/:id/firewall" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('firewall_id', 'expects parameters to specify an tags');
        expect(request.body.firewall_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received firewall_id parameter was not the same as sent');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.firewallresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.updateInstanceFirewall('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'pdateInstanceFirewall() should be a PUT request');
        expect(request.url).to.be.equal('/instances/firewall', 'pdateInstanceFirewall() should call "/instances/:id/firewall" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('firewall_id', 'expects parameters to specify an tags');
        expect(request.body.firewall_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received firewall_id parameter was not the same as sent');
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
    it('misssing optional firewall_id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateInstanceFirewall('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('PUT', 'updateInstanceFirewall() should be a PUT request');
        expect(request.url).to.be.equal('/instances/firewall', 'updateInstanceFirewall() should call "/instances/:id/firewall" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putInstances.firewallresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateInstanceFirewall()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'pdateInstanceFirewall() should be a PUT request');
        expect(request.url).to.be.equal('/instances/firewall', 'pdateInstanceFirewall() should call "/instances/:id/firewall" endpoint');
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
  describe('moveInstancePublicIp()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
};
