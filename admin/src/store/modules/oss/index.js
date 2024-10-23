
import api from '@/service'
export default {
    namespaced: true,
    state: {
        content: null,
    },
    mutations: {
        setContent(state, payload) {
            state.content = payload
        },
       
    },
    getters: {
        content(state){
            return state.content
        }
    },
    actions: {
        async initOssToken({ commit }) {
            const { Result, Content } = await api.getStsToken({source: 4})
            if (Result === 200) {
                commit('setContent', Content);
            }
        }
    },
};
