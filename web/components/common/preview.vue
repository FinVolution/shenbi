<template>
    <div :class="['editor', { 'appTitle': pageInfo.titleSwitch && isApp }]" :style="pageContainerStyle">
        <CTitle
                v-if="pageInfo.titleSwitch && isApp"
                :isApp="isApp"
                :isBg="isBg"
                :rightShareShow="rightShareShow"
                :titleConfig="pageInfo"
                @getTitleHeight="getTitleHeight"
                @closeWebTab="closeWebTab"
                @showRetainPopup="showRetainPopup"
                @share="goShare"
                />
        <div class="pageBox" :style="pageStyle" :key="pageKey">
            <div v-for="item in componentList" :key="item.id" :id="`id_component_${item.id}`"
                :class="generateContainerClass(item)"
                :style="generateStyleByObj(item.containerStyle)">
                <Child v-for="innerItem in item.children" :obj="innerItem" :key="innerItem.id"></Child>
                <component :is="componentsMap[item.propertyName]" :itemConfig="item"></component>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { generateStyleByObj } from '../../../common/index'
import { isWeixin, WeiXinShare } from '@/utils'
import { getUrlParams, getAllParamsObj } from '@/utils/util'
import { judgeDeviceType } from '@/utils/index'
import { customeTitle } from '@/utils/titlebar'

