<template>
    <div v-if="isLoading" class="loading-mask">
          <van-loading  
           :color="color"
           :size="size"
           :type="type"
           />
        <!-- <img src="/images/svgIcon/loading.svg" class="loadingImg"/> -->
        <!-- <svg-icon icon-class="loading" color="rgba(62,168,229,1)" class="loadingImg"></svg-icon> -->
    </div>
    
</template>
<script>
export default {
    name: 'Loading',
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
        size:{
            type: Number,
            default: 36,
        },
        type:{
            type: String,
            default: 'spinner',
        },
        color:{
            type: String,
            default: '#c9c9c9',
        }
    },
};
</script>
<style lang="less" scoped>
.loading-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    background: hsla(0, 0, 0, 0.5);
}

</style>
