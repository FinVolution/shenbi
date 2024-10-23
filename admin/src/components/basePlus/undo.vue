<template>
  <div class="undo-container">
    <SvgIcon class-name="prev-step" icon-class="prev-step" @click="goPrevStep" v-if="hasPrev"></SvgIcon>
    <template v-else>
      <SvgIcon class-name="prev-step no-active" icon-class="prev-step"></SvgIcon>
      <SvgIcon class-name="no" icon-class="no"></SvgIcon>
    </template>
    <SvgIcon class-name="next-step" icon-class="next-step" @click="goNextStep" v-if="hasNext"></SvgIcon>
    <template v-else>
      <SvgIcon class-name="next-step no-active" icon-class="next-step"></SvgIcon>
      <SvgIcon class-name="no" icon-class="no"></SvgIcon>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('editor', {
      hasPrev: state => state.undo && state.undo.hasPrev,
      hasNext: state => state.undo && state.undo.hasNext
    })
  },
  methods: {
    ...mapMutations('editor', ['goPrevStep', 'goNextStep'])
  }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.undo-container {
  .setPosition(fixed, 45px, 340px, auto, auto);
  .setFlexPos(column, flex-start, center);
  padding: 5px;
  z-index: 50;
  .next-step,
  .prev-step {
    font-size: 28px;
    color: #fff;
    border: 1px solid #999;
    padding: 5px;
    cursor: pointer;
    &.no-active {
      cursor: not-allowed;
      & + .no {
        position: absolute;
        color: #a5a5a5;
        font-size: 22px;
        cursor: not-allowed;
      }
    }
  }
  .next-step {
    margin: 6px 0 0 0;
  }
  .prev-step.no-active + .no {
    top: 8px;
  }
  .next-step.no-active + .no {
    top: 43px;
  }
}
</style>
