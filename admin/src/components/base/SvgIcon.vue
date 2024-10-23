//SvgIcon组件代码

<template>
  <svg :class="svgClass" aria-hidden="true" @click="triggerClick">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      required: true,
      type: String,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
  },
  methods: {
    triggerClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
