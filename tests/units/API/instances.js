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
  describe('shutdownInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('startInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('resizeInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('rebuiltInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('restoreInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('updateInstanceFirewall()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('moveInstancePublicIp()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
};
