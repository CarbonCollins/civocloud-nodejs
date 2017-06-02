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
    it('force fail', () => {
      expect(false).to.be.true;
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
