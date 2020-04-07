import builtHtmlElement from './templateHelper';
import lang from './language';

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
    this.keyLayout = lang[this.props.language];
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

    Object.entries(this.keyLayout).forEach(([key, value]) => {
      const keyElement = builtHtmlElement({
        tagName: 'button',
        classList: ['keyboard__key'],
        attrs: {
          type: 'button',
        },
      });
      const lineBreaks = ['Backspace', '\\', 'Enter', 'arrowUp'].includes(value);

      switch (key) {
        case 'Backspace':
          keyElement.innerHTML = '<span>Backspace</span>';
          keyElement.classList.add('keyboard__key_wide');
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value = this.elements.textarea.value
              .substring(0, this.elements.textarea.value.length - 1);
          });
          break;
        case 'Tab':
          keyElement.innerHTML = '<span>Tab</span>';
          keyElement.classList.add('keyboard__key_wide');
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '\t';
          });
          break;
        case 'CapsLock':
          keyElement.innerHTML = '<div class="capsLight"></div><span>CapsLock</span>';
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key_capsLock');
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
          });
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.innerHTML = '<span>Shift</span>';
          keyElement.classList.add('keyboard__key_wide');
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleCapsLock();
          });
          break;
        case 'Enter':
          keyElement.innerHTML = '<span>Enter</span>';
          keyElement.classList.add('keyboard__key_wide');
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '\n';
          });
          break;
        case 'Space':
          keyElement.innerHTML = '<span>#&32</span>';
          keyElement.classList.add('keyboard__key_extra-wide');
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
          keyElement.innerHTML = `<span>${value}</span>`;
          keyElement.classList.add('keyboard__key_wide');
          keyElement.addEventListener('mousedown', () => {
            this.toggleLanguage();
          });
          break;
        case 'ArrowUp':
          keyElement.classList.add('arrow__up');
          keyElement.innerHTML = '<span class="arrow">ArrowUp</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '↑';
          });
          break;
        case 'ArrowDown':
          keyElement.classList.add('arrow__down');
          keyElement.innerHTML = '<span class="arrow">ArrowDown</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '↓';
          });
          break;
        case 'ArrowLeft':
          keyElement.classList.add('arrow__left');
          keyElement.innerHTML = '<span class="arrow">ArrowLeft</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '←';
          });
          break;
        case 'ArrowRight':
          keyElement.classList.add('arrow__right');
          keyElement.innerHTML = '<span class="arrow">ArrowRight</span>';
          keyElement.addEventListener('mousedown', () => {
            this.elements.textarea.value += '→';
          });
          break;

        default:
          keyElement.textContent = value.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.elements.textarea.value += this.props.capsLock
              ? value.toUpperCase()
              : value.toLowerCase();
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
    this.elements.textarea.blur();
    if (event.shiftKey && event.altKey) {
      this.toggleLanguage();
    }
    if (event.code === 'ShiftLeft' && this.props.isShiftPressed) {
      this.toggleCapsLock();
      this.props.isShiftPressed = false;
    }

    Object.entries(this.keyLayout).forEach(([key, value]) => {
      if (event.code === key) {
        this.elements.keys.forEach((item) => {
          if (item.textContent.toLowerCase() === value.toLowerCase()) {
            item.classList.add('keyboard__key_active');
          }
        });
        switch (key) {
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
            break;
          case 'Enter':
            this.elements.textarea.value += '\n';
            break;
          case 'Space':
            event.preventDefault();
            this.elements.textarea.value += ' ';
            break;
          case 'ShiftRight':
          case 'ShiftLeft':
          case 'ControlLeft':
          case 'ControlRight':
          case 'AltLeft':
          case 'AltRight':
            event.preventDefault();
            break;
          case 'ArrowUp':
            this.elements.textarea.value += '↑';
            break;
          case 'ArrowDown':
            this.elements.textarea.value += '↓';
            break;
          case 'ArrowLeft':
            this.elements.textarea.value += '←';
            break;
          case 'ArrowRight':
            this.elements.textarea.value += '→';
            break;
          default:
            this.elements.textarea.value += this.props.capsLock
              ? value.toUpperCase()
              : value.toLowerCase();
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
    this.elements.keys.forEach((item) => {
      if (item.textContent !== 'CapsLock') {
        item.classList.remove('keyboard__key_active');
      }
    });
  }

  toggleCapsLock() {
    this.props.capsLock = !this.props.capsLock;

    for (let i = 0; i < this.elements.keys.length; i += 1) {
      if (this.elements.keys[i].childElementCount === 0) {
        this.elements.keys[i].textContent = this.props.capsLock
          ? this.elements.keys[i].textContent.toUpperCase()
          : this.elements.keys[i].textContent.toLowerCase();
      } else if (this.elements.keys[i].textContent === 'CapsLock') {
        this.elements.keys[i].classList.toggle('keyboard__key_active', this.props.capsLock);
      }
    }
  }

  toggleLanguage() {
    this.props.language = this.props.language === 'en' ? 'ru' : 'en';
    this.keyLayout = lang[this.props.language];
    this.elements.keyContainer.innerHTML = '';
    this.elements.keyContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');
    localStorage.setItem('lang', this.props.language);
  }
}

export default Keyboard;
