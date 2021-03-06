import { __awaiter, __generator } from "tslib";
function create(isDebug) {
    if (isDebug === void 0) { isDebug = false; }
    Alpine.store('infiniteLoader', {
        isLoading: false,
        nLoads: 0,
        hxget: function (url, destination) {
            htmx.ajax('GET', url, destination);
        },
        sleep: function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        },
        loadMore: function (url, dest, delay) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isLoading) {
                                if (isDebug) {
                                    console.log("Already loading data");
                                }
                                return [2 /*return*/];
                            }
                            ++this.nLoads;
                            this.isLoading = true;
                            if (isDebug) {
                                console.log("Load more", this.nLoads);
                            }
                            if (!delay) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sleep(delay)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, htmx.ajax('GET', url, { target: dest, swap: 'beforeend' })];
                        case 3:
                            _a.sent();
                            this.isLoading = false;
                            return [2 /*return*/];
                    }
                });
            });
        }
    });
    return Alpine.store("infiniteLoader");
}
export { create };
