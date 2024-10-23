<template>
    <div :class="['title', {'bg': isBg, 'top': isApp}]" ref="title" :style="[titleStyleObj]">
        <div class="left" @click="closeAct">
            <div v-if="isApp" class="back">
                <img v-if="!isBg" src="../../assets/images/common/back-w.png" />
                <img v-else src="../../assets/images/common/back.png" />
            </div>
        </div>
        <div class="center"  :style="[{'color':titleConfig.titleColor}]">{{titleConfig.title}}</div>
        <div class="right">
            <template>
                <!-- <div class="rule" @click="goRule">
                    <img v-if="!isBg" src="../../assets/images/common/rule-w@2x.png" />
                    <img v-else src="../../assets/images/common/rule@2x.png" />
                </div> -->
                <div class="share" @click="goShare" v-if="rightShareShow">
                    <img v-if="!isBg" src="../../assets/images/common/share-w@2x.png" />
                    <img v-else src="../../assets/images/common/share@2x.png" />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import titlemixins from '../../assets/js/titlemixins'
export default {
    props: {
        titleConfig: {
            type: Object,
            default() {
                return {}
            }
        },
        isApp: {
            type: Boolean,
            default: false
        },
        isBg: {
            type: Boolean,
            default: false
        },
        rightShareShow: {
            type: Boolean,
            default: false
        }
    },
    mixins: [titlemixins],
    data() {
        return {
            showShare: false,
            titleStyleObj: null,
            currentTime: new Date().getTime(),
            titleBar: {
                fullScreen: '1', // 1全屏，2非全屏
                visible: '2',
                bgColor: '#eb4825',
                bgAlpha: '1',
                titleView: {
                    text: '',
                    color: '#ffffff'
                }
            }
        }
    },
    computed: {
        ...mapState('homeStore', {
            projectProperties: state => state.projectProperties
        })
    },
    created() {
        this.generateTitleStyle()
        console.log(this.titleStyleObj)
        console.log(this.titleConfig)
    },
    mounted() {
        this.customeTitle(this.titleBar)
        this.$emit('getTitleHeight', this.$refs.title.clientHeight)
    },
    methods: {
        closeAct() {
            this.reportDuration();
            this.$emit('closeWebTab')
        },
        reportDuration() {
            this.$handlePoint("h5_element_imp", {
                page: `super-${this.titleConfig.title}-首页`,
                tgt_event_id: "super_popView",
                tgt_name: `super-首页曝光`,
                num1: (new Date().getTime() - this.currentTime) / 1000,
                param2: `${window.location.href}`,
                param30: `${this.projectProperties.activityID}`,
            });
        },
        generateTitleStyle() {
            let titleStyleObj = {}
            let { titleBgImgUrl, titleBgColor, titleColor } = this.titleConfig
            if (titleBgImgUrl) {
                if (titleBgImgUrl.indexOf('http') > -1) {
                    titleStyleObj = {
                        backgroundImage: `url(${titleBgImgUrl})`,
                        backgroundPosition: `top center`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }
                } else {
                    titleStyleObj = {
                        backgroundImage: titleBgImgUrl
                    }
                }
            } else {
                titleStyleObj = {
                    backgroundColor: titleBgColor
                }
            }
            titleStyleObj['color'] = titleColor
            Object.assign(this, { titleStyleObj })
        },
        goRule() {
            this.$emit('ruleButtonClick')
        },
        goShare() {
            this.$emit('share')
        }

    }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/base/mixins.less';

.title {
    .setFlexPos(row, space-between, center);
    .setPosition(fixed, 0, 0, 0, 0);
    height: 88px;
    z-index: 99;

    .left {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        z-index: 99;
        .f-16-bold();

        .back {
            width: 20px;
            height: 20px;

            img {
                .setSize(100%, 100%);
            }
        }
    }

    .center {
        .f-16-bold();
        position: absolute;
        width: 100%;
        height: 35px;
        text-align: center;
    }

    .right {
        display: flex;
        justify-content: flex-end;
        margin-top: -3px;

        .rule {
            margin-right: 21px;
        }

        .rule,
        .share {
            width: 19px;
            height: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.top {
    padding-top: 44px;
}

.isBrowser {
    margin-top: 0px !important;
}

.bg {
    background: #fff !important;
    background-image: url() !important;

    .left,
    .center {
        color: #3A465A !important;
    }
}
</style>
