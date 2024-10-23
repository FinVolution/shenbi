<template>
    <section>
        <ImgUpload :imgUrl="image_url" @uploadSucc="uploadImgSuccess" @deleteImg="deleteImage" :showGradient="false">
        </ImgUpload>
        <HrefTypeLink></HrefTypeLink>
        <SelectComp 
          title="导航栏配置: "
          :options="[
            { val: true, label: '是' },
            { val: false, label: '否' },
          ]"
          :value="setAppMarignTop"
          keyValue="setAppMarignTop"
          @onSelectValChange="handleChangeProperty"
        />
        <div class="form-group config-title-outer">
            <InputString :title="'tgtName:'" keyValue="tgtName" :value="tgtName" @input="handleChangeProperty">
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString :title="'tgtId:'" keyValue="tgtId" :value="tgtId" @input="handleChangeProperty">
            </InputString>
        </div>
    </section>
</template>
  
<script>
import HrefTypeLink from '~/editor/attr/hrefTypeLink'
import ImgUpload from '~/basePlus/imgUpload'
import SelectComp from '~/basePlus/selectComp'
import { mapGetters, mapMutations } from 'vuex';
import InputString from '~/basePlus/inputString';

export default {
    data() {
        return {
            image_url: '',
            setAppMarignTop: false,
            tgtName: false,
            tgtId: false,
        }
    },
    components: { HrefTypeLink, ImgUpload, SelectComp, InputString },
    watch: {
        componentProperty: {
            handler: function(property) {
                Object.assign(this, {
                    image_url: property['url'] || '',
                    tgtName: property['tgtName'] || '',
                    tgtId: property['tgtId'] || '',
                    setAppMarignTop: property['setAppMarignTop'] || false,
                })
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        ...mapGetters('editor', ['componentContainerStyle', 'componentProperty']),
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        deleteImage() {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { url: null }
            })
        },
        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { [key]: newValue }
            });
        },
        uploadImgSuccess(url) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { url }
            })
        },
    }
}
</script>
  
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@import '../../../../../assets/less/pc/tools.less';
</style>
  