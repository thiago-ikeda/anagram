const assert      = require('assert');
const { Anagram } = require('../lib/anagram.js');

describe('Anagram', function () {
  describe('#constructor()', function () {
    it('Should return an instance with 5 words loaded (wordList = [\'a\', \'b\', \'c\', \'d\', \'e\'])', function () {
      const wordList = ['a', 'b', 'c', 'd', 'e'];
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 5);
    });

    it('Should return an instance with 1 empty string loaded (wordList = [\'\'])', function () {
      const wordList = [''];
      const anagram  = new Anagram(wordList);
  
      assert.equal(anagram.length, 1);
    });

    it('Should return an instance with 0 words loaded (wordList = [1])', function () {
      const wordList = [1];
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 0);
    });

    it('Should return an instance with 0 words loaded (wordList = [false])', function () {
      const wordList = [false];
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 0);
    });

    it('Should return an instance with 0 words loaded (wordList = [undefined])', function () {
      const wordList = [undefined];
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 0);
    });
    
    it('Should return an instance with 0 word loaded (wordList = null)', function () {
      const wordList = null;
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 0);
    });
  });

  describe('#length', function () {
    it('Should get the length of the anagrams words', function () {
      const wordList = ['a', 'b', 'c'];
      const anagram  = new Anagram(wordList);

      assert.equal(anagram.length, 3);
    });
  });

  describe('#getAnagrams()', function () {
    beforeEach(function () {
      const wordList = ['acer', 'sett', 'acre', 'stet', 'care', 'test', 'race', 'tets', 'alefs','false', 'feals','fleas','leafs'];
      this.anagram   = new Anagram(wordList);
    });
    
    it('Should get anagrams of the passed word and remove the passed word', function () {
      const anagrams = this.anagram.getAnagrams('test', true);

      assert.deepEqual(anagrams, ['sett', 'stet', 'tets']);
    });

    it('Should get anagrams of the passed word and keep the passed word', function () {
      const anagrams = this.anagram.getAnagrams('test', false);

      assert.deepEqual(anagrams, ['sett', 'stet', 'test', 'tets']);
    });

    it('Should get anagrams of the passed word and keep the passed word (removeWord undefined)', function () {
      const anagrams = this.anagram.getAnagrams('test');

      assert.deepEqual(anagrams, ['sett', 'stet', 'test', 'tets']);
    });

    it('Should get an empty array (removeWord true)', function () {
      const anagrams = this.anagram.getAnagrams('', true);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get an empty array (removeWord false)', function () {
      const anagrams = this.anagram.getAnagrams('', false);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get an empty array (word undefined and removeWord true)', function () {
      const anagrams = this.anagram.getAnagrams(undefined, true);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get an empty array (word undefined and removeWord false)', function () {
      const anagrams = this.anagram.getAnagrams(undefined, false);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get an empty array (word number and removeWord true)', function () {
      const anagrams = this.anagram.getAnagrams(1, true);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get an empty array (word number and removeWord false)', function () {
      const anagrams = this.anagram.getAnagrams(1, false);
  
      assert.deepEqual(anagrams, []);
    });

    it('Should get anagrams of the word false and remove the word false', function () {
      const anagrams = this.anagram.getAnagrams(false, true);
  
      assert.deepEqual(anagrams, ['alefs', 'feals','fleas','leafs']);
    });

    it('Should get anagrams of the word false and keep the word false', function () {
      const anagrams = this.anagram.getAnagrams(false, false);
  
      assert.deepEqual(anagrams, ['alefs','false', 'feals','fleas','leafs']);
    });
  });

  describe('#getLongestAnagrams()', function () {
    it('Should return 0 anagram', function () {
      const wordList = ['a', 'b', 'c'];
      const anagram  = new Anagram(wordList);
      const anagrams = anagram.getLongestAnagrams();

      assert.equal(anagrams.length, 0);
    });

    it('Should get the longest anagram (1 array)', function () {
      const wordList = ['a', 'b', 'c', 'sett', 'test'];
      const anagram  = new Anagram(wordList);
      const anagrams = anagram.getLongestAnagrams();
  
      assert.deepEqual(anagrams, [['sett', 'test']]);
    });

    it('Should get the longest anagram (2 array)', function () {
      const wordList = ['a', 'b', 'c', 'sett', 'test', 'male', 'meal'];
      const anagram  = new Anagram(wordList);
      const anagrams = anagram.getLongestAnagrams();
  
      assert.deepEqual(anagrams, [['sett', 'test'], ['male', 'meal']]);
    });
  });
});