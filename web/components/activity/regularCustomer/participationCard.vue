<template>
    <div>
        <!-- 参与状态栏位 配置-->
        <RCParticipationCard
            :itemConfig="itemConfig"
            :loanAmount="loanAmount"
            :targetAmount="targetAmount"
            :award="choiceAward"
            @goToLoan="goToLoan"
            @showConfirm="showConfirm"
            @showExpressDialog="showExpressDialog"
        />
        <!-- 领取礼品 二次确认弹窗 -->
        <ReceiveAwardConfirm :visible.sync="confirmVisible" />
        <!-- 物流弹窗 -->
        <Express :visible.sync="expressVisible" />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import RCParticipationCard from '../../../../common/activity/regularCustomer/participationCard';
import { Express, ReceiveAwardConfirm } from './dialog/index';
import { getCookie } from '@/utils/util';

const loanUrl = '';

export default {
    props: {
        itemConfig: {
            type: Object,
            default() {
                return {
                    property: null,
                };
            },
        },
    },
    components: {
        RCParticipationCard,
        Express,
        ReceiveAwardConfirm,
    },
    data() {
        return {
            confirmVisible: false, // 领取礼品 二次确认弹窗
            expressVisible: false, // 物流
            hitVersion: null, // 命中的版本：0老版本|1新版本
        };
    },
    computed: {
        ...mapState('regularCustomerStore', {
            loanAmount: state => state.homeData.loanAmount,
            targetAmount: state => state.homeData.targetAmount,
            choiceAward: state => state.homeData.choiceAward,
            tag: state => state.homeData.tag,
        }),
        ...mapGetters('regularCustomerStore', ['loanTaskDone', 'receiveResult']),
    },
    created() {
        if (__isBrowser__) {
            const productId = getCookie('productId');
            this.hitVersion = productId === 'golden' ? 0 : productId === 'red' ? 1 : null;
        }
    },
    methods: {
        goToLoan() {},
        showConfirm() {
            this.confirmVisible = true;
        },
        showExpressDialog() {
            this.expressVisible = true;
        },
    },
};
</script>
