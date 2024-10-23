<template>
    <div class="copyright" :style="generateStyleByObj(selfStyle)" v-if="(platform.isIOS || isTemplate)">
        <div class="copyright-text">
            <span class="icon-dot">.</span>
            <span class="main-text">{{ property.mainText }}</span>
            <span class="icon-dot">.</span>
        </div>
        <div class="copyright-text">{{ property.subText }}</div>
    </div>
</template>

<script>
import { generateStyleByObj, judgeDeviceType } from '../../index';

export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    containerStyle: null,
                    property: null,
                    elemStyle: null,
                    selfStyle: null,
                };
            },
        },
        isTemplate: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            platform: {
                isIOS: false,
                isAndroid: false
            },
        }
    },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let { property, elemStyle, selfStyle } = nObj || {};
                Object.assign(this, { property, elemStyle, selfStyle });
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.platform = judgeDeviceType()
    },
    methods: {
        generateStyleByObj,
    },
};
</script>

<style lang="less" scoped>
.copyright-text {
    font-size: 12px;
    font-weight: 600;
    line-height: 17px;
    opacity: 0.52;
}
.icon-dot {
    position: absolute;
    top: -6px;
    width: 8px;
    font-size: 16px;
    font-weight: bold;
}
.main-text {
    position: relative;
    padding: 0 4px 0 12px;
}
</style>
