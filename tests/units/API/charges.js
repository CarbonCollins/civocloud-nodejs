module.exports = function(expect, eventEmitter, validCivo, invalidCivo, civoStub) {
  describe('listCharges()', () => {
    it('valid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listCharges()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
        expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.response), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid auth', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        invalidCivo.listCharges()
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(401, 'returned status should be 401 unauthorised');
        expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
        expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        expect(Object.keys(request.params)).to.have.lengthOf(0, 'No params should be used');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.authentication), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('valid date range (Strings)', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listCharges('2017-05-01T00:00:00Z', '2017-05-11T00:00:00Z')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
        expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
        expect(request.params.from).to.be.equal('2017-05-01T00:00:00Z', 'received from parameter was not the same as sent');
        expect(paramKeys).to.include('to', 'expects parameters to specify a to date string');
        expect(request.params.to).to.be.equal('2017-05-11T00:00:00Z', 'received to parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.responseTenDays), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('valid date range (Date() Object)', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listCharges(new Date('2017-05-01T00:00:00Z'), new Date('2017-05-11T00:00:00Z'))
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(200, 'returned status should be 200');
        expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
        expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(2, '2 parameter should be used');
        expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
        expect(request.params.from).to.be.equal('2017-05-01T00:00:00.000Z', 'received from parameter was not the same as sent');
        expect(paramKeys).to.include('to', 'expects parameters to specify a to date string');
        expect(request.params.to).to.be.equal('2017-05-11T00:00:00.000Z', 'received to parameter was not the same as sent');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.responses.getCharges.responseTenDays), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
    it('invalid date range (missing one param)', (done) => {
      Promise.all([
        eventEmitter.once('received'),
        validCivo.listCharges('2017-05-01T00:00:00Z')
      ]).then((data) => {
        const request = data[0][0];
        const response = data[1];
        expect(request.status).to.be.equal(500, 'returned status should be 500 server error');
        expect(request.method).to.be.equal('GET', 'listCharges() should be a GET request');
        expect(request.url).to.be.equal('/charges', 'listCharges() should call "/charges" endpoint');
        expect(Object.keys(request.body)).to.have.lengthOf(0, 'No body data should be recived');
        const paramKeys = Object.keys(request.params);
        expect(paramKeys).to.have.lengthOf(1, '1 parameter should be used');
        expect(paramKeys).to.include('from', 'expects parameters to specify a from date string');
        expect(request.params.from).to.be.equal('2017-05-01T00:00:00Z', 'received from parameter was not the same as sent');
        expect(paramKeys).to.not.include('to', 'expects parameters to not specify a to date string');
        expect(JSON.stringify(response)).to.be.equal(JSON.stringify(civoStub.errors.invalidDateOrder), 'correct response was not returned');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
};
