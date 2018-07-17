const assert  = require('assert');
const request = require('superagent');

describe('Endpoints', function () {
  describe('/find', function () {
    it('Should use the default language (en-us)', function (done) {
      const url = 'http://localhost:3000/find?word=test';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          
          assert.equal(res.type, 'application/json');
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, ['sett', 'stet', 'tets']);
          done();
        });
    });

    it('Should use the provided language', function (done) {
      const url = 'http://localhost:3000/find?lang=en-us&word=test';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          assert.equal(res.type, 'application/json');
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, ['sett', 'stet', 'tets']);
          done()
        });
    });

    it('Should return a message that the word provided does not exist', function (done) {
      const url = 'http://localhost:3000/find?word=abc';

      request
        .get(url, function (err, res) {
          assert.equal(res.type, 'text/html');
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'The word abc does not exist in the language en-us');
          done()
        });
    });

    it('Should return a message that the language is not available', function (done) {
      const url = 'http://localhost:3000/find?lang=aa-aa&word=abc';
    
      request
        .get(url)
        .end(function (err, res) {
          assert.equal(res.type, 'text/html');
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'Language aa-aa is not available');
          done();
        });
    });
  });

  describe('/compare', function () {
    it('Should use the default language (en-us)', function (done) {
      const url = 'http://localhost:3000/compare?word1=test&word2=sett';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          assert.equal(res.type, 'application/json');
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, true);
          done();
        });
    });

    it('Should use the provided language', function (done) {
      const url = 'http://localhost:3000/compare?lang=en-us&word1=test&word2=sett';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          assert.equal(res.type, 'application/json');
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, true);
          done();
        });
    });

    it('Should return a message that the word1 does not exist', function (done) {
      const url = 'http://localhost:3000/compare?word1=abc&word2=sett';
    
      request
        .get(url)
        .end(function (err, res) {
          assert.equal(res.type, 'text/html');
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'The word abc does not exist in the language en-us');
          done();
        });
    });

    it('Should return a message that the word2 does not exist', function (done) {
      const url = 'http://localhost:3000/compare?word1=test&word2=abc';
    
      request
        .get(url)
        .end(function (err, res) {
          assert.equal(res.type, 'text/html');
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'The word abc does not exist in the language en-us');
          done();
        });
    });

    it('Should return a message that the language is not available', function (done) {
      const url = 'http://localhost:3000/compare?lang=aa-aa&word1=bbb&word2=ccc';
    
      request
        .get(url)
        .end(function (err, res) {
          assert.equal(res.type, 'text/html');
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'Language aa-aa is not available');
          done();
        });
    });
  });

  describe('/find-longest', function () {
    it('Should use the default language (en-us)', function (done) {
      const url = 'http://localhost:3000/find-longest';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          assert.equal(res.type, 'application/json');
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, [['microphotographies','photomicrographies'],['pathophysiological','physiopathological']]);
          done();
        });
    });

    it('Should use the provided language', function (done) {
      const url = 'http://localhost:3000/find-longest?lang=en-us';
    
      request
        .get(url)
        .end(function (err, res) {
          if (err) {
            throw err;
          }

          assert.equal(res.type, 'application/json');  
          assert.equal(res.status, 200);
          assert.equal(res.ok, true);
          assert.deepEqual(res.body, [['microphotographies','photomicrographies'],['pathophysiological','physiopathological']]);
          done();
        });
    });

    it('Should return a message that the language is not available', function (done) {
      const url = 'http://localhost:3000/find-longest?lang=aa-aa';
    
      request
        .get(url)
        .end(function (err, res) {
          assert.equal(res.type, 'text/html');  
          assert.equal(res.status, 400);
          assert.equal(res.ok, false);
          assert.equal(res.text, 'Language aa-aa is not available');
          done();
        });
    });
  });
});