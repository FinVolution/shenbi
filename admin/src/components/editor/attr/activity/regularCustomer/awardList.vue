<template>
    <div class="container">
        <div class="title">礼品配置：</div>
        <ul class="award-list">
            <li v-for="(item, index) in awardList" :key="item.awardKey" class="award-item">
                <div class="award-item-index">奖品{{ index + 1 }}:</div>
                <div class="award-item-row">
                    <span>奖品名称：</span>
                    <input
                        type="text"
                        :value="item.awardName"
                        @input="handleChangeProperty(index, 'awardName', $event)"
                        class="award-item-control"
                    />
                </div>
                <div class="award-item-row">
                    <span>唯一标识：</span>
                    <input
                        type="text"
                        :value="item.awardKey"
                        @input="handleChangeProperty(index, 'awardKey', $event)"
                        class="award-item-control"
                    />
                </div>
                <div class="award-item-row">
                    <span>价格图/缩略图：</span>
                    <el-upload
                        class="award-img-uploader mr4"
                        action=""
                        :headers="uploadCasHeaders"
                        :show-file-list="false"
                        :http-request="file => ossUpload(index, 'bigPic', file)"
                    >
                        <img v-if="item.bigPic" :src="item.bigPic" class="award-img-preview" />
                    </el-upload>
                    <el-upload
                        class="award-img-uploader"
                        action=""
                        :headers="uploadCasHeaders"
                        :show-file-list="false"
                        :http-request="file => ossUpload(index, 'smallPic', file)"
                    >
                        <img v-if="item.smallPic" :src="item.smallPic" class="award-img-preview" />
                    </el-upload>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';
import _ from 'lodash';
import { API_APP_ID } from '@/common/const';
import OSSClient from '@/utils/ossUpload';

export default {
    data() {
        return {
            activeKey: null,
            fileList: [],
            uploadCasHeaders: {}
        };
    },
    computed: {
        ...mapGetters('editor', ['componentProperty']),
        ...mapState('oss', ['content']),

        awardList() {
            return _.cloneDeep(this.componentProperty.awardList);
        }
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        ...mapActions('oss', ['initOssToken']),

        handleChangeProperty(index, filedName, event) {
            const newValue = event.target.value.trim();
            this.awardList[index][filedName] = newValue;
            this.changeComponentAttr({
                key: 'property',
                newConfig: { awardList: this.awardList }
            });
        },

        async ossUpload(index, filedName, file) {
            await this.initOssToken()
            this.client = new OSSClient('xxx/uploadImages', this.content)
            this.client.ossUpload(file).then(
                res => {
                    this.awardList[index][filedName] = res.url;
                    this.changeComponentAttr({
                        key: 'property',
                        newConfig: { awardList: this.awardList }
                    });
                },
                error => {
                    this.$message({
                        type: 'error',
                        message: error
                    });
                }
            );
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    padding: 10px;
}
.title {
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
    color: #fff;
    text-align: left;
}
.award-item {
    margin-bottom: 4px;
    border: 1px dashed #4c4c4c;
}
.award-item-index {
    padding: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #aaa;
}
.award-item-row {
    padding: 4px;
    display: flex;
    align-items: center;
}
.award-item-control {
    flex: 1;
}
.award-img-box {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px dashed #4c4c4c;
    cursor: pointer;
}
.award-img-uploader {
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #4c4c4c;
}
.award-img-preview {
    width: 100px;
    height: 100px;
    object-fit: contain;
}
input {
    color: #c3c3c3;
    background: #343437;
    border: 1px solid #49494c;
    outline: none;
}
.mr4 {
    margin-right: 4px;
}
</style>
