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

  const button = dom.window.document.getElementById(targetElementId);
  console.log(`Successfully found element. Element Text: ${button.textContent}`);


  const diffFile = fs.readFileSync(diffPath);
  const diffDom = new JSDOM(diffFile);

  let buttons = [];
  buttons = buttons.concat(Array.prototype.slice.apply(diffDom.window.document.getElementsByTagName('a')));
  buttons = buttons.concat(Array.prototype.slice.apply(diffDom.window.document.getElementsByTagName('button')));

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] && buttons[i].attributes) {
      const arr = Array.prototype.slice.apply(buttons[i].attributes);
      console.log(arr.map(attr => `${attr.name} = ${attr.value}`).join(', '));
      let similarity = getElementsSimilarity(button, buttons[i]);
      console.log(similarity);
    }
  }

  const array = Array.prototype.slice.apply(button.attributes);
  console.log(array.map(attr => `${attr.name} = ${attr.value}`).join(', '));
} catch (err) {
  console.error('Error trying to find element by id', err);
}