<template>
    <SwiperBySelf :itemConfig="itemConfig" @onCardItemClick="onCardItemClick" />
</template>

<script>
import { mapState } from 'vuex'
import SwiperBySelf from '../../../common/foundation/swiperBySelf'
import { generateStyleByObj } from '../../../common/index'
import { getCookie } from '@/utils/util'
export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null,
                    elemStyle: null
                }
            }
        },
    },
    computed: {
        ...mapState('indexStore', {
            isApp: state => state.isApp,
            isIOS: state => state.isIOS,
            linkUrl: state => state.linkUrl,
            pageTitle: state => state.title,
        }),
        ...mapState('homeStore', {
            projectProperties: state => state.projectProperties
        })
    },
    components: { SwiperBySelf },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let {property, elemStyle} = nObj || {}
                Object.assign(this, {property, elemStyle})
            },
            immediate: true,
            deep: true
        },
    },
    mounted() {
        const io = new IntersectionObserver((entries) => {
        //entries 为 IntersectionObserverEntry对像数组
            entries.forEach((item) => {
            //item 为 IntersectionObserverEntry对像
            // isIntersecting是一个Boolean值，判断目标元素当前是否可见
                if (item.isIntersecting) {
                    io.unobserve(item.target); //停止监听该div DOM节点
                    let {property, elemStyle} = this.itemConfig || {}
                    for (const item of property.swiperist) {
                        this.$handlePoint("h5_element_imp", {
                        page: `super-2023周年庆活动首页`,
                            tgt_event_id: "super_pinpaistory",
                            tgt_name: `super-品牌故事-${item.theme}`,
                        });
                    }
                }
            });
        }); 
        io.observe(document.querySelector("#swiperBySelf"))

    },
    methods: {
        generateStyleByObj,
        onCardItemClick(item) {},
    }
}
</script>
