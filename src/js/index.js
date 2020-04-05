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
      isShiftPressed: true,
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

    this.elements.keyContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');

    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.keyContainer);

    document.addEventListener('keydown', (e) => { this.pressKey(e); });
    document.addEventListener('keyup', (e) => { this.keyUp(e); });
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = (this.props.language === 'en') ? lang.en : lang.ru;

    Object.entries(keyLayout).forEach(([code, key]) => {
      const keyElement = builtHtmlElement({
        tagName: 'button',
        classList: ['keyboard__key'],
        attrs: {
          type: 'button',
        },
      });
      const lineBreaks = ['Backspace', '\\', 'Enter', 'arrowUp'].includes(key);

      switch (code) {
        case 'Backspace':
          keyElement.innerHTML = '<span>Backspace</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value = this.elements.textarea.value
              .substring(0, this.elements.textarea.value.length - 1);
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
        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.innerHTML = '<span>Shift</span>';
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleCapsLock();
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
        case 'ControlLeft':
        case 'ControlRight':
          keyElement.innerHTML = '<span>Ctrl</span>';
          break;
        case 'AltLeft':
        case 'AltRight':
          keyElement.innerHTML = '<span>Alt</span>';
          break;
        case 'LangSwitch':
          keyElement.innerHTML = `<span>${key}</span>`;
          keyElement.addEventListener('mousedown', () => {
            this.toggleLanguage();
          });
          break;
        case 'ArrowUp':
          keyElement.innerHTML = '<span class="arrow arrow__up"></span>';
          break;
        case 'ArrowDown':
          keyElement.innerHTML = '<span class="arrow arrow__down"></span>';
          break;
        case 'ArrowLeft':
          keyElement.innerHTML = '<span class="arrow arrow__left"></span>';
          break;
        case 'ArrowRight':
          keyElement.innerHTML = '<span class="arrow arrow__right"></span>';
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.elements.textarea.value += this.props.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
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
    const keyLayout = (this.props.language === 'en') ? lang.en : lang.ru;
    if (event.shiftKey && event.altKey) {
      this.toggleLanguage();
    }
    if (event.code === 'ShiftLeft' && this.props.isShiftPressed) {
      this.toggleCapsLock();
      this.props.isShiftPressed = false;
    }

    Object.entries(keyLayout).forEach(([code, key]) => {

      if (event.code === code) {
        switch (code) {
          case 'Backspace':
            this.elements.textarea.value = this.elements.textarea.value
              .substring(0, this.elements.textarea.value.length - 1);
            break;
          case 'Tab':
            this.elements.textarea.value += '\t';
            break;
          case 'CapsLock':
            this.toggleCapsLock();
            break;
          case 'Enter':
            this.elements.textarea.value += '\n';
            break;
          case 'Space':
            this.elements.textarea.value += ' ';
            break;
          case 'ShiftRight':
          case 'ShiftLeft':
          case 'ControlLeft':
          case 'ControlRight':
          case 'AltLeft':
          case 'AltRight':
          case 'ArrowUp':
          case 'ArrowDown':
          case 'ArrowLeft':
          case 'ArrowRight':
            break;

          default:
            this.elements.textarea.value += this.props.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            break;
        }
      }
    });
  }

  keyUp(event) {
    if (event.code === 'ShiftLeft') {
      this.toggleCapsLock();
      this.props.isShiftPressed = true;
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
    this.elements.keyContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
    localStorage.setItem('lang', this.props.language);
  }
}

export default Keyboard;
