const fs = require('fs');
const jsdom = require('jsdom');
const {getMostSimilarElementToTarget} = require('./src/getElementsSimilarity.js');
const {getElementPath} = require('./src/domPath.js');

try {
  const [
    originPath,
    diffPath,
    targetElementId = 'make-everything-ok-button'
  ] = process.argv.slice(2);

  const sampleFile = fs.readFileSync(originPath);
  const dom = new jsdom.JSDOM(sampleFile);

  const targetElement = dom.window.document.getElementById(targetElementId);

  // console.log(targetElement.tagName);

  const diffFile = fs.readFileSync(diffPath);
  const diffDom = new jsdom.JSDOM(diffFile);

  let elements = Array.prototype.slice.apply(diffDom.window.document.getElementsByTagName(targetElement.tagName));

  let mostSimilarElement = getMostSimilarElementToTarget(targetElement, elements);

  const arrSim = Array.prototype.slice.apply(mostSimilarElement.element.attributes);
  console.log(`Most similar element (similarity=${mostSimilarElement.similarity}):\n ${arrSim.map(attr => `${attr.name} = ${attr.value}`).join(', ')}`);
  console.log(`Path: ${getElementPath(mostSimilarElement.element)}`);
} catch (err) {
  console.error('Error trying to find element by id', err);
}