<template>
    <div class="guaguale-container">
        <Play
            v-if="homeData"
            :showAnimHand="showAnimHand"
            :itemConfig="itemConfig"
            :award="homeData.opportunityList"
            :startGame="startGame" 
            :currentOpen="currentOpen"
            :handNum="handNum"
            :taskAmountScene="taskAmountScene"
            @showFloatingEmit="showFloatingEmit"
            ref="gamePlay" 
            @trace="trace"
            @lockEgg="lockEgg"
        >
            <AwardShow :itemConfig="itemConfig"/>
        </Play>
        <!-- 解锁银弹窗 -->
        <Empty :show.sync="unlockSilverDialog" :src="itemConfig.elemStyle.unlock_silver.bgImgUrl" :isCountdown="true" :lockDialog="0" text="去做任务" :countdown="5" @trace="trace"/>
        <!-- 解锁金弹窗 -->
        <Empty :show.sync="unlockGoldDialog" :src="itemConfig.elemStyle.unlock_gold.bgImgUrl" :isCountdown="true" :lockDialog="1" text="去做任务" :countdown="5" @trace="trace"/>
        <!-- 解锁金&银弹窗 -->
        <Empty :show.sync="unlockSilverGoldDialog" :src="itemConfig.elemStyle.continue_lock.bgImgUrl" :isCountdown="true" :lockDialog="2" :goldTaskAmount="goldTaskAmount" text="去做任务" :countdown="5" @trace="trace"/>
        <AwardDialog :show.sync="dialogAward" :award="award" @closeDialogClick="closeDialogClick" @trace="trace" @nextEggClick="nextEggClick"/>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Play from '../../../../common/activity/golden_egg/play';
import AwardShow from './award.vue';
import _ from 'lodash';
import Empty from './dialog/empty.vue'
import { homeDataPre, queryCouponV2, draw } from '@/service/golden_egg';
import AwardDialog from '@/components/activity/golden_egg/dialog/awardDialog'
import { getQueryString } from '@/utils/query'
import { debounce } from '@/utils/util';
import { set } from 'vue/types/umd';
export default {
    name: 'guagualeplaydddd',
    data() {
        return {
            dialogAward: false,
            award: null,
            unlockSilverDialog: false,
            unlockGoldDialog: false,
            unlockSilverGoldDialog: false,
            isFirstShowPopup: false,
        }
    },
    components: {
        Play,
        AwardShow,
        AwardDialog,
        Empty
    },
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null
                }
            }
        },
    },
    watch: {
        itemConfig: {
            handler: function(nObj) {
                let { property, elemStyle, selfStyle } = nObj || {};
                Object.assign(this, { property, elemStyle, selfStyle });
            },
            immediate: true,
            deep: true,
        },
    },
    
    computed: {
        ...mapState('goldenEggStore/home', [
            'homeData',
            'couponList',
            'chance',
            'currentOpen',
            'popupOrNot',
            'popupType',
            'opportunityList',
            'marqueeShow',
            'goldTaskAmount',
            'actResult',
            'taskAmountScene',
            'acquireEggType',
            'showAnimHand',
            'subscribeScene',
            'handNum',
            'couponShowInfo'
        ]),
    },
    mounted() {
        this.freshHomeData();
    },

    methods: {
        ...mapMutations('goldenEggStore/home', [
            'setQueryCoupon',
            'setHomeData',
        ]),
        showFloatingEmit(val) {
        },
        async freshHomeData() {
            const homeData = await homeDataPre()
            this.setHomeData(homeData);
            if (homeData.Result === 200) {
                Promise.all([
                    queryCouponV2(),
                ]).then(([ queryCouponV2 ]) => {
                    this.setQueryCoupon(queryCouponV2);
                });
            }
        },
        trace (obj) {
            console.log('trace')
        },
        async startGame (type) {
            return new Promise(async(resolve, reject) => {
                const result = await draw(type)
                if (result.Result === 200) {
                    this.award = {
                        ...result.Content,
                        type
                    }
                    setTimeout(() => {
                        this.dialogAward = true
                        this.$refs.gamePlay.stopAnimation()
                        resolve(true)
                        // this.playing = false
                    }, 1100);
                } else {
                    this.$toast(result.ResultMessage)
                    resolve(true)
                }
                this.freshHomeData()
            })
        },
        lockEgg(type) {
            if(type === 2) {
                this.unlockSilverDialog = true
            }else if(type === 3) {
                this.unlockGoldDialog = true
            }
        },
        nextEggClick(type) {
            const silverEgg = this.opportunityList.find(item => item.lotteryType === 2)
            const goldEgg = this.opportunityList.find(item => item.lotteryType === 3)
            const copperEgg = this.opportunityList.find(item => item.lotteryType === 1)

            switch(type) {
                case 1:
                    if (this.acquireEggType === 1) {
                        if (this.isFirstShowPopup) {
                            this.isFirstShowPopup = false
                            this.unlockSilverGoldDialog = true
                        } else {
                            this.unlockSilverDialog = true
                        }
                    }
                    if(copperEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(1)
                        return
                    }
                    if(silverEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(2)
                        return
                    }    
                    if(goldEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(3)
                        return
                    }
                    
                    if (this.acquireEggType === 2) {
                        this.unlockGoldDialog = true
                        return;
                    } 
                    break;
                case 2:
                    if(copperEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(1)
                        return
                    }
                    if(silverEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(2)
                        return
                    } 
                    if(goldEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(3)
                        return
                    }                        
                    if (this.acquireEggType === 2) {
                            this.unlockGoldDialog = true
                            return;
                    } 
                    break;
                case 3: 
                    if(copperEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(1)
                        return
                    }
                    if(silverEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(2)
                        return
                    }
                    if(goldEgg.availableOpportunity > 0) {
                        this.$refs.gamePlay.outerTapEgg(3)
                        return
                    }                         
                    break;
            }
        }

    }
}
</script>

<style lang="less" scoped>
@import "../../../../assets//less/base/mixins.less";

.guaguale-container {
    .setSize(100%, 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
