//import knob from "./knob.html";

const story = {
  title: "Components/Knob",
  parameters: {
    layout: "centered",
  }
};

export default story;

function createComp(args) {
  return `<div class="htmlcode">
  <knob-ring id="knobr" x-cloak x-data stroke="10" radius="100" 
  bg="${args.backgroundColor}" 
  :progress="${args.progress}"
  color="${args.color}">
  </knob-ring>
</div>
  `
}

const Template = (args) => createComp(args);
export const knobRing = Template.bind({});
knobRing.args = {
  progress: 10,
  color: "red",
  backgroundColor: "lightgray",
}
