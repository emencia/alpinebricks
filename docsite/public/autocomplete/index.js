var $autocomplete = (function (exports) {
  'use strict';

  function create(isDebug = false) {
      Alpine.store('autocomplete', {
          isLoading: null,
          searchTerm: "",
          get hasResults() {
              return (this.searchTerm !== "") && (this.isLoading !== true);
          },
          resetSearch(idDest) {
              const el = document.getElementById(idDest);
              if (el) {
                  el.innerHTML = "";
              }
              else {
                  console.warn(idDest, "not found in dom");
              }
          },
          resetInput(idDest) {
              this.searchTerm = "";
              const el = document.getElementById(idDest);
              if (el) {
                  el.value = "";
              }
              else {
                  console.warn(idDest, "not found in dom");
              }
          },
          resetAll(inputIdDest, searchIdDest) {
              this.resetInput(inputIdDest);
              this.resetSearch(searchIdDest);
          },
          search(url, destSelector) {
              if (this.isLoading) {
                  if (isDebug) {
                      console.log("Already searching");
                  }
                  return;
              }
              this.resetSearch(destSelector.replace("#", ''));
              this.isLoading = true;
              if (this.searchTerm == "") {
                  //console.log("RESET");
                  this.isLoading = false;
                  return;
              }
              if (isDebug) {
                  console.log("Search", this.searchTerm);
              }
              htmx.ajax('GET', url, { target: destSelector, swap: 'innerHTML' }).then(() => {
                  this.isLoading = false;
                  window.dispatchEvent(new CustomEvent("result-loaded"));
              });
          }
      });
      return Alpine.store("autocomplete");
  }

  exports.create = create;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
