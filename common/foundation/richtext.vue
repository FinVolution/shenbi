<template>
    <div class="output ql-snow" :style="generateStyleByObj(selfStyle)">
        <div class="ql-editor" v-html="property.html"></div>
    </div>
</template>
<script>
import './css/dark.css'
import './css/quill.core.css'
import './css/quill.snow.css'
import { generateStyleByObj } from "../index";
export default {
    data() {
        return {}
    },
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null,
                    elemStyle: null,
                    selfStyle: null
                }
            }
        },
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property, elemStyle, selfStyle, containerStyleStr } = nObj || {}
                Object.assign(this, { property, elemStyle, selfStyle, containerStyleStr })
            },
            immediate: true,
            deep: true
        },
    },
    methods: {
        generateStyleByObj,
    }
}
</script>
<style lang="less" scoped>
.output {
    width: 100%;
    &.code {
        padding: 1rem;
        height: 16rem;
    }

    &.ql-snow {
        border-top: none;
    }
}
</style>
  