const styles = `
  <style>
    :host { display: block; }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    button {
      cursor: pointer;
    }
    .date-picker {
      position: relative;
      border: 1px solid #ccc;
      background-color: #fff;
    }
    .date-picker__toggle:hover {
      background-color: #eee;
    }
    .date-picker__toggle:before {
      position: absolute;
      right: 1rem;
      top: 50%;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px 8px 0 8px;
      border-color: #111 transparent transparent transparent;
      transform: translateY(-50%);
    }
    .date-picker__toggle {
      position: relative;
      display: block;
      width: 100%;
      padding: 1rem;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      border: none;
      background-color: transparent;
      transition: background-color linear 0.2s;
    }
    .date-picker__toggle--open:before {
      transform: translateY(-50%) rotateZ(180deg);
    }
    .date-picker__reset {
      position: absolute;
      right: 3rem;
      top: 50%;
      cursor: pointer;
      font-size: 0.7rem;
      text-decoration: underline;
      border: none;
      border-radius: 50%;
      background-color: transparent;
      transform: translateY(-50%);
    }
    .date-picker__reset:disabled {
      display: none;
    }
    .date-picker__reset:hover {
      background-color: #f5f5f5;
    }
    .date-picker__day {
      border: none;
    }
    .date-picker__selector {
      position: absolute;
      top: 100%;
      left: -1px;
      right: -1px;
      z-index: 2;
      padding: 1rem;
      background-color: rgba(255,255,255,0.5);
      border: 1px solid #ccc;
      backdrop-filter: blur(20px);
      box-shadow: 2px 2px 2px #ccc;
    }
    nav {
      margin-bottom: 1rem;
    }
    .calendar {
      width: 100%;
      border-collapse: collapse;
    }
    .calendar tr:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    th {
      padding: 0.5rem;
    }
    nav {
      display: flex;
    }
    .date-picker__previous,
    .date-picker__next {
      width: 1rem;
      height: 1rem;
      font-size: 0;
      border: none;
      background-color: transparent;
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAyIDUxMi4wMDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzg4LjQyNSwyNDEuOTUxTDE1MS42MDksNS43OWMtNy43NTktNy43MzMtMjAuMzIxLTcuNzItMjguMDY3LDAuMDRjLTcuNzQsNy43NTktNy43MiwyMC4zMjgsMC4wNCwyOC4wNjdsMjIyLjcyLDIyMi4xMDUNCgkJCUwxMjMuNTc0LDQ3OC4xMDZjLTcuNzU5LDcuNzQtNy43NzksMjAuMzAxLTAuMDQsMjguMDYxYzMuODgzLDMuODksOC45Nyw1LjgzNSwxNC4wNTcsNS44MzVjNS4wNzQsMCwxMC4xNDEtMS45MzIsMTQuMDE3LTUuNzk1DQoJCQlsMjM2LjgxNy0yMzYuMTU1YzMuNzM3LTMuNzE4LDUuODM0LTguNzc4LDUuODM0LTE0LjA1UzM5Mi4xNTYsMjQ1LjY3NiwzODguNDI1LDI0MS45NTF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
      background-repeat: no-repeat;
      background-size: 1rem;
    }
    .date-picker__previous {
      transform: rotateZ(180deg);
    }
    .date-picker__today {
      width: 15rem;
      height: 1rem;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;
      border: none;
      background-color: transparent;
    }
    table {
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: rgba(255,255,255,0.3);
    }
    th {
      font-weight: bold;
    }
    td {
      padding: 0.2rem 0;
      text-align: center;
    }
    .date-picker__day {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
      border-radius: 50%;
      line-height: 2rem;
      text-align: center;
      background-color: transparent;
    }
    .date-picker__day--selected {
      color: #fff;
      
      background-color: blue;
    }
    small {
      color: #555
    }
  </style>
`;

const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function weekCount(year, month_number, startDayOfWeek) {
  var firstDayOfWeek = startDayOfWeek || 0;
  var firstOfMonth = new Date(year, month_number - 1, 1);
  var lastOfMonth = new Date(year, month_number, 0);
  var numberOfDaysInMonth = lastOfMonth.getDate();
  var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  var used = firstWeekDay + numberOfDaysInMonth;

  return Math.ceil(used / 7);
}

