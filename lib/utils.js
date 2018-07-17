class Utils {
  static sortWord(word) {
    if (typeof word != 'string') {
      return undefined;
    }

    return word
      .toString()
      .toLowerCase()
      .split('')
      .sort()
      .join('');
  }
}

module.exports.Utils = Utils;