const generatePageStyle = (pageInfo) => {
    let { bgColor, bgImgUrl } = pageInfo
    let resultPageStyle = {}
    if (bgImgUrl) {
        if (bgImgUrl.indexOf('http') > -1) {
            resultPageStyle = {
                backgroundImage: `url(${bgImgUrl})`,
                backgroundPosition: `top center`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                backgroundSize: '100%',
                backgroundColor: `${bgColor}`,
                'padding-bottom': '0.1px',
                'padding-top': '0.1px'
            }
        } else {
            resultPageStyle = {
                backgroundImage: bgImgUrl,
                backgroundImage: `-webkit-${bgImgUrl}`,
                width: '100%',
                backgroundSize: '100%',
                backgroundColor: `${bgColor}`,
                'padding-bottom': '0.1px',
                'padding-top': '0.1px'
            }
        }
    } else {
        resultPageStyle = {
            backgroundColor: `${bgColor}`,
            width: '100%',
            'padding-bottom': '0.1px',
            'padding-top': '0.1px'
        }
    }
    return resultPageStyle
}
import { componentsMap } from './componentsDefine'
const generatePageContainerStyle = (pageInfo) => {
    let { bgColor, bgImgUrl } = pageInfo
    return {
        backgroundColor: `${bgColor}`,
        width: '100%',
    }
}
import mixin from './mixin'
export default {
    computed: {
        ...mapState('homeStore', {
            pageList: state => state.pageList,
            projectProperties: state => state.projectProperties
        }),
        ...mapState('indexStore', {
            isApp: state => state.isApp,
            isIOS: state => state.isIOS,
            isAppSwitch: state => state.isAppSwitch,
            linkUrl: state => state.linkUrl,
        }),
        rightShareShow() {
            return !!Object.keys(this.shareInfo).length
        }
    },
    data() {
        return {
            componentsMap,
            pageKey: 1,
            componentList: [],
            pageInfo: {},
            pageStyle: '',
            pageContainerStyle: '',
            titleHeight: null,
            isBg: false,
            showShare: false,
            shareInfo: {},
            showWxShare: false,
            paramObj: null,
            platform: {
                isIOS: false,
                isAndroid: false
            },
            scrollTopDistance: 0,
        }
    },
    components: {
        CTitle: () => import('../../../common/foundation/title'),
        Child: () => import('../../../common/foundation/child'),
    },
    watch: {
        '$route': function (n) {
            this.init()
        }
    },
    methods: {
        ...mapMutations('indexStore', { indexSetData: 'setData' }),
        generateStyleByObj,
        closeWebTab() {
            // 根据不同的activityid 进行接口处理
            this.onBackClick()
            // 页面关闭 业务埋点
            this.handleTrack()
        },
        init() {
            let { pageList } = this || {}
            let { pageId = 1} = this.$route.params || {}
            pageId != null && pageId != undefined && pageId != '' && (pageId = parseInt(pageId))
            let homePage = pageList && pageList.find(item => item['pageId'] === pageId)
            if (homePage) {
                let { componentList, pageInfo } = homePage
                let pageStyle = generatePageStyle(pageInfo)

                // 弹窗模式 height 100%
                let isPopupModel = false
                componentList.forEach(item => {
                    if (item.propertyName.indexOf('popup') != -1) {
                        isPopupModel = true;
                    }
                });
                if (isPopupModel) {
                    pageStyle = Object.assign(pageStyle, { height: '100%' })
                }

                Object.assign(this, { componentList, pageInfo, pageStyle })
                let shareInfo = componentList.find(item => {
                    return item.propertyName == 'share'
                }) || {}
                Object.assign(this, { shareInfo })
                pageInfo && this.indexSetData({ pageInfo })
                pageInfo && pageInfo.title && this.indexSetData({ title: pageInfo.title })
                pageInfo && pageInfo.linkUrl && this.indexSetData({ linkUrl: pageInfo.linkUrl })
                pageInfo && pageInfo.isAppSwitch && this.indexSetData({ isAppSwitch: pageInfo.isAppSwitch })
                this.pageContainerStyle = generatePageContainerStyle(pageInfo)
            } else {
                this.$router.push('/error')
            }
        },
        generateContainerClass(item) {
            if (item && item['containerStyle']) {
                let { align, flexDirection } = item['containerStyle']
                if (align || flexDirection) {
                    let alingClassMap = { left: 'align-left', center: 'align-center', right: 'align-right' }
                    let directionClassMap = { row: 'dir-row', column: 'dir-column' }
                    let alignClassName = alingClassMap[align]
                    let directionClassName = directionClassMap[flexDirection]
                    let resultClasaName = `component-item with-flex`
                    resultClasaName = alignClassName ? `${resultClasaName} ${alignClassName}` : resultClasaName
                    resultClasaName = directionClassName ? `${resultClasaName} ${directionClassName}` : resultClasaName
                    return resultClasaName
                } else {
                    return `component-item`
                }
            }
        },
        getTitleHeight(val) {
            this.titleHeight = val
        },
        pageScrollTop() {
            if (document.scrollingElement) {
                return document.scrollingElement.scrollTop
            }

            return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        },
        onScrollPageBox() {
            window.addEventListener('scroll', e => {
                const scrollTop = this.pageScrollTop()
                if (this.scrollTopDistance < scrollTop) {
                    this.scrollTopDistance = scrollTop
                }
                if (scrollTop > this.titleHeight && this.isApp) {
                    this.isBg = true
                } else {
                    this.isBg = false
                }
            })
        },

        goShare() {
            this.showShare = true
        },
        titleBarGoShare() {
            if (this.shareInfo?.property?.useCustom) {
                this.showSharePopup()
            } else {
                this.goShare()
            }

        },
        wxShare() {
            const shareParam = {
                linkUrl: this.shareInfo?.property?.linkUrl || window.location.href,
                title: this.shareInfo?.property?.title,
                desc: this.shareInfo?.property?.desc,
                imgUrl: this.shareInfo?.property?.url
            }

            WeiXinShare(shareParam)
        },
        goBack() {
            this.closeWebTab()
        },
    },
    created() {
        this.init()
        if (__isBrowser__) {
            // 拿到链接参数所有对象数组
            let urlObj = getUrlParams();
            // 遍历数组 解析去除所有动参对象
            this.paramObj = getAllParamsObj(urlObj);
        }
    },
    mounted() {
        let { pageInfo } = this
        pageInfo && pageInfo.title && (document.title = pageInfo.title)

        if (!pageInfo.isAppSwitch && isWeixin()) {
            this.wxShare()
        }

        if (!this.pageInfo.titleSwitch) {
            customeTitle({
                fullScreen: '2', // 1全屏，2非全屏
                visible: '1',
                titleView: {
                    text: `${pageInfo.title}`,
                    color: '#000000',
                },
            })
        }

        this.onScrollPageBox()
        this.platform = judgeDeviceType()
    },
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
