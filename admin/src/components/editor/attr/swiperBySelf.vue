<template>
    <div class="o2o-list-container">
        <div class="form-group config-title-outer">
            <span class="config-title">列表项配置</span>
            <span class="tool-input-plus el-icon-plus" @click.stop="addItem"></span>
        </div>
        <div
            v-for="(item, index) of componentProperty.swiperist"
            :key="index"
            class="form-group config-title-outer"
        >
            <div class="form-content inner-container">
                <span>图片：</span>
                <div class="form-group config-title-outer">
                    <ImgUpload :img-url="item.bgImg" @uploadSucc="uploadImgSuccess($event, 'bgImg', index)"></ImgUpload>
                </div>
                <div class="link-input">
                    <span>链接：</span>
                    <input
                        v-model="item.href"
                        type="text"
                        class="tool-input"
                        style="width:200px"
                    />
                </div>
                <div class="link-input">
                    <span>主题：</span>
                    <input
                        v-model="item.theme"
                        type="text"
                        class="tool-input"
                        style="width:200px"
                    />
                </div>
                <span class="tool-input-minus el-icon-minus" @click.stop="deleteItem(item, index)"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ImgUpload from '~/basePlus/imgUpload'

export default {
    components: {
        ImgUpload,
    },
    data() {
        return {
            defaultHeight: 270,
        }
    },
    computed: {
        ...mapGetters('editor', ['componentContainerStyle', 'componentProperty']),
    },
    
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        addItem() {
            this.componentProperty.swiperist.push({
                bgImg: '',
                href: '',
            })
            this.updateStyleAttr()
        },
        uploadImgSuccess(e, item, index) {
            this.componentProperty.swiperist[index][item] = e
        },
        deleteItem(item, index) {
            const { list } = this.componentProperty
            list.splice(index, 1)
            let height = this.componentContainerStyle.height
            if (!item.answer || !item.question) {
                height -= 70
            } else {
                height -= document
                .getElementsByClassName(`question-${index}`)[0]
                .getBoundingClientRect().height
            }

            this.changeComponentAttr({ key: 'containerStyle', newConfig: { height } })
            this.changeComponentAttr({ key: 'selfStyle', newConfig: { height } })
        },
        updateStyleAttr() {
            const height = this.componentContainerStyle.height + 70
            this.changeComponentAttr({ key: 'containerStyle', newConfig: { height } })
            this.changeComponentAttr({ key: 'selfStyle', newConfig: { height } })
        },
    },
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@import '../../../../../assets/less/pc/tools.less';
</style>