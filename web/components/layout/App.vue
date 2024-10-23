<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { registerPlugins } from '@/utils/register-plugins'
import { registerComponents } from '@/utils/register-components'
import trackEvent from '@/plugins/trackEvent';
import '@/style/index.less'

registerPlugins(Vue)
registerComponents(Vue)
export default {}
</script>
<style lang="less">
#app {
    background: transparent;
    width: 100%;
    height: 100%;
}
</style>
