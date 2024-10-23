export default {
  // someGetter(state, getters, rootState, rootGetters) {}
  componentPropertyName(state) {
    let { activeComponent } = state
    return (activeComponent && activeComponent['propertyName']) || null
  },
  componentProperty(state) {
    let { activeComponent } = state
    return (activeComponent && activeComponent['property']) || null
  },
  componentStyle(state) {
    let { activeComponent } = state
    return (activeComponent && activeComponent['style']) || null
  },
  componentContainerStyle(state) {
    let { activeComponent } = state
    return (activeComponent && activeComponent['containerStyle']) || null
  },
  rightMenuShow(state) {
    return state.rightClkInfo.show
  }
}
