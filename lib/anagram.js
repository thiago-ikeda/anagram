const { Utils } = require('../lib/utils.js');

function removeOriginalWord(list, word) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i] == word) {
      list.splice(i, 1);
      break;
    }
  }
}

class Anagram {
  constructor(wordList) {
    this.anagramList         = {};
    this.longestLengthWord   = 0;
    this.longestAnagramsKeys = [];

    if (wordList) {
      for (let i = 0; i < wordList.length; i++) {
        if (typeof wordList[i] != 'string') {
          continue;
        }
        
        const word       = wordList[i].toLowerCase();
        const sortedWord = Utils.sortWord(word);
        
        if (!this.anagramList[sortedWord]) {
          this.anagramList[sortedWord] = [];
        }
        
        const listLength = this.anagramList[sortedWord].push(word);

        if (sortedWord.length >= this.longestLengthWord && listLength > 1) {
          if (sortedWord.length == this.longestLengthWord) {
            if (!this.longestAnagramsKeys.includes(sortedWord)) {
              this.longestAnagramsKeys.push(sortedWord);
            }
          }
          else {
            this.longestAnagramsKeys = [];
            this.longestAnagramsKeys.push(sortedWord);
          }

          this.longestLengthWord = sortedWord.length;
        }
      }
    }
  }

  get length() {
    return Object.keys(this.anagramList).length;
  }

  getAnagrams(word, removeWord) {
    if (word || word == false) {
      word = word.toString();
    }

    const sortedWord   = Utils.sortWord(word);
    const originalList = this.anagramList[sortedWord];

    if (!originalList) {
      return [];
    }

    if (!removeWord) {
      return originalList;
    }
    else {
      const newList = originalList.slice(0); // Clone original list
      removeOriginalWord(newList, word);

      return newList;
    }
  }

  getLongestAnagrams() {
    const longestAnagrams = [];

    for (let i = 0; i < this.longestAnagramsKeys.length; i++) {
      longestAnagrams.push(
        this.anagramList[this.longestAnagramsKeys[i]]
      );
    }

    return longestAnagrams;
  }
}

module.exports.Anagram = Anagram;