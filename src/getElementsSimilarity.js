const stringSimilarity = require('string-similarity');

function getElementStringifiedData (element) {
  let origAttributes = Array.prototype.slice.apply(element.attributes);
  origAttributes.textContent = element.textContent;
  return JSON.stringify(origAttributes);
}

function getElementsSimilarity (origElem, diffElem) {
  if (diffElem.attributes.id
    && diffElem.attributes.id.value === origElem.attributes.id.value) {
    // ids match -> perfect match
    return 1;
  }

  let origData = getElementStringifiedData(origElem);
  let diffData = getElementStringifiedData(diffElem);

  return stringSimilarity.compareTwoStrings(origData, diffData);
}

exports.getMostSimilarElementToTarget = function (targetElement, elements) {
  let mostSimilarElement = {
    element: null,
    similarity: 0
  };

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] && elements[i].attributes) {
      let diffElement = elements[i];
      let similarity = getElementsSimilarity(targetElement, diffElement);

      if (similarity > mostSimilarElement.similarity) {
        mostSimilarElement.element = diffElement;
        mostSimilarElement.similarity = similarity;
      }
    }
  }

  return mostSimilarElement;
};



