# Autocomplete

An autocomplete engine

Include the Alpinejs lib in your html:

```html
  <script type="text/javascript" src="https://unpkg.com/alpinejs@3.9.1/dist/cdn.min.js" defer></script>
```

Include the component:

```html
  <script src="https://unpkg.com/@alpinebricks/autocomplete@0.0.1/dist/index.min.js"></script>
```

Initialize it:

```html
<script>
var $autocomplete;
document.addEventListener('alpine:init', () => {
  $autocomplete = $autocomplete.create();
});
</script>
```

Use it in html:

```html
<div x-data>
  <input id="searchinput"
    x-on:input.debounce.500="$autocomplete.search('http://localhost:8080/search.html', '#results','searchinput')"
    x-model="$autocomplete.searchTerm" />
  <div x-ref="resultsref" id="results"></div>
  <div class="px-2 py-5 d-flex justify-content-center">
    <div class="spinner-border" role="status" x-show="$autocomplete.isLoading">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</div>
```

## Methods

- `search(url: string, destSelector: string, searchIdDest: string)`: run the search query
- `resetSearch(idDest: string))`: reset the search results area
- `resetInput(idDest: string)`: reset the search input content
- `resetAll(inputIdDest: string, searchIdDest: string)`: reset both search area and input

## Properties

- `searchTerm`: the current searched term
- `isLoading`: true if the search is running

## Getters

- `hasResults`: true if the search term is not null and the search has finished loading

## Events

A custom `result-loaded` event is fired when the search result is available. To use it in html:

```html
<div x-on:result-loaded.window="doSomething()">
```

To use it in javascript:

```javascript
window.addEventListener("result-loaded", function (evt) {
  console.log("result loaded event was triggered")
  // ...
})
```

