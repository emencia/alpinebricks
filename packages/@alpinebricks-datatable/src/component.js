class CaretSorter extends HTMLElement {
  sortedUp = false;
  sortedDown = false;
  col = "";
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['state'];
  }

  connectedCallback() {
    const state = this.getAttribute('state');
    this.col = this.getAttribute('col');
    console.log("STATE", state);
    const carretDown = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="0.63em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 320 512">
      <path fill="${this.sortedUp ? 'red' : 'currentColor'}" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
    </svg>`;
    const carretUp = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="0.63em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 320 512">
      <path fill="${this.sortedDown ? 'red' : 'currentColor'}" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"/>
    </svg>`;
    this.shadowRoot.innerHTML = `<div>${carretUp}<br />${carretDown}</div>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.isConnected != true) { return }
    if (name === 'state') {
      const val = JSON.parse(decodeURIComponent(newValue));
      console.log("NEW STATE", val);
      let _sortedUp = false;
      let _sortedDown = false;
      if (val.col == this.col) {
        if (val.mode == "asc") {
          _sortedUp = true
        } else {
          _sortedDown = true
        }
      }
      this.sortedUp = _sortedUp;
      this.sortedDown = _sortedDown;
      console.log("SORT", this.sortedUp, this.sortedDown)
    }
  }
}

export { CaretSorter }