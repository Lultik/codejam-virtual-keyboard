export const builtHtmlElement = ({ tagName, classList, attrs = {} }) => {
  const newElement = document.createElement(tagName);
  classList && newElement.classList.add(...classList);
  Object.keys(attrs).forEach((key) => newElement.setAttribute(key, attrs[key]));
  return newElement;
};
