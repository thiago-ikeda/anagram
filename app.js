const fs      = require('fs');
const config  = require('./config.js');
const express = require('express');

const { Utils }   = require('./lib/utils.js');
const { Error }   = require('./lib/error.js');
const { Anagram } = require('./lib/anagram.js');

const app = express();

/* Load words list */
const LANG_EN_US = 'en-us';
const LANG_PT_BR = 'pt-br';

const enusWordListPath = require('word-list');
const ptbrWordListPath = './lang/pt-BR.txt';

const enusWordList = fs.readFileSync(enusWordListPath, 'utf8').split('\n');
const ptbrWordList = fs.readFileSync(ptbrWordListPath, 'utf8').split('\n');

/* Load anagrams */
const anagramList = {};
anagramList[LANG_EN_US] = new Anagram(enusWordList);
anagramList[LANG_PT_BR] = new Anagram(ptbrWordList);

/**
 * @api {get} /find Find Anagrams
 * @apiName FindAnagrams
 * @apiDescription This endpoint will find all anagrams in the words list based on the string sent
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} [lang]
 * @apiParam (query) {String} word
 *
 * @apiExample {curl} Examples usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/find?word=test
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/find?lang=en-us&word=test
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *      "sett",
 *      "stet",
 *      "tets"
 *   ]
 */
app.get('/find', (req, res) => {
  const word = req.query.word;

  if (!word) {
    res.status(400);
    res.send(
      Error.getParameterUndefinedMessage('word')
    );
    return;
  }

  const lang = (req.query.lang || LANG_EN_US).toLowerCase();

  if (anagramList[lang] == undefined) {
    res.status(400);
    res.send(
      Error.getLanguageIsNotAvailableMessage(lang)
    );
    return;
  }

  const anagrams = anagramList[lang].getAnagrams(word, false);

  if (!anagrams.includes(word)) {
    res.status(400);
    res.send(
      Error.getWordDoesNotExistMessage(word, lang)
    );
    return;
  }
  
  res.send(
    anagramList[lang].getAnagrams(word, true)
  );
});

/**
 * @api {get} /compare Compare Anagrams
 * @apiName CompareAnagrams
 * @apiDescription This endpoint will receive two words, and compare them to check if they are anagrams
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} [lang]
 * @apiParam (query) {String} word1
 * @apiParam (query) {String} word2
 *
 * @apiExample {curl} Examples usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/compare?word1=test&word2=sett
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/compare?lang=en-us&word1=test&word2=sett
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   true
 */
app.get('/compare', (req, res) => {
  const word1 = req.query.word1;
  
  if (!word1) {
    res.status(400);
    res.send(
      Error.getParameterUndefinedMessage('word1')
    );
    return;
  }

  const word2 = req.query.word2;

  if (!word2) {
    res.status(400);
    res.send(
      Error.getParameterUndefinedMessage('word2')
    );
    return;
  }

  const lang = (req.query.lang || LANG_EN_US).toLowerCase();

  if (anagramList[lang] == undefined) {
    res.status(400);
    res.send(
      Error.getLanguageIsNotAvailableMessage(lang)
    );
    return;
  }

  const anagramsWord1 = anagramList[lang].getAnagrams(word1, false);

  if (!anagramsWord1.includes(word1)) {
    res.status(400);
    res.send(
      Error.getWordDoesNotExistMessage(word1, lang)
    );
    return;
  }

  const anagramsWord2 = anagramList[lang].getAnagrams(word2, false);

  if (!anagramsWord2.includes(word2)) {
    res.status(400);
    res.send(
      Error.getWordDoesNotExistMessage(word2, lang)
    );
    return;
  }

  if (word1.length != word2.length) {
    res.send(false);
    return;
  }

  res.send(Utils.sortWord(word1) == Utils.sortWord(word2));
});

/**
 * @api {get} /find-longest Find longest Anagrams
 * @apiName FindLongestAnagrams
 * @apiDescription This endpoint will return the longest anagrams
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} [lang]
 *
 * @apiExample {curl} Examples usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/find-longest
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3000/find-longest?lang=en-us
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     [
 *        "microphotographies",
 *        "photomicrographies"
 *     ],
 *     [
 *        "pathophysiological",
 *        "physiopathological"
 *     ]
 *   ]
 */
app.get('/find-longest', (req, res) => {
  const lang = (req.query.lang || LANG_EN_US).toLowerCase();

  if (anagramList[lang] == undefined) {
    res.status(400);
    res.send(
      Error.getLanguageIsNotAvailableMessage(lang)
    );
    return;
  }

  res.send(
    anagramList[lang].getLongestAnagrams()
  );
});

app.listen(config.server.port, () => console.log('App listening on port ' + config.server.port));