<template>
<div class="button-container">
    <template v-if="type !== 'dropdown'">
        <el-button
            v-for="option in buttonOptions"
            :key="option.name"
            :type="option.type || 'primary'"
            :icon="option.icon"
            :size="option.size || 'mini'"
            @click="option.onClick"
            :style="option.style"
        >
            {{ option.name }}
        </el-button>
    </template>
    <template v-else>
        <template v-for="(option, index) in buttonOptions">
            <template v-if="!option.dropMenu">
                <el-button
                    :key="option.name"
                    :type="option.type || 'primary'"
                    :icon="option.icon"
                    :size="option.size || 'mini'"
                    @click="option.onClick"
                    :style="option.style"
                >
                    {{ option.name }}
                </el-button>
            </template>
            <template v-else>
                <el-dropdown
                    ref="messageDrop"
                    trigger='click'
                    :key="index"
                    :type="option.type || 'primary'"
                    :size="option.size || 'mini'"
                    :style="option.style"
                    @click="option.onClick"
                    split-button
                >
                    <span>{{ option.name }}</span>
                    <el-dropdown-menu slot="dropdown" class="more-operator">
                        <el-button
                            v-for="option in option.dropMenu"
                            :key="option.name"
                            :type="option.type || 'primary'"
                            :icon="option.icon"
                            :size="option.size || 'mini'"
                            @click="option.onClick"
                            :style="option.style"
                        >
                            {{ option.name }}
                        </el-button>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </template>
    </template>
</div>
</template>

<script>
export default {
    props: {
        buttonOptions: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    data() {
        return {

        }
    },
    methods: {
      hide() {
        this.$refs.messageDrop[0].hide();
      },
    },
}
</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
.button-container {
    .setFlexPos(row, flex-start, center);
}
</style>
<style lang="less">
.more-operator {
    padding: 4px 8px;
    background-color: #eee;
    border: 1px solid #ddd;
}
</style>