<template>
  <ul class="tool-radio-check" v-if="options && options.length > 0">
    <li :class="{ 'radio-item': true, active: item.checked }" v-for="(item, index) in optinonArr" :key="index" @click="onOptionClick(item)">
      <span>{{ item.label }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      currentVal: 0,
      optinonArr: []
    }
  },
  props: {
    value: [String, Number, Array],
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['single', 'multiple'].indexOf(value) > -1
      },
      default: 'single'
    }
  },
  watch: {
    value: {
      handler: function(n, o) {
        Object.assign(this, { currentVal: n })
      },
      immediate: true
    },
    options: {
      handler: function(n, o) {
        let { options, value } = this
        let optinonArr = options.map(item => {
          return {
            id: item['id'],
            label: item['label'],
            checked: value === item['id']
          }
        })
        Object.assign(this, { optinonArr })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onOptionClick(item) {
      let { type, optinonArr } = this
      switch (type) {
        case 'single':
          optinonArr.forEach(innerItem => {
            if (innerItem.id != item.id) {
              innerItem['checked'] = false
            } else {
              innerItem['checked'] = !innerItem['checked']
            }
          })
          this.$emit('input', item['checked'] ? item['id'] : '')
          break
        case 'multiple':
          item['checked'] = !item['checked']
          let resultArr = []
          optinonArr.forEach(innerItem => {
            innerItem['checked'] && resultArr.push(innerItem['id'])
          })
          this.$emit('input', resultArr)
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.tool-radio-check {
  .setFlexPos(row, flex-start, center);
  .radio-item {
    &.active {
      color: rgb(64, 158, 255);
      border-color: rgb(64, 158, 255);
    }
    cursor: pointer;
    border: 1px solid #fff;
    margin: 0 2px;
    padding: 4px 8px;
    color: #fff;
    border-radius: 3px;
  }
}
</style>
