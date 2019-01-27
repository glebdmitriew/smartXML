const fs = require('fs');
const {JSDOM} = require('jsdom');
const {getElementsSimilarity} = require('./src/getElementsSimilarity.js');


try {
  const [
    originPath,
    diffPath,
    targetElementId = 'make-everything-ok-button'
  ] = process.argv.slice(2);

  const sampleFile = fs.readFileSync(originPath);
  const dom = new JSDOM(sampleFile);

  const targetElement = dom.window.document.getElementById(targetElementId);

  console.log(targetElement.tagName);

  const diffFile = fs.readFileSync(diffPath);
  const diffDom = new JSDOM(diffFile);

  let elements = Array.prototype.slice.apply(diffDom.window.document.getElementsByTagName(targetElement.tagName));

  let mostSimilarElement = {
    element: null,
    similarity: 0
  };

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] && elements[i].attributes) {
      let diffElement = elements[i];
      const arr = Array.prototype.slice.apply(diffElement.attributes);
      console.log(arr.map(attr => `${attr.name} = ${attr.value}`).join(', '));
      let similarity = getElementsSimilarity(targetElement, diffElement);
      console.log(similarity);

      if (similarity > mostSimilarElement.similarity) {
        mostSimilarElement.element = diffElement;
        mostSimilarElement.similarity = similarity;
      }
    }
  }


  const arrSim = Array.prototype.slice.apply(mostSimilarElement.element.attributes);
  console.log(`Most similar element: ${arrSim.map(attr => `${attr.name} = ${attr.value}`).join(', ')}`);
  console.log(`Most similar element: ${mostSimilarElement.similarity}`);

  const array = Array.prototype.slice.apply(targetElement.attributes);
  console.log(array.map(attr => `${attr.name} = ${attr.value}`).join(', '));
} catch (err) {
  console.error('Error trying to find element by id', err);
}