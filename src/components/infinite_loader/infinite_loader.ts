function create(isDebug = false): typeof Alpine.store {
  Alpine.store('infiniteLoader', {
    user: "",
    isLoading: false,
    nLoads: 0,
    hxget(url: string, destination: string) {
      htmx.ajax('GET', url, destination);
    },
    sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async loadMore(url: string, dest: string) {
      if (this.isLoading) {
        console.log("Already loading data")
        return
      }
      ++this.nLoads;
      this.isLoading = true;
      if (isDebug) {
        console.log("Load more", this.nLoads)
        await this.sleep(5000)
      }
      await htmx.ajax('GET', url, { target: dest, swap: 'beforeend' });
      this.isLoading = false;
    }
  });
  return Alpine.store("infiniteLoader");
}

export { create }
