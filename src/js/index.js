import { builtHtmlElement } from './templateHelper';

class Keyboard {
  constructor() {
    this.elements = {
      keyContainer: null,
      keys: [],
      textarea: null,
    };
    this.props = {
      capsLock: false,
      language: localStorage.getItem('lang') || 'en',
    };
  }

  init() {
    this.elements.textarea = builtHtmlElement({
      tagName: 'textarea',
      classList: ['keyboard__textarea'],
    });
    this.elements.keyContainer = builtHtmlElement({
      tagName: 'section',
      classList: ['keyboard__keys'],
    });

    this.elements.keyContainer.appendChild(this.createKeys(this.props.language));
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');

    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keyContainer);
  }

  createKeys(language) {
    const fragment = document.createDocumentFragment();
    const keyLayout = {
      en: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'],
      ru: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш'],
    };
    keyLayout[language].forEach(key => {
      const keyElement = builtHtmlElement({
        tagName: 'button',
        classList: ['keyboard__key'],
        attrs: {
          'type': 'button',
        },
      });
      keyElement.textContent = key.toLowerCase();
      keyElement.addEventListener('click', () => {
        this.elements.textarea.value += key.toLowerCase();
      });
      fragment.appendChild(keyElement);
    });
    return fragment;
  }
}

export default Keyboard;
