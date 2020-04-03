import { builtHtmlElement } from './templateHelper';
import { lang } from './language';

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
      attrs: {
        rows: '10',
      },
    });
    this.elements.keyContainer = builtHtmlElement({
      tagName: 'section',
      classList: ['keyboard__keys'],
    });


    this.elements.keyContainer.appendChild(this.createKeys(this.props.language));
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');

    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keyContainer);

    document.addEventListener('keydown', (e) => { this.pressKey(e); });
    document.addEventListener('keyup', (e) => { this.keyUp(e); });
  }

  createKeys(language) {
    const fragment = document.createDocumentFragment();
    const keyLayout = {
      en: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up',
        'Ctrl', 'lang', 'Alt', 'Space', 'Ctrl', 'Left', 'Down', 'Right'],
      ru: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up',
        'Ctrl', 'lang', 'Alt', 'Space', 'Ctrl', 'Left', 'Down', 'Right'],
    };

    keyLayout[language].forEach((key) => {
      const keyElement = builtHtmlElement({
        tagName: 'button',
        classList: ['keyboard__key'],
        attrs: {
          type: 'button',
        },
      });
      const lineBreaks = ['Backspace', '\\', 'Enter', 'Up'].includes(key);

      switch (key) {
        case 'Backspace':
          keyElement.innerHTML = '<span>Backspace</span>';
          keyElement.addEventListener('mousedown', () => {
            // eslint-disable-next-line max-len
            this.elements.textarea.value = this.elements.textarea.value.substring(0, this.elements.textarea.value.length - 1);
          });
          break;
        case 'Tab':
          keyElement.innerHTML = '<span>Tab</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '\t';
          });
          break;
        case 'CapsLock':
          keyElement.innerHTML = '<span>CapsLock</span>';
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__capslock--active', this.props.capsLock);
          });
          break;
        case 'Enter':
          keyElement.innerHTML = '<span>Enter</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '\n';
          });
          break;
        case 'Space':
          keyElement.innerHTML = '<span>&#32</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += ' ';
          });
          break;
        case 'Ctrl':
          keyElement.innerHTML = '<span>Ctrl</span>';
          break;
        case 'Alt':
          keyElement.innerHTML = '<span>Alt</span>';
          break;
        case 'Shift':
          keyElement.innerHTML = '<span>Shift</span>';
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleCapsLock();
          });
          break;
        case 'lang':
          keyElement.innerHTML = '<span>lang</span>';
          keyElement.addEventListener('mousedown', () => {
            this.toggleLanguage();
          });
          break;
        case 'Up':
          keyElement.innerHTML = '<span class="arrow arrow__up"></span>';
          break;
        case 'Down':
          keyElement.innerHTML = '<span class="arrow arrow__down"></span>';
          break;
        case 'Left':
          keyElement.innerHTML = '<span class="arrow arrow__left"></span>';
          break;
        case 'Right':
          keyElement.innerHTML = '<span class="arrow arrow__right"></span>';
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            // eslint-disable-next-line no-unused-expressions
            this.props.capsLock
              ? this.elements.textarea.value += key.toUpperCase()
              : this.elements.textarea.value += key.toLowerCase();
          });
          break;
      }

      fragment.appendChild(keyElement);
      if (lineBreaks) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  }

  pressKey(event) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (event.shiftKey && event.altKey) {
        this.toggleLanguage();
      }

      if (event.key === key.textContent) {
        switch (event.key) {
          case 'Backspace':
            this.elements.textarea.value = this.elements.textarea.value
              .substring(0, this.elements.textarea.value.length - 1);
            break;
          case 'Tab':
            event.preventDefault();
            this.elements.textarea.value += '\t';
            break;
          case 'CapsLock':
            this.toggleCapsLock();
            key.classList.toggle('keyboard__capslock--active', this.props.capsLock);
            break;
          case 'Shift':
            this.toggleCapsLock();
            break;
          case 'Enter':
            this.elements.textarea.value += '\n';
            break;
          case 'Space':
            this.elements.textarea.value += ' ';
            break;
          case 'Ctrl':
            break;
          case 'Alt':
            break;
          case 'Up':
            break;
          case 'Down':
            break;
          case 'Left':
            break;
          case 'Right':
            break;

          default:
            this.elements.textarea.value += this.props.capsLock
              ? key.textContent.toUpperCase()
              : key.textContent.toLowerCase();
            break;
        }
      }
    }
  }

  keyUp(event) {
    if (event.shiftKey) {
      this.toggleCapsLock();
    }
  }

  toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.props.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }

  toggleLanguage() {
    this.props.language = this.props.language === 'en' ? 'ru' : 'en';
    this.elements.keyContainer.innerHTML = '';
    this.elements.keyContainer.appendChild(this.createKeys(this.props.language));
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
  }
}

export default Keyboard;
