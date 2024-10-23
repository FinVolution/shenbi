const scrollImp = {
    namespaced: true,
    state: {
        impConfig: {}
    },
    getters: {
    },
    actions: {
        setImpConfig({ state, commit }: any, impConfig) {
            state.impConfig = impConfig
        },
    },
}

export { scrollImp }