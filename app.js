const fs = require('fs');
const {JSDOM} = require('jsdom');


try {
  const [
    originPath,
    diffPath,
    targetElementId = 'make-everything-ok-button'
  ] = process.argv.slice(2);

  console.log(`originPath: ${originPath}`);
  console.log(`diffPath: ${diffPath}`);
  console.log(`targetElementId: ${targetElementId}`);

  const sampleFile = fs.readFileSync(originPath);
  const dom = new JSDOM(sampleFile);

  const button = dom.window.document.getElementById(targetElementId);
  console.log(`Successfully found element. Element Text: ${button.textContent}`);
  const array = Array.prototype.slice.apply(button.attributes);
  console.log(array.map(attr => `${attr.name} = ${attr.value}`).join(', '));
} catch (err) {
  console.error('Error trying to find element by id', err);
}