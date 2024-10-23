<template>
    <div class="tool-attr-container">
        <template v-if="attrMap[propertyName]">
            <section v-for="(item, index) in attrMap[propertyName].componentList" :key="index">
                <template v-if="item.name === 'inputString'">
                    <component 
                        :is="componentsMap[item.name]" 
                        :title="textTitle" 
                        :value="text_content" 
                        keyValue="html"
                        @input="handleChangeProperty"
                    ></component>
                </template>
                <template v-else>
                    <component :is="componentsMap[item.name]" v-bind="item.attrs"></component>
                </template>
            </section>
        </template>
        <template v-else>
            <div class="no-data">
                <span>暂无配置</span>
            </div>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { componentsMap, attrMap } from './attrsListDefine'
export default {
    data() {
        return {
            componentsMap,
            attrMap,
            text_content: '',
        }
    },
    computed: {
        ...mapState('editor', {
            activeComponent: state => state.activeComponent
        }),
        ...mapGetters('editor', {
            propertyName: 'componentPropertyName'
        }),
        textTitle() {
            return this.propertyName === 'popupText' ? '请输入文字or动态参数{{field}}' : '请输入文字'
        },
    },
    watch: {
        activeComponent: {
            handler: function (n, o) {
                if (n !== null && n !== undefined) {
                    let { propertyName, property, id } = n
                    if (['text', 'popup', 'popupText', 'benefit', 'popupAD'].includes(propertyName)) {
                        Object.assign(this, { text_content: property['html'] || '' })
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() { },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { [key]: newValue }
            });
        },
    },
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';

.tool-attr-container {
    padding: 0 4px 10px 4px;
    background-color: #292a2e;
    position: relative;
    @import '../../../../../assets/less/pc/tools.less';

    .editor {
        background-color: rgb(218 211 191);
        font-weight: normal; // position: relative;
        // height: 400px;
        z-index: 2;
    }

    .wang_editor_textarea {
        width: 100%;
        height: auto;
        min-height: 44px;
        margin-top: 5px;
        color: black;
        background-color: #fff;
    }
}
</style>

<style lang="less">
.editor {
    .ql-tooltip.ql-editing {
        left: 0 !important;
    }
}
</style>
