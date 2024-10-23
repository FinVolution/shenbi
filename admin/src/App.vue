<template>
  <div id="app"><router-view :key="$router.currentRoute.fullPath" /></div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
  created() {
    // this.initOssToken()
  },
  methods: {
    ...mapActions('oss', ['initOssToken'])
  },
}
</script>
<style lang="less">
@import '../../assets/less/base/mixins.less';
#app {
  .setSize(100%, 100%);
}

</style>
