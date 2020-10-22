class Tabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.currentDocument = document.currentScript.ownerDocument;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    this.init();
    this.render();
  }

  init() {
    this.current = parseInt(this.getAttribute('current')) || 0;
    this.tabs = [];

    this.childNodes.forEach(node => {
      if (node.tagName) {
        this.tabs.push(node);
      }
    });
  }

  render() {
    const template = this.currentDocument.createElement('div');
    template.setAttribute('class', 'tabs');

    const instance = template.cloneNode(true);
    this.shadowRoot.appendChild(instance);

    this.nav = this.currentDocument.createElement('nav');

    this.tabs.forEach((tab, index) => {
      const button = this.currentDocument.createElement('button')
      button.className = 'tab';
      button.innerText = tab.title;
      button.addEventListener('click', () => {
        this.current = index;
        this.render()
      })
      this.nav.appendChild(button)

      const isCurrent = index === this.current;
      tab.style.display = isCurrent ? 'block' : 'none';
      button.classList.toggle('tab--current', isCurrent);
      button.disabled = isCurrent;
    });

    const container = this.shadowRoot.querySelector('.tabs');
    container.innerHTML = tabsTemplate();
    this.shadowRoot.querySelector('.tabs').prepend(this.nav);
  }
}

const tabsTemplate = () => `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    nav {
      position: relative;
      z-index: 1;
      margin-bottom: -1px;
    }
    .tab {
      background-color: transparent;
      color: #333;
      padding: 0.7rem 1.5rem;
      cursor: pointer;
      border: 1px solid transparent;
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      transition:
        background-color linear 0.2s,
        border linear 0.2s,
        opacity linear 0.2s;
    }
    .tab:not(:disabled):hover {
      opacity: 0.5;
    }
    .tab--current {
      border-color: #ccc;
      background-color: #fff;
    }
  </style>
  <slot></slot>
`;

customElements.define('wc-tabs', Tabs);

class Tab extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.currentDocument = document.currentScript.ownerDocument;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    this.render();
  }

  render() {
    const template = this.currentDocument.createElement('div');
    template.className = 'tab';
    template.innerHTML = tabTemplate();
    this.shadowRoot.appendChild(template);
  }
}

const tabTemplate = () => `
  <style>
    .tab {
      overflow: hidden;
      padding: 1rem;
      border: 1px solid #ccc;
      background-color: #fff;
    }
  </style>
  <slot></slot>
`;

customElements.define('wc-tab', Tab);