const stringSimilarity = require('string-similarity');

exports.getElementsSimilarity = function (origElem, diffElem) {
  const origAttributes = Array.prototype.slice.apply(origElem.attributes);
  const diffAttributes = Array.prototype.slice.apply(diffElem.attributes);

  let similarity = stringSimilarity.compareTwoStrings(JSON.stringify(origAttributes), JSON.stringify(diffAttributes));

  return similarity;
};