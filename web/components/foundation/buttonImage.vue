<template>
    <CImage id="buttonImageId" :itemConfig="itemConfig" :isApp="isApp" @onImageClick="onImageClick" />
</template>

<script>
import { mapState } from 'vuex'
import CImage from '../../../common/foundation/buttonImage'
import { generateStyleByObj } from '../../../common/index'
import { getCookie } from '@/utils/util'
import { getQueryString } from '@/utils/query'
import { post } from '../../utils/request'

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
    data () {
        return {
            url: ''
        }
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
    components: { CImage },
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
    async mounted() {
        const { isApi, apiPath, btnURlKey, params } = this.property
        if (isApi) {
            try {
                const res = await post(apiPath, {...JSON.parse(params), entryType: this.isApp ? 1: 2}, true);
                this.$handlePoint("h5_element_imp", {
                    page: `super-${this.pageTitle}-首页`,
                    tgt_event_id: "super_page",
                    tgt_name: `super-页面-api`,
                    param1: `${res.resultMessage}`,
                    param2: `${window.location.href}`,
                    param30: `${this.projectProperties.activityID}`,
                });
                eval(btnURlKey)
                this.url = window.url
                console.log('this.url', this.url)
            } catch (error) {
                console.log('error', error.message)
            }
        }
        this.elementImp()
    },
    methods: {
        generateStyleByObj,
        elementImp() {
            const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (parseFloat(this.projectProperties.activityID) == 1116) {
                    this.$handlePoint("h5_element_imp", {
                        page: this.property.page || '',
                        tgt_event_id: this.property.imptgtId || '',
                        tgt_name: this.property.imptgtName || '',
                    });
                }
            } 
            }, { threshold: .2 });
            const p = document.getElementById("buttonImageId")
            observer.observe(p)

        },
        onImageClick() {},
    }
}
</script>
