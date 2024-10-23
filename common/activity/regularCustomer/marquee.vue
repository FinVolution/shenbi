<template>
    <div v-if="list && list.length" class="marquee">
        <vue-seamless-scroll
            :data="list"
            :class-option="classOption"
            class="warp"
        >
            <ul class="ul-item">
                <li
                    v-for="(item, index) in list"
                    :key="index"
                    class="li-item"
                    :style="generateStyleByObj(selfStyle)"
                >
                    {{ item }}
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>

<script>
import { generateStyleByObj } from '../../index';

export default {
    name: 'RCMarquee',
    components: {
        vueSeamlessScroll: __isBrowser__ ? require('vue-seamless-scroll') : '',
    },
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
        list: {
            type: Array,
            default: () => ['恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！'],
        },
    },
    data() {
        return {
            classOption: {
                limitMoveNum: 2,
                direction: 2,
            },
        };
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
    methods: {
        generateStyleByObj,
    },
};
</script>

<style lang="less" scoped>
.marquee {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: not-allowed;
    pointer-events: none;
}
.warp {
    width: 999999px;
    height: 100%;
    overflow: hidden;
}
.ul-item {
    display: flex;
}
.li-item {
    display: flex;
    align-items: center;
}
</style>
