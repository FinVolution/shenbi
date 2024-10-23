<template>
    <div class="component-turntable">
        <template v-for="(item, index) in imgList">
            <section :key="index">
                <div class="config-title-outer">
                    <span>图片{{ index + 1 }}:</span>
                </div>
                <div class="form-group component-img">
                    <div class="img-preview">
                        <img :src="item.url" class="el-upload-img" alt="背景图片" v-if="item.url" />
                    </div>
                    <div class="img-desc">
                        <div class="upload-img">
                            <el-upload class="upload-demo" :ref="'upload'" :file-list="fileList" :show-file-list="false"
                                :multiple="false" :headers="uploadCasHeaders" name="file" action=""
                                :http-request="ossUpload">
                                <button slot="trigger" class="normal-button" @click="getCurrentKey(index)">上传图片</button>
                            </el-upload>
                            <button class="normal-button" @click="deleteImage(index)">清空</button>
                        </div>
                        <div class="img-input">
                            <input type="text" v-model="item.name" class="tool-input"
                                @input="onNameInputChange(index, item.name)" />
                        </div>
                        <div class="img-input">
                            <input type="text" v-model="item.type" class="tool-input"
                                @input="onTypeInputChange(index, item.type)" />
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <div class="form-group config-title-outer">
            <span class="config-title">展示机会开关:</span>
            <el-switch v-model="opportunity_switch" active-text="开" inactive-text="关" @change="setOpportunitySwitch">
            </el-switch>
        </div>
         <div class="form-group config-title-outer" v-if="drawingCycle != null">
            <span class="config-title">抽奖周期:</span>
                <input type="text" v-model="drawingCycle" class="tool-input"       
                    @input="onInputChange('drawingCycle', drawingCycle)" /><span>月</span>
        </div>
         <div class="form-group config-title-outer" v-if="noAwardStopPos != null">
            <span class="config-title">未中奖停留位置:</span>
                <input type="text" v-model="noAwardStopPos" class="tool-input"       
                    @input="onInputChange('noAwardStopPos', noAwardStopPos)" />
        </div>

    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'
import { API_APP_ID } from '@/common/const'
import { getCookie } from '@/utils'
import OSSClient from '@/utils/ossUpload'

export default {
    data() {
        return {
            fileList: [],
            uploadCasHeaders: {},
            currentKey: null,
            imgList: [],
            opportunity_switch: false,
            drawingCycle: null,
            noAwardStopPos: null
        }
    },
    computed: {
        ...mapGetters('editor', ['componentProperty']),
        ...mapState('oss', ['content']),
    },
    watch: {
        componentProperty: {
            handler: function (property) {
                Object.assign(this, {
                    defaultHeight: property['switchSubstep'] ? 200 : 270
                })
                Object.assign(this, { imgList: property['list'] || [] })
                Object.assign(this, { opportunity_switch: property['opportunitySwitch'] })
                Object.assign(this, { drawingCycle: property['drawingCycle'] })
                Object.assign(this, { noAwardStopPos: property['noAwardStopPos'] })
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        ...mapActions('oss', ['initOssToken']),
        setOpportunitySwitch(nSwitch) {
            this.changeComponentAttr({
                key: `property`,
                newConfig: { ['opportunitySwitch']: nSwitch }
            })
        },
        getCurrentKey(key) {
            this.currentKey = key
        },
        async ossUpload(file) {
            await this.initOssToken()
            this.client = new OSSClient('xxx/uploadImages', this.content)
            this.client.ossUpload(file).then(
                res => {
                    this.imgList[this.currentKey]['url'] = res.url
                    this.changeComponentAttr({
                        key: `property`,
                        newConfig: { ['list']: this.imgList }
                    })
                },
                error => {
                    this.$message({
                        type: 'error',
                        message: error
                    })
                })
        },

        deleteImage(currentKey) {
            console.log(this.$refs)
            this.$refs.uploadp[currentKey].clearFiles()
            this.imgList[currentKey]['url'] = ''
            this.changeComponentAttr({
                key: `property`,
                newConfig: { ['list']: this.imgList }
            })
        },
        onNameInputChange(currentKey, name) {
            this.imgList[currentKey]['name'] = name
            this.changeComponentAttr({
                key: `property`,
                newConfig: { ['list']: this.imgList }
            })
        },
        onTypeInputChange(currentKey, type) {
            this.imgList[currentKey]['type'] = type
            this.changeComponentAttr({
                key: `property`,
                newConfig: { ['list']: this.imgList }
            })
        },
        onInputChange(key, val) {
            this[key] = val
            this.changeComponentAttr({
                key: `property`,
                newConfig: { [key]: val }
            })
        },

    }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
@import '../../../../../assets/less/pc/tools.less';

.form-group.component-img {
    justify-content: flex-start;

    .img-preview {
        .setSize(100px, 76px);

        img {
            max-height: 76px;
            height: auto;
            max-width: 100px;
        }
    }

    .img-desc {
        .setFlexPos(column, flex-start, flex-start);

        .upload-img {
            .setFlexPos(row, flex-start, flex-start);
        }

        .img-input {
            margin: 5px 3px 0;
        }
    }
}
</style>