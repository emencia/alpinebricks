class KnobRing extends HTMLElement {
  setReady = (p) => null;
  isReady = new Promise((r) => this.setReady);
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['progress', 'color', 'bg'];
  }

  connectedCallback() {
    // attributes
    this._id = this.getAttribute('id') ?? "";
    this._stroke = this.getAttribute('stroke') ?? 8;
    this._radius = this.getAttribute('radius');
    const progressAttr = this.getAttribute('progress');
    this._strokeColor = this.getAttribute('color') ?? 'green';
    this._progress = progressAttr;
    this._bgColor = this.getAttribute('bg') ?? "lightgray";
    this._normalizedRadius = this._radius - this._stroke * 2;
    this._circumference = this._normalizedRadius * 2 * Math.PI;
    this.ids = {
      main: "knob-" + this._id,
      bg: "knob-background-" + this._id,
      ov: "knob-overlay-" + this.id,
      txt: "knob-text-" + this.id
    };
    // html
    this.shadowRoot.innerHTML = `
        <svg      
          id="${this.ids.main}"    
          height="${this._radius * 2}"
          width="${this._radius * 2}"
         >
          <circle
              id="${this.ids.bg}"
              class="knob-background"
              stroke="${this._bgColor}"
              stroke-dasharray="0"
              style="stroke-dashoffset:100"
              stroke-width="${this._stroke}"
              fill="transparent"
              r="${this._normalizedRadius}"
              cx="${this._radius}"
              cy="${this._radius}"
            />
           <circle
             id="${this.ids.ov}"
             class="knob-overlay"
             stroke="${this._strokeColor}"
             stroke-dasharray="${this._circumference} ${this._circumference}"
             style="stroke-dashoffset:${this._circumference}"
             stroke-width="${this._stroke}"
             fill="transparent"
             r="${this._normalizedRadius}"
             cx="${this._radius}"
             cy="${this._radius}"
          />
          <text 
            id="${this.ids.txt}"
            class="knob-text"
            x="${parseFloat(this._radius) - 40}" 
            y="${parseFloat(this._radius) + 10}" 
            fill="${this._strokeColor}"
            >${this._progress} %</text>
        </svg>
        <style>
          #${this.ids.ov} {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
          }
          #${this.ids.txt} {
            font-size:250%
          }
        </style>
      `;
    this.setReady(true);
  }

  setProgress(percent) {
    //console.log("Set progress", percent)
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this.shadowRoot.querySelector(`#${this.ids.ov}`);
    circle.style.strokeDashoffset = offset;
    const txt = this.shadowRoot.querySelector(`#${this.ids.txt}`);
    txt.innerHTML = percent + " %";
  }

  setColor(val) {
    //console.log("Set color", val)
    const circle = this.shadowRoot.querySelector(`#${this.ids.ov}`);
    circle.style.stroke = val;
    const txt = this.shadowRoot.querySelector(`#${this.ids.txt}`);
    txt.style.fill = val;
  }

  setBgColor(val) {
    //console.log("Set bg color", val)
    const circle = this.shadowRoot.querySelector(`#${this.ids.bg}`);
    circle.style.stroke = val;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.isConnected != true) { return }
    this.isReady.then(() => {
      if (name === 'progress') {
        this.setProgress(newValue);
      } else if (name === 'color') {
        this.setColor(newValue);
      } else if (name === 'bg') {
        this.setBgColor(newValue);
      }
    });
  }
}

function create(params = {
    progress: 0,
    color: "green",
    bg: "lightgrey",
}) {
    Alpine.store('knobRing', {
        progress: params.progress,
        //color: color,
        bg: params.bg,
        init() {
            var _a;
            if (params.colorFunc) {
                this.color = params.colorFunc((_a = params.progress) !== null && _a !== void 0 ? _a : 0);
            }
        },
        animate(p) {
            this.sleep(10).then(() => this.update(p));
        },
        update(progress) {
            this.progress = progress;
            if (params.colorFunc) {
                this.color = params.colorFunc(progress);
            }
        },
        increment(add = 1) {
            if (this.progress <= (100 - add)) {
                this.update(this.progress + add);
            }
            else {
                console.warn("Can not increment: progress would be over 100");
            }
        },
        decrement(add = 1) {
            if ((this.progress - add) >= 0) {
                this.update(this.progress - add);
            }
            else {
                console.warn("Can not decrement: progress would be under 0");
            }
        },
        sleep(ms = 1000) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        /*get color(): string {
    
        }*/
    });
    return Alpine.store("knobRing");
}
window.customElements.define('knob-ring', KnobRing);

export { KnobRing, create as KnobRingStore };
