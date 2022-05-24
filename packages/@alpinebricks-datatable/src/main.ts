import { CaretSorter } from "./component";

function create(isDebug = false): typeof Alpine.store {
  Alpine.store('datatable', {
    isLoading: false,
    isReady: false,
    sorted: { col: "", mode: "asc" },
    dataset: [] as Array<Record<string, any>>,
    get sortedState() {
      return encodeURIComponent(JSON.stringify(this.sorted))
    },
    sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async loadData(url: string, delay?: number) {
      if (this.isLoading) {
        if (isDebug) {
          console.log("Already loading data")
        }
        return
      }
      this.isLoading = true;
      if (isDebug) {
        console.log("Loading data")
      }
      if (delay) {
        await this.sleep(delay)
      }
      const opts = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      } as RequestInit;
      const response = await fetch(url, opts);
      if (!response.ok) {
        throw new Error(`Error: ${response}`);
      }
      this.dataset = (await response.json()) as Array<Record<string, any>>;
      this.isLoading = false;
      this.isReady = true;
    },
    _toggleSort(col: string, mode: "asc" | "desc" = "asc") {

    },
    sort(col: string, mode: "asc" | "desc" = "asc") {
      if (mode == "asc") {
        this.dataset.sort(function (a: any, b: any) {
          const nameA = a[col];
          const nameB = b[col];
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        this.dataset.sort(function (a: any, b: any) {
          const nameA = a[col];
          const nameB = b[col];
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
          return 0;
        });
      }
    },
  });
  return Alpine.store("datatable");
}

window.customElements.define('caret-sorter', CaretSorter);

export { create }
