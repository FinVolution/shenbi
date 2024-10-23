<template>
    <div class="toolbnner">
        <div class="tpl_header_inner_center">
        </div>
        <div class="tpl_header_banner_title_box">
            <h1 class="tpl_header_banner_title">营销设计好帮手</h1>
            <div class="tpl_header_banner_desc">可配置多版本活动，弹窗资源位，一键查看版本信息数据，快速决策。</div>
        </div>
    </div>
</template>
<script>

</script>

<style lang="less" scoped>
@import '../../../../assets/less/base/mixins.less';
@asserts: '../../../assets/images';

.toolbnner {
    .setSize(100vw, 200px);
    padding: 0 20px 0 20px;
    color: white;
    position: relative;
    overflow: hidden;
    
    .tpl_header_inner_center {
        .setBgImg('@{asserts}/palette/bg_tpl.jpg', center, middle, contain, no-repeat);
        .setFlexPos(row, space-between, center);
        height: 200px;
        background-size: cover;
        -webkit-animation: kenburns-bottom 15s ease-out both;
        animation: kenburns-bottom 15s ease-out both;
    }
    .tpl_header_banner_title_box{
        position: absolute;
        top: 60px;

    }
}


@-webkit-keyframes kenburns-bottom {
    0% {
        -webkit-transform: scale(1) translateY(0);
        transform: scale(1) translateY(0);
        -webkit-transform-origin: 50% 84%;
        transform-origin: 50% 84%;
    }

    100% {
        -webkit-transform: scale(1.25) translateY(15px);
        transform: scale(1.25) translateY(15px);
        -webkit-transform-origin: bottom;
        transform-origin: bottom;
    }
}

@keyframes kenburns-bottom {
    0% {
        -webkit-transform: scale(1) translateY(0);
        transform: scale(1) translateY(0);
        -webkit-transform-origin: 50% 84%;
        transform-origin: 50% 84%;
    }

    100% {
        -webkit-transform: scale(1.25) translateY(15px);
        transform: scale(1.25) translateY(15px);
        -webkit-transform-origin: bottom;
        transform-origin: bottom;
    }
}
</style>
