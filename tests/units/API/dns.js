module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
  describe('listDomains()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listDomains()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listDomains() should be a GET request');
        expect(request.url).to.be.equal('/dns', 'listDomains() should call "/dns" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getDomainNames.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listDomains()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listDomains() should be a GET request');
        expect(request.url).to.be.equal('/dns', 'listDomains() should call "/dns" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createDomain()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createDomain('test.com')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createDomain() should be a POST request');
        expect(request.url).to.be.equal('/dns', 'createDomain() should call "/dns" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
        expect(bodyKeys).to.include('name', 'expects body to contain name');
        expect(request.body.name).to.be.equal('test.com', 'the "name" body field did not match');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postDomainNames.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createDomain('test.com')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'createDomain() should be a POST request');
        expect(request.url).to.be.equal('/dns', 'createDomain() should call "/dns" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(1, '1 key of body data should be recived');
        expect(bodyKeys).to.include('name', 'expects body to contain name');
        expect(request.body.name).to.be.equal('test.com', 'the "name" body field did not match');
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
        validCivo.createDomain()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createDomain() should be a POST request');
        expect(request.url).to.be.equal('/dns', 'createDomain() should call "/dns" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
        expect(bodyKeys).to.not.include('name', 'expects no label to be sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteDomain()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteDomain('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202');
        expect(request.method).to.be.equal('DELETE', 'deleteDomain() should be a DELETE request');
        expect(request.url).to.be.equal('/dns', 'deleteDomain() should call "/dns" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteDomainNames.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteDomain('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteDomain() should be a DELETE request');
        expect(request.url).to.be.equal('/dns', 'deleteDomain() should call "/dns" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no keys of body data should be recived');
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
        validCivo.deleteDomain()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteDomain() should be a DELETE request');
        expect(request.url).to.be.equal('/dns', 'deleteDomain() should call "/dns" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no keys of body data should be recived');
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

  describe('listDomainRecords()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listDomainRecords('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listDomainRecords() should be a GET request');
        expect(request.url).to.be.equal('/dns/records', 'listDomainRecords() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getDomainNames.recordsresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listDomainRecords('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listDomainRecords() should be a GET request');
        expect(request.url).to.be.equal('/dns/records', 'listDomainRecords() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
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
        validCivo.listDomainRecords()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('GET', 'listDomainRecords() should be a GET request');
        expect(request.url).to.be.equal('/dns/records', 'listDomainRecords() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no keys of body data should be recived');
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
  describe('createDomainRecord()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'a', '@', '0.0.0.0', '10', '3600')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
        expect(request.method).to.be.equal('POST', 'createDomainRecord() should be a POST request');
        expect(request.url).to.be.equal('/dns/records', 'createDomainRecord() should call "/dns/:id/records" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(5, '5 body data should be recived');
        expect(request.body).to.have.all.keys('type', 'name', 'value', 'priority', 'ttl');
        expect(request.body.type).to.be.equal('a');
        expect(request.body.name).to.be.equal('@');
        expect(request.body.value).to.be.equal('0.0.0.0');
        expect(request.body.priority).to.be.equal('10');
        expect(request.body.ttl).to.be.equal('3600');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postDomainNames.recordresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'a', '@', '0.0.0.0', '10', '3600')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'createDomainRecord() should be a POST request');
        expect(request.url).to.be.equal('/dns/records', 'createDomainRecord() should call "/dns/:id/records" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(5, '5 body data should be recived');
        expect(request.body).to.have.all.keys('type', 'name', 'value', 'priority', 'ttl');
        expect(request.body.type).to.be.equal('a');
        expect(request.body.name).to.be.equal('@');
        expect(request.body.value).to.be.equal('0.0.0.0');
        expect(request.body.priority).to.be.equal('10');
        expect(request.body.ttl).to.be.equal('3600');
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
    it('missing optionals', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'a', '@', '0.0.0.0')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200 ok');
        expect(request.method).to.be.equal('POST', 'createDomainRecord() should be a POST request');
        expect(request.url).to.be.equal('/dns/records', 'createDomainRecord() should call "/dns/:id/records" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(3, '3 body data should be recived');
        expect(request.body).to.have.all.keys('type', 'name', 'value');
        expect(request.body.type).to.be.equal('a');
        expect(request.body.name).to.be.equal('@');
        expect(request.body.value).to.be.equal('0.0.0.0');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postDomainNames.recordresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createDomainRecord()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createDomainRecord() should be a POST request');
        expect(request.url).to.be.equal('/dns/records', 'createDomainRecord() should call "/dns/:id/records" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no body data should be recived');
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
  describe('deleteDomainRecord()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('DELETE', 'deleteDomainRecord() should be a DELETE request');
        expect(request.url).to.be.equal('/dns/records', 'deleteDomainRecord() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('domain_id', 'expects parameters to specify an id');
        expect(request.params.domain_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteDomainNames.recordresponse), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteDomainRecord() should be a DELETE request');
        expect(request.url).to.be.equal('/dns/records', 'deleteDomainRecord() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('domain_id', 'expects parameters to specify an id');
        expect(request.params.domain_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
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
        validCivo.deleteDomainRecord('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteDomainRecord() should be a DELETE request');
        expect(request.url).to.be.equal('/dns/records', 'deleteDomainRecord() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('domain_id', 'expects parameters to specify an id');
        expect(request.params.domain_id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('undefined', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid domain_id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteDomainRecord()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteDomainRecord() should be a DELETE request');
        expect(request.url).to.be.equal('/dns/records', 'deleteDomainRecord() should call "/dns/:id/records" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('domain_id', 'expects parameters to specify an id');
        expect(request.params.domain_id).to.be.equal('undefined', 'received id parameter was not the same as sent');
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