exports.getElementPath = function (element) {
  let path = [];
  let pathString = '';

  while (element) {
    path.unshift(element);
    if (pathString === '') {
      pathString = element.tagName
    } else {
      pathString = `${element.tagName} > ` + pathString;
    }
    if (element.tagName === 'HTML') {
      break;
    } else {
      element = element.parentNode;
    }
  }

  return pathString
};