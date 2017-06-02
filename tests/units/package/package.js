module.exports = function(expect, CivoCloud) {
  it('package exports CivoAPI class', () => {
    expect(CivoCloud).to.be.an('function', 'package should export the CivoAPI class constructor');
  });
  describe('package endpoint tests', () => {
    it('endpoint defaults to civo v2 api url', (done) => {
      try {
        const civo = new CivoCloud('noApiToken');
        expect(civo.endpoint).to.exist;
        expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
        expect(civo.endpoint).to.be.equal('https://api.civo.com/v2', 'civo.endpoint URL should be "https://api.civo.com/v2"');
        done();
      } catch(err) {
        done(err);
      }
    });
    it('custom endpoint correctly defined', (done) => {
      try {
        const civo = new CivoCloud('noApiToken', 'customEndpoint');
        expect(civo.endpoint).to.exist;
        expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
        expect(civo.endpoint).to.be.equal('customEndpoint', 'civo.endpoint URL should be "customEndpoint"');
        done();
      } catch(err) {
        done(err);
      }
    });
  });
  describe('package apiToken tests', () => {
    it('valid apiToken input test', () => {
      const civo = new CivoCloud('noApiToken');
      expect(civo.apiToken).to.exist;
      expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
      expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');
    });
    it('invalid apiToken input test (undefined apiToken)', (done) => {
      try {
        const civoNoKey = new CivoCloud();
        expect(civoNoKey.apiToken).to.not.exist;
        done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
      } catch(err) {
        expect(err).to.exist;
        expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
        expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
        done();
      }
    });
    it('invalid apiToken input test (defined empty apiToken)', (done) => {
      try {
        const civoEmptyKey = new CivoCloud('');
        expect(civoEmptyKey.apiToken).to.exist;
        expect(civoEmptyKey.apiToken).to.be.equal('', 'apiToken should be an empty string for test');
        done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
      } catch(err) {
        expect(err).to.exist;
        expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
        expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
        done();
      }
    });
  });
};
