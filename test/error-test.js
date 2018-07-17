const assert    = require('assert');
const { Error } = require('../lib/error.js');

describe('Error', function () {
  describe('#getParameterUndefinedMessage()', function () {
    it('Should return an error message, according to the passed parameter', function () {
      const errorMessage = Error.getParameterUndefinedMessage('parameter1');
      
      assert.equal(errorMessage, 'Parameter parameter1 is undefined');
    });

    it('Should return an error message with empty string parameter', function () {
        const errorMessage = Error.getParameterUndefinedMessage('');
        
        assert.equal(errorMessage, 'Parameter  is undefined');
    });

    it('Should return an error message with undefined parameter', function () {
        const errorMessage = Error.getParameterUndefinedMessage();
        
        assert.equal(errorMessage, 'Parameter undefined is undefined');
    });
  });

  describe('#getLanguageIsNotAvailableMessage()', function () {
    it('Should return an error message, according to the passed parameter', function () {
      const errorMessage = Error.getLanguageIsNotAvailableMessage('aa-aa');
      
      assert.equal(errorMessage, 'Language aa-aa is not available');
    });

    it('Should return an error message with empty string parameter', function () {
        const errorMessage = Error.getLanguageIsNotAvailableMessage('');
        
        assert.equal(errorMessage, 'Language  is not available');
    });

    it('Should return an error message with undefined parameter', function () {
        const errorMessage = Error.getLanguageIsNotAvailableMessage();
        
        assert.equal(errorMessage, 'Language undefined is not available');
    });
  });

  describe('#getWordDoesNotExistMessage()', function () {
    it('Should return an error message, according to the passed word and language', function () {
      const errorMessage = Error.getWordDoesNotExistMessage('abc', 'aa-aa');
      
      assert.equal(errorMessage, 'The word abc does not exist in the language aa-aa');
    });

    it('Should return an error message with word and undefined language', function () {
        const errorMessage = Error.getWordDoesNotExistMessage('abc');
        
        assert.equal(errorMessage, 'The word abc does not exist in the language undefined');
    });

    it('Should return an error message with empty word and undefined language', function () {
        const errorMessage = Error.getWordDoesNotExistMessage('');
        
        assert.equal(errorMessage, 'The word  does not exist in the language undefined');
    });

    it('Should return an error message with undefined word and undefined language', function () {
        const errorMessage = Error.getWordDoesNotExistMessage();
        
        assert.equal(errorMessage, 'The word undefined does not exist in the language undefined');
    });

    it('Should return an error message with undefined word and language', function () {
        const errorMessage = Error.getWordDoesNotExistMessage(undefined, 'aa-aa');
        
        assert.equal(errorMessage, 'The word undefined does not exist in the language aa-aa');
    });
  });
});