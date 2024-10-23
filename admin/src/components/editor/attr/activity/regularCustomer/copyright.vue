<template>
    <div class="first-weal-attr">
        <div class="form-group config-title-outer">
            <InputString :title="'第一行文案:'"  keyValue="mainText" :value="mainText" @input="handleChangeProperty"></InputString>
        </div>
        <div class="form-group config-title-outer">
            <InputString :title="'第二行文案:'"  keyValue="subText" :value="subText" @input="handleChangeProperty"></InputString>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import InputString from '~/basePlus/inputString'

export default {
    computed: {
        ...mapGetters('editor', ['componentProperty']),

        mainText() {
            return this.componentProperty.mainText;
        },
        subText() {
            return this.componentProperty.subText;
        },
    },
    components: {
        InputString,
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),

        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: { [key]: newValue }
            });
        },
    }
};
</script>

<style lang="less" scoped>
@import '../../../../../../../assets/less/base/mixins.less';
@import '../../../../../../../assets/less/pc/tools.less';

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
