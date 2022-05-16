export function create(isDebug = false) {
  Alpine.store('autocomplete', {
    isLoading: false,
    searchTerm: "",
    get hasResults() {
      return (this.searchTerm !== "") && (this.isLoading == false);
    },
    resetSearch(idDest: string) {
      const el = document.getElementById(idDest);
      if (el) {
        el.innerHTML = "";
      } else {
        console.warn(idDest, "not found in dom")
      }
    },
    resetInput(idDest: string) {
      this.searchTerm = "";
      const el = document.getElementById(idDest);
      if (el) {
        (el as HTMLInputElement).value = "";
      } else {
        console.warn(idDest, "not found in dom")
      }
    },
    resetAll(inputIdDest: string, searchIdDest: string) {
      this.resetInput(inputIdDest);
      this.resetSearch(searchIdDest);
    },
    search(url: string, destSelector: string, searchIdDest: string) {
      if (this.isLoading) {
        if (isDebug) {
          console.log("Already searching")
        }
        return
      }
      this.resetSearch(destSelector.replace("#", ''));
      this.isLoading = true;
      if (this.searchTerm == "") {
        //console.log("RESET");
        this.isLoading = false;
        return
      }
      if (isDebug) {
        console.log("Search", this.searchTerm)
      }
      htmx.ajax('GET', url, { target: destSelector, swap: 'innerHTML' }).then(() => {
        this.isLoading = false;
        window.dispatchEvent(new CustomEvent("result-loaded"))
      });
    }
  });
  return Alpine.store("autocomplete");
}