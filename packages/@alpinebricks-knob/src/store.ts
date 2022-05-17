import { KnobRing } from "./component"

interface KnobStoreParams {
  progress?: number;
  color?: string;
  bg?: string;
  colorFunc?: (v: number) => string;
}

function create(params: KnobStoreParams): typeof Alpine.store {
  Alpine.store('knobRing', {
    progress: params.progress,
    //color: color,
    bg: params.bg,
    init() {
      this.progress = params?.progress ?? 0;
      this.bg = params?.bg ?? "lightgrey";
      this.color = params?.color ?? "green"
      if (params.colorFunc) {
        this.color = params.colorFunc(this.progress)
      }
    },
    animate(p: number) {
      this.sleep(10).then(() => this.update(p));
    },
    update(progress: number) {
      this.progress = progress
      if (params.colorFunc) {
        this.color = params.colorFunc(progress)
      }
    },
    increment(add = 1) {
      if (this.progress <= (100 - add)) {
        this.update(this.progress + add);
      } else {
        console.warn("Can not increment: progress would be over 100")
      }
    },
    decrement(add = 1) {
      if ((this.progress - add) >= 0) {
        this.update(this.progress - add);
      } else {
        console.warn("Can not decrement: progress would be under 0")
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

export { create }
