
import api from '@/service'
export default {
    namespaced: true,
    state: {
        menus: [],
        currentTenantId:'xx',
        currentTenantName:''
    },
    mutations: {
        setMenus(state, payload) {
            state.menus = payload;
        },
        setCurrentTenantId(state, payload) {
            const firstItem = payload.id.split('_');
            state.currentTenantId = firstItem[firstItem.length - 1].toLowerCase()
            state.currentTenantName = payload.name
        },
        setCurrentTenantIdById(state, payload) {
            state.currentTenantId = payload
        }
    },
    getters: {
        tenantId(state){
            return state.currentTenantId
        }
    },
    actions: {
        async initMenusList({ commit }) {
            const { Result, Content } = await api.menus()
            if (Result === 200) {
                commit('setMenus', Content);
                if(Content && Content.length > 0) {
                    commit('setCurrentTenantId', Content[0]);
                }
            }
        }
    },
};
