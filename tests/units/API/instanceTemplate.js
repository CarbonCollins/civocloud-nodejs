module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
  describe('listTemplates()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listTemplates()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listTemplates() should be a GET request');
        expect(request.url).to.be.equal('/templates', 'listTemplates() should call "/templates" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getTemplates.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listTemplates()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listTemplates() should be a GET request');
        expect(request.url).to.be.equal('/templates', 'listTemplates() should call "/templates" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createTemplate()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createTemplate('test template', 'ubuntu-16.04', 'test template', 'a testing template', 'root', '')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
        expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(6, '6 keys of body data should be recived');
        expect(request.body).to.have.all.keys('image_id', 'name', 'short_description', 'description', 'default_username', 'cloud_config');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postTemplates.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.createTemplate('test template', 'ubuntu-16.04', 'test template', 'a testing template', 'root', '')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
        expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(6, '6 keys of body data should be recived');
        expect(request.body).to.have.all.keys('image_id', 'name', 'short_description', 'description', 'default_username', 'cloud_config');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('optional vars removed', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createTemplate('test template', 'ubuntu-16.04')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
        expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(2, '2 keys of body data should be recived');
        expect(request.body).to.have.all.keys('image_id', 'name');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.postTemplates.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('missing image_id', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createTemplate('test template')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
        expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(1, '1 key of body data should be recived');
        expect(request.body).to.have.all.keys('name');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidImageId), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('missing all params', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.createTemplate()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('POST', 'createTemplate() should be a POST request');
        expect(request.url).to.be.equal('/templates', 'createTemplate() should call "/createTemplate" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'no body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidName), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteTemplate()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.deleteTemplate('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(202, 'returned status should be 202 accepted');
        expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
        expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
        const bodyKeys = Object.keys(request.body);
        expect(bodyKeys).to.have.lengthOf(0, 'no keys of body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('id', 'expects parameters to specify an id');
        expect(request.params.id).to.be.equal('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx', 'received id parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.deleteTemplates.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.deleteTemplate('xxxxxxxx-xxxx-4xxx-4xxx-xxxxxxxxxxxx')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
        expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
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
        validCivo.deleteTemplate()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('DELETE', 'deleteTemplate() should be a DELETE request');
        expect(request.url).to.be.equal('/templates', 'deleteTemplate() should call "/templates" endpoint');
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