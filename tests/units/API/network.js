module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
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
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getNetworks.response), 'correct response was not returned');
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
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createNetworks()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createNetwork('name')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
        expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
        expect(bodyKeys).to.include('label', 'expects body to contain label');
        expect(request.body.label).to.be.equal('name', 'the "label" body field did not match');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postNetworks.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createNetwork('name')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
        expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
        expect(bodyKeys).to.include('label', 'expects body to contain label');
        expect(request.body.label).to.be.equal('name', 'the "label" body field did not match');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid label', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createNetwork()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
        expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
        expect(bodyKeys).to.not.include('label', 'expects no label to be sent');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('optional region', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createNetwork('name', 'lon1')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
        expect(request.method).to.be.equal('POST', 'createNetwork() should be a POST request');
        expect(request.url).to.be.equal('/networks', 'createNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(2, 'no body data should be recived');
        expect(bodyKeys).to.include('label', 'expects no label to be sent');
        expect(request.body.label).to.be.equal('name', 'optional region was not in the body');
        expect(bodyKeys).to.include('region', 'expects no label to be sent');
        expect(request.body.region).to.be.equal('lon1', 'optional region was not in the body');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postNetworks.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('renameNetwork()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'new name')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
        expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('label', 'expects body to contain label');
        expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putNetworks.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'new name')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
        expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('label', 'expects body to contain label');
        expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
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
    it('invalid label', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.renameNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
        expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
        expect(bodyKeys).to.not.include('label', 'expects body to not contain label');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.renameNetwork('invalidId', 'new name')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
        expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('label', 'expects body to contain label');
        expect(request.body.label).to.be.equal('new name', 'the "label" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('invalidId', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('no params', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.renameNetwork()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'renameNetwork() should be a PUT request');
        expect(request.url).to.be.equal('/networks', 'renameNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        expect(bodyKeys).to.not.include('label', 'expects body to not contain label');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, 'one parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to not specify an id');
        expect(request.params.id).to.be.equal('undefined', 'received id parameter should be empty');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidLabel), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteNetwork()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
        expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteNetworks.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteNetwork('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
        expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
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
        validCivo.deleteNetwork()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteNetwork() should be a DELETE request');
        expect(request.url).to.be.equal('/networks', 'deleteNetwork() should call "/networks" endpoint');
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
};