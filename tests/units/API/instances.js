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
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getInstances.response), 'correct response was not returned');
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
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('getInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('retagInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
    });
  });
  describe('rebootInstance()', () => {
    it('force fail', () => {
      expect(false).to.be.true;
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
