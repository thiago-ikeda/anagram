class Error {
  static getParameterUndefinedMessage(parameter) {
    return 'Parameter ' + parameter + ' is undefined';
  }

  static getLanguageIsNotAvailableMessage(lang) {
    return 'Language ' + lang + ' is not available';
  }

  static getWordDoesNotExistMessage(word, lang) {
    return 'The word ' + word + ' does not exist in the language ' + lang;
  }
}

module.exports.Error = Error;