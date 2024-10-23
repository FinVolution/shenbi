<template>
    <section>
        <ImgUpload
            :img-url="image_url"
            :show-gradient="false"
            @uploadSucc="uploadImgSuccess"
            @deleteImg="deleteImage"
        >
        </ImgUpload>
        <HrefTypeLink></HrefTypeLink>
        <SelectComp 
            title="导航栏配置: "
            :options="[
                { val: true, label: '是' },
                { val: false, label: '否' },
            ]"
            :value="setAppMarignTop"
            key-value="setAppMarignTop"
            @onSelectValChange="handleChangeProperty"
        />
        <div class="form-group">
            <span class="config-title">是否通过接口请求链接:</span>
            <SwitchComp
                :title="'是否通过接口请求链接:'"
                :value="isApi"
                key-value="isApi"
                @onSwitchValChange="handleChangeProperty"
            />
        </div>
       
        <div v-if="isApi" class="form-group config-title-outer">
            <InputString
                :title="'接口地址:'"
                key-value="apiPath"
                :value="apiPath"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div v-if="isApi" class="form-group config-title-outer">
            <InputString
                :title="'跳转接口值:'"
                key-value="btnURlKey"
                :value="btnURlKey"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div v-if="isApi" class="form-group config-title-outer">
            <InputString
                :title="'入参:'"
                key-value="params"
                :value="params"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString
                :title="'tgtName:'"
                key-value="tgtName"
                :value="tgtName"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString
                :title="'tgtId:'"
                key-value="tgtId"
                :value="tgtId"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString
                :title="'imptgtName:'"
                key-value="imptgtName"
                :value="imptgtName"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString
                :title="'imptgtId:'"
                key-value="imptgtId"
                :value="imptgtId"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString
                :title="'page:'"
                key-value="page"
                :value="page"
                @input="handleChangeProperty"
            >
            </InputString>
        </div>
    </section>
</template>
  
<script>
import HrefTypeLink from '~/editor/attr/hrefTypeLink'
import ImgUpload from '~/basePlus/imgUpload'
import SelectComp from '~/basePlus/selectComp'
import { mapGetters, mapMutations } from 'vuex'
import InputString from '~/basePlus/inputString'
import SwitchComp from '~/basePlus/switchCompRow'

export default {
    components: { HrefTypeLink, ImgUpload, SelectComp, InputString, SwitchComp },
    data() {
        return {
            image_url: '',
            setAppMarignTop: false,
            isApi: false,
            apiPath: '',
            btnURlKey: '',
            params: '',
            tgtName: '',
            tgtId: '',
            imptgtId: '',
            imptgtName: '',
            page: '',
        }
    },
    watch: {
        componentProperty: {
            handler(property) {
                Object.assign(this, {
                    image_url: property.url || '',
                    apiPath: property.apiPath || '',
                    btnURlKey: property.btnURlKey || '',
                    params: property.params || '',
                    tgtName: property.tgtName || '',
                    tgtId: property.tgtId || '',
                    imptgtId: property.imptgtId || '',
                    imptgtName: property.imptgtName || '',
                    page: property.page || '',
                    isApi: property.isApi || false,
                    setAppMarignTop: property.setAppMarignTop || false,
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
                newConfig: { url: null },
            })
        },
        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { [key]: newValue },
            })
        },
        uploadImgSuccess(url) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { url },
            })
        },
    },
}
</script>
  
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@import '../../../../../assets/less/pc/tools.less';
</style>
