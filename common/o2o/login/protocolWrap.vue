<template>
    <div class="protocolWrap" :style="styleConfig">
        <input v-show="false" id="agreement" v-model="innerAgree" type="checkbox" />
        <img v-if="!isAgree" class="pic" src="../images/icon_not_choose.png" alt="" @click="clickAgree" />
        <div v-else class="pic" :style="iconStyleConfig" src="../images/icon_choosed.png" alt="" @click="clickAgree" />
        <span>{{ title }}</span>
        <a v-for="(item, index) in propsConfig.protocalText.split('|')" :key="index" class="link"
            :style="linkStyleConfig" href="javascript:;" @click="jumpItem(item, index)">
            {{ item }}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        isAgree: {
            type: Boolean,
        },
        styleConfig: {
            type: Object,
        },
        iconStyleConfig: {
            type: Object,
        },
        linkStyleConfig: {
            type: Object,
        },
        propsConfig: {
            type: Object,
        }
    },
    data() {
        return {
            innerAgree: this.isAgree,
        };
    },
    methods: {
        jumpItem(item, index) {
            this.$emit('jumpItem', { name: item, link: this.propsConfig.protocalLinkUrl.split('|')[index] });
        },
        clickAgree() {
            this.innerAgree = !this.innerAgree;
            this.$emit('changeAgree', this.innerAgree);
        },
    },
};
</script>

<style lang="less" scoped>
.protocolWrap {
    align-content: center;
    line-height: 16px;
    padding: 12px 0 12px 20px;
    font-size: 12px;

    .pic {
        position: relative;
        top: 4px;
        width: 16px;
        display: inline-block;
        height: 16px;
        margin-right: 4px;
        margin-left: -20px;
    }

    span {
        color: #49596c;
    }

    .link {
        color: #3a90c2;
    }
}
</style>
