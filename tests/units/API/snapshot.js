module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
  describe('listSnapshots()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listSnapshots()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listSnapshots() should be a GET request');
        expect(request.url).to.be.equal('/snapshots', 'listSnapshots() should call "/snapshots" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listSnapshots()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listSnapshots() should be a GET request');
        expect(request.url).to.be.equal('/snapshots', 'listSnapshots() should call "/snapshots" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createSnapshot()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        expect(bodyKeys).to.include('safe', 'expects body to contain safe');
        expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        expect(bodyKeys).to.include('safe', 'expects body to contain safe');
        expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('missing optionals', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
        expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createSnapshot('test')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid name', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createSnapshot()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'createSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'createSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('undefined', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('updateSnapshot()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        expect(bodyKeys).to.include('safe', 'expects body to contain safe');
        expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', true)
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(2, '2 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        expect(bodyKeys).to.include('safe', 'expects body to contain safe');
        expect(request.body.safe).to.be.equal('true', 'the "safe" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('missing optionals', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateSnapshot('test', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
        expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 keys of body data should be recived');
        expect(bodyKeys).to.include('instance_id', 'expects body to contain instance_id');
        expect(request.body.instance_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'the "instance_id" body field did not match');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.putSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateSnapshot('test')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid name', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.updateSnapshot()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('PUT', 'updateSnapshot() should be a PUT request');
        expect(request.url).to.be.equal('/snapshots', 'updateSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('undefined', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteSnapshot()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteSnapshot('test')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('DELETE', 'deleteSnapshot() should be a DELETE request');
        expect(request.url).to.be.equal('/snapshots', 'deleteSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteSnapshots.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteSnapshot('test')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteSnapshot() should be a DELETE request');
        expect(request.url).to.be.equal('/snapshots', 'deleteSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('test', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid name', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteSnapshot()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteSnapshot() should be a DELETE request');
        expect(request.url).to.be.equal('/snapshots', 'deleteSnapshot() should call "/snapshot" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('name', 'expects parameters to specify an name');
        expect(request.params.name).to.be.equal('undefined', 'received name parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
};