class DatePicker extends HTMLElement {
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
    this.isOpen = false;
    this.selectedDate = null;
    const date = new Date();
    this.displayedMonth = date.getMonth();
    this.displayedYear = date.getFullYear();
  }

  render() {
    this.shadowRoot.innerHTML = '';
    const template = this.currentDocument.createElement('div');
    template.setAttribute('class', 'date-picker');

    const instance = template.cloneNode(true);
    this.shadowRoot.appendChild(instance);

    const container = this.shadowRoot.querySelector('.date-picker');
    container.innerHTML = this.componentTemplate({ selectedDate: this.selectedDate, isOpen: this.isOpen });

    if (this.isOpen) {
      const selector = this.currentDocument.createElement('div');
      selector.className = 'date-picker__selector';
      selector.innerHTML = this.selectorTemplate();
      container.appendChild(selector);

      const previous = container.querySelector('.date-picker__previous');
      previous.addEventListener('click', () => {
        if (this.displayedMonth > 0) {
          this.displayedMonth -= 1;
        } else {
          this.displayedMonth = 11;
          this.displayedYear -= 1;
        }
        this.render();
      });

      const next = container.querySelector('.date-picker__next');
      next.addEventListener('click', () => {
        if (this.displayedMonth < 11) {
          this.displayedMonth += 1;
        } else {
          this.displayedMonth = 0;
          this.displayedYear += 1;
        }
        this.render();
      });

      const today = container.querySelector('.date-picker__today');
      today.addEventListener('click', () => {
        this.displayedMonth = new Date().getMonth();
        this.displayedYear = new Date().getFullYear();
        this.render();
      });

      const days = container.querySelectorAll('.date-picker__day');
      days.forEach(day => {
        day.addEventListener('click', (e) => {
          const date = e.target.getAttribute('data-date');
          this.selectedDate = new Date(`${this.displayedMonth + 1}-${date}-${this.displayedYear}`);
          const event = new CustomEvent('onChange', { detail: { date: this.selectedDate } });
          this.dispatchEvent(event);
          this.render();
        });
      });
    }

    const toggle = container.querySelector('.date-picker__toggle');
    toggle.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.render();
    });

    const reset = container.querySelector('.date-picker__reset');
    reset.addEventListener('click', () => {
      this.selectedDate = null;
      this.render();
    });

  }

  getReadableDate(date) {
    var options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  }

  componentTemplate({ selectedDate, isOpen }) {
    return `
    ${styles}
    <button class="date-picker__toggle ${isOpen ? 'date-picker__toggle--open' : ''}">
      ${selectedDate ? this.getReadableDate(selectedDate) : `<small>Aucune date n'est sélectionnée</small>`}
    </button>
    <button class="date-picker__reset" ${!selectedDate ? 'disabled' : ''}>Effacer</button>
  `};

  isSelectedDate(date) {
    return this.selectedDate && date.getDate() === this.selectedDate.getDate() && date.getMonth() === this.selectedDate.getMonth() && date.getFullYear() === this.selectedDate.getFullYear();
  }

  getDays(week) {
    const days = [];
    const firstDay = new Date(`${this.displayedMonth + 1}-1-${this.displayedYear}`).getDay();
    const shift = firstDay - 1 < 0 ? 6 : firstDay - 1;

    for (let index = 0; index < 7; index++) {
      const day = week * 7 + index - shift + 1;
      const date = new Date(`${this.displayedMonth + 1}-${day}-${this.displayedYear}`);
      let button = '';

      if (date instanceof Date && !isNaN(date)) {
        const month = date.getMonth();
        button = `
          <button class="date-picker__day ${this.isSelectedDate(date) ? 'date-picker__day--selected' : ''}" data-date="${day}">
            ${month === this.displayedMonth ? date.getDate() : ''}
          </button>`;
      }

      days.push(`
        <td>
          ${button}
        </td>
      `)
    }

    return days.join('');
  }

  getWeeks() {
    const weeks = [];

    for (let index = 0; index < weekCount(this.displayedYear, this.displayedMonth + 1, 1); index++) {
      weeks.push(`
        <tr>
          ${this.getDays(index)}
        </tr>
      `);
    }

    return weeks.join('');
  }

  selectorTemplate() {
    return `
      <nav>
        <button class="date-picker__previous">Précédent</button>
        <button class="date-picker__today">${months[this.displayedMonth]} ${this.displayedYear}</button>
        <button class="date-picker__next">Suivant</button>
      </nav>
      <table class="calendar">
        <tr>
          <th>L</th>
          <th>M</th>
          <th>M</th>
          <th>J</th>
          <th>V</th>
          <th>S</th>
          <th>D</th>
        </tr>
        ${this.getWeeks()}
      </table>
    `;
  };
}

customElements.define('wc-date-picker', DatePicker);