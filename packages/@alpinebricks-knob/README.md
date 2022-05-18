# Knob ring

A knob ring gauge

Include the Alpinejs lib in your html:

```html
  <script type="text/javascript" src="https://unpkg.com/alpinejs@3.9.1/dist/cdn.min.js" defer></script>
```

Include the component:

```html
  <script src="https://unpkg.com/@alpinebricks/knob@0.0.4/dist/index.min.js"></script>
```

Initialize it and animate to a given value when it displays:

```html
<script>
var $knob;
document.addEventListener('alpine:init', () => {
  $knob = $knobRing.create();
  // run the initial animation
  $knob.animate(30);
  // and later run update to animate to a value
  $knob.update(40);
});
</script>
```

Declare the component:

```html
    <knob-ring id="knob1" x-cloak x-data stroke="10" radius="100" bg="lightgray"
        :progress="$knob.progress" :color="$knob.color">
    </knob-ring>
```

## Parameters

Standard parameters:

- `stroke`: stroke width of the circle
- `radius`: controls the size of the circle
- `bg`: the background circle color

Watched parameters:

- `progress`: the displayed value
- `color`: the main circle color

## Methods

- `animate(v: number)`: animate the initial value
- `update(v: number)`: animate to a value
- `increment(v?: number)`: increment the progress by a value, by 1 if not provided
- `decrement(v?: number)`: decrement the progress by a value, by 1 if not provided

## Options

It is possible to provide a color function at init time to control the main
circle color from the progress value. Example:

```html
<script>
var $knob;
document.addEventListener('alpine:init', () => {
  $knob = $knobRing.create({
    colorFunc: (v) => {
      if (v < 50) {
        return "red" // or any color code
      } else if (v < 80) {
        return "orange"
      } else {
        return "green"
      }
    }
  });
});
</script>
```
