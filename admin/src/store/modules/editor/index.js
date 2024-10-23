import actions from './actions'
import { DEFAULT_INIT_STATE } from './const'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: JSON.parse(JSON.stringify(DEFAULT_INIT_STATE)),
  mutations,
  actions,
  getters
}
