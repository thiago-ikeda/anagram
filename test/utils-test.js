const assert    = require('assert');
const { Utils } = require('../lib/utils.js');

describe('Utils', function () {
  describe('#sortWord()', function () {
    it('Should sort the passed word', function () {
      const sortedWord = Utils.sortWord('WORD');
      
      assert.equal(sortedWord, 'dorw');
    });

    it('Should return an empty string when the passed word is an empty string', function () {
      const sortedWord = Utils.sortWord('');
      
      assert.equal(sortedWord, '');
    });

    it('Should return an undefined when is not passed a word', function () {
      const sortedWord = Utils.sortWord();
      
      assert.equal(sortedWord, undefined);
    });
  });
});