<template>
<CButton :itemConfig="itemConfig" @onBtnClick="onBtnClick" />
</template>

<script>
import CButton from '../../../common/foundation/button';
import { redirectTo } from '@/utils/redirect';
import { mapState } from 'vuex'

export default {
    data() {
        return {}
    },
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
    components: { CButton },
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
    methods: {
        onBtnClick() {
            const { linkUrl } = this.property || {};
            if (linkUrl) {
                redirectTo(linkUrl)
            }
            try {
                this.$handlePoint("h5_clk", {
                    page: `super-${this.pageTitle}-首页`,
                    tgt_event_id: "super_pageClk",
                    tgt_name: `super-页面点击`,
                    param1: `${linkUrl}`,
                    param2: `${window.location.href}`,
                });
            } catch (error) {
            }
        }
    }
}
</script>