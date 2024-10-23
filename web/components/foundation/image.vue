<template>
    <CImage :itemConfig="itemConfig" :isApp="isApp" @onImageClick="onImageClick" />
</template>

<script>
import { mapState } from 'vuex'
import CImage from '../../../common/foundation/image'
import { generateStyleByObj } from '../../../common/index'
import { getCookie } from '@/utils/util'
import { getQueryString } from '@/utils/query'
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
        }),
      ...mapState('commonStore/scrollImp', ['impConfig']),
    },
    components: { CImage },
    watch: {
        itemConfig: {
            handler: function (nObj) {
                let {property, elemStyle} = nObj || {}
                Object.assign(this, {property, elemStyle})
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        if (parseFloat(this.projectProperties.activityID) == 1107) {
            this.$handlePoint("h5_element_imp", {
                page: `super-2023国庆活动首页`,
                tgt_event_id: "super_pinpaistory",
                tgt_name: `super-品牌专区`,
                param30: `yy-1107-${getQueryString('source')}-hd`
            });
        }
    },
    methods: {
        generateStyleByObj,
        onImageClick() {},
    }
}
</script>
