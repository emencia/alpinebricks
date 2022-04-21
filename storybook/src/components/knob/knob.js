import "alpinejs";
import { KnobRingStore } from "../../../../packages/@alpinebricks-knob/dist/index.es.js";

console.log("initalp")
document.addEventListener('alpine:init', () => {
  console.log("Alpine init")
  window.knob = KnobRingStore({
    colorFunc: (v) => {
      if (v < 50) {
        return "red"
      } else if (v < 80) {
        return "orange"
      } else {
        return "green"
      }
    }
  });
  console.log("KNOBJS ->", window.data.knob)
});
//export { window.knob }