interface KnobStoreParams {
    progress: number;
    color?: string;
    bg?: string;
    colorFunc?: (v: number) => string;
}
declare function create(params?: KnobStoreParams): typeof Alpine.store;
export { create };
//# sourceMappingURL=store.d.ts.map