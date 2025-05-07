<template>
    <div class="component-turntable">
        <div class="form-group config-title-outer">
            <InputString :title="'跳转文案:'" keyValue="linkName" :value="linkName" @input="handleChangeProperty">
            </InputString>
        </div>
        
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import InputString from '~/basePlus/inputString'
import ImgUpload from '~/basePlus/imgUpload'
import SwitchComp from '~/basePlus/switchComp'

export default {
    data() {
        return {
            linkName: '',
            couponTips: '',
            couponType: '',
            flyAgainText: '',
        }
    },
    watch: {
        componentProperty: {
            handler: function (property) {
                Object.assign(this, {
                    linkName: property['linkName'] || '',
                    congratulationTips: property['congratulationTips'] || '',
                    couponTips: property['couponTips'] || '',
                    couponType: property['couponType'] || '',
                    flyAgainText: property['flyAgainText'] || '',
                })
            },
            deep: true,
            immediate: true,
        },
    },
    components: {
        InputString,
        ImgUpload,
        SwitchComp
    },
    computed: {
        ...mapGetters('editor', ['componentProperty'])
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        updatePropertyAttr(attrKey, dataKey) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: {
                    [attrKey]: this[dataKey]
                }
            })
        },
        // 原始参数处理
        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: {
                    [key]: newValue
                }
            });
        },

        // 添加额外参数处理
        handleChangeProperty4Parent(e, item, index) {
            this.componentProperty.lanternList[index][e[0]] = e[1]
        },
        uploadImgSuccess(e, item, index) {
            this.componentProperty.lanternList[index][item] = e
        },
        addItem() {
            this.componentProperty.lanternList.push({
                "tabActive": "https://maumkt.ppdaicdn.com/acp/uploadImages/GGFIJR202212260506593%E5%AD%97%E9%80%89%E4%B8%AD%402x.png",
                "lanternText": "年富亿年日富一日年富亿年日富一日年富亿年日富一日",
                "customWord": "请输入自定义祝福",
                "tab": "https://maumkt.ppdaicdn.com/22annual_summary/tab_pinan.png",
                "isLast": true,
                "type": "zidingyi",
                "tabFiled": "自定义",
                "lanternWish": "https://maumkt.ppdaicdn.com/22annual_summary/wish_pinan.png",
                "tassel": "https://maumkt.ppdaicdn.com/acp/uploadImages/BTISGF20221227104056%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8B%402x.png",
                "lantern": "https://maumkt.ppdaicdn.com/acp/uploadImages/CVFBIZ20221226050751%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8A%402x.png",
                "lanternBg": "https://maumkt.ppdaicdn.com/acp/uploadImages/LELEWU20221229111322%E8%87%AA%E5%AE%9A%E4%B9%89%402x.png"
            });
        },
        deleteItem(item, index) {
            const { lanternList } = this.componentProperty;
            lanternList.splice(index, 1);
        },

    }
}
</script>

<style lang="less" scoped>
@import '../../../../../../../assets/less/base/mixins.less';
@import '../../../../../../../assets/less/pc/tools.less';
.config-list {
    .setFlexPos(row, space-between, center);
    flex-flow: row wrap;
    border: 1px dashed #4c4c4c;
}
</style>
