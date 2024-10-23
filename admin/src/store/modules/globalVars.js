
export default {
    namespaced: true,
    state: {
        currentEnvId: '',
    },
    mutations: {
        setObject(state, { key, val }) {
            if (state.hasOwnProperty(key)) {
                state[key] = val;
            }
        },
        setCurrentEnvId(state, payload) {
            state.currentEnvId = payload
        }
    },
    getters: {
        getCurrentEnvId(state){
            return state.currentEnvId
        },
    },
    actions: {
    },
};