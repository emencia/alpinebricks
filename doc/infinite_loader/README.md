# Infinite loader

Get the component:

```bash
wget https://raw.githubusercontent.com/emencia/alpinebricks/master/dist/components/infinite_loader/infinite_loader.min.js
```

Include the Alpinejs and Htmx libs in your html:

```html
  <script type="text/javascript" src="https://unpkg.com/@alpinejs/intersect@3.9.1/dist/cdn.min.js" defer></script>
  <script type="text/javascript" src="https://unpkg.com/alpinejs@3.9.1/dist/cdn.min.js" defer></script>
  <script type="text/javascript" src="https://unpkg.com/htmx.org@1.7.0"></script>
```

Include the component:

```html
  <script src="/dist/components/infinite_loader/infinite_loader.min.js"></script>
```

Initialize it:

```html
<script>
var $loader;
document.addEventListener('alpine:init', () => {
  $loader = $infiniteLoader.create(true);
  $loader.hxget('/pages/infinite_loader/partial.html', '#content');
});
</script>
```

Use it in your html:

```html
    <div id="content"></div>
    <div x-data x-intersect="$loader.loadMore('/pages/infinite_loader/partial.html', '#content')">
    </div>
```

This will load the partial template from the url in the content block, adding to it