<template>
  <div class="popup-container" v-if="activeComponent">
    <!-- <PopupText
      v-if="activeComponent.propertyName == 'popupText'"
    /> -->
    <SmsCode v-if="activeComponent.propertyName == 'o2oLogin' && activeComponent.property.switchSubstep" :itemConfig="activeComponent"></SmsCode>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PopupText from "$root/common/foundation/popup/popupText"
import SmsCode from '$root/common/o2o/acsdk/smsCode'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('editor', {
      activeComponent: (state) => state.activeComponent
    }),
  },
  components: {
    PopupText,
    SmsCode
  },
  methods: {},
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.popup-container {
  background-color: transparent;
  .setPosition(absolute, 10px, 6px, auto, auto);
  .setFlexPos(row, right, flex-start);
  .setSize(340px, auto);
}
</style>
>
