import { isEmpty } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor/index'
import tenant from './modules/tenantId/index'
import globalVars from './modules/globalVars'
import oss from './modules/oss/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {
    setObject(state, { key, val, module }) {
      if (!isEmpty(module)) {
        if (state[module] && state[module].hasOwnProperty(key)) {
          state[module][key] = val
        }
      } else if (state.hasOwnProperty(key)) {
        state[key] = val
      }
    }
  },
  modules: {
    editor,
    tenant,
    globalVars,
    oss
  }
})

export default store
