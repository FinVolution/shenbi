<template>
    <div class="first-weal-attr">
        <div class="form-group config-title-outer">
            <SwitchComp :title="'切换老版本:'" :value="switchOldVersion" keyValue="switchOldVersion" @onSwitchValChange="handleChangeProperty"/>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import InputString from '~/basePlus/inputString'
import SwitchComp from '~/basePlus/switchComp'

export default {
    computed: {
        ...mapGetters('editor', ['componentProperty']),

        switchOldVersion: {
            get() {
                return this.componentProperty.switchOldVersion;
            },
            set(val) {
                this.handleChangeProperty('switchOldVersion', val)
            }
        },
    },
    components: {
        InputString,
        SwitchComp
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
</style>
