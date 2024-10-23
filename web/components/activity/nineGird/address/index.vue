<template>
  <div class="sharecomponents">
    <div v-show="show" class="model" @click="close"></div>
    <div class="content" :class="{ 'share-close': show }">
      <AddComponents v-model="currentAddres" @result="getAddress" />
    </div>
  </div>
</template>
<script>
import AddComponents from "./choose";
export default {
  name: "addresspopup",
  components: {
    AddComponents,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentAddres: "",
    };
  },
  methods: {
    getAddress(value) {
      this.$emit("addressChange", value);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.sharecomponents {
  .model {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
  }

  .content {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    bottom: -100%;
    height: 60%;
    transition: all 0.5s;
    background: #fff;
    z-index: 600;
    padding: 16px 12px;
  }
  .share-close {
    bottom: 0;
  }
}
</style>
