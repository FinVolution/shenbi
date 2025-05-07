import { BaseResponse } from '@/types/base';

interface homeState {
  homeData: Object,
  couponList: Array<any>,
  marqueeShow: Array<string>,
  actResult: number,
  goldTaskAmount: number,
  currentOpen: false,
  popupOrNot: false,
  popupType: number,
  acquireEggType: number,
  handNum: number,
  opportunityList: Array<any>,
  showWarmupDialog: boolean,
  taskAmountScene: string,
  showAnimHand: number, // 0.去使用 1.去借款 2.立即抽奖 3.赚机会
  subscribeScene: String,
  couponShowInfo: Object,
  lastExecutionTime: number,
}

const home = {
  namespaced: true,
  state: {
    homeData: {
      "couponShowInfo": null,
      "currentOpen": true,
      "goldTaskAmount": 800000,
      "opportunityList": [
          {
              "availableOpportunity": 100,
              "desc": "成长权益用户可享",
              "lotteryType": 1,
              "totalOpportunity": 100
          },
          {
              "availableOpportunity": 100,
              "desc": "发起借款用户可享",
              "lotteryType": 2,
              "totalOpportunity": 100
          },
          {
              "availableOpportunity": 100,
              "desc": "周末借满8000元",
              "lotteryType": 3,
              "totalOpportunity": 100
          }
      ],
      "popupOrNot": false,
      "popupType": 2,
      "subActivityType": 20250502,
      "subscribeScene": "stay",
      "taskAmountScene": "showAmount",
      "taskDifficultyScene": "easy"
  },
    couponList: [],
    marqueeShow: [],
    chance: 0,
    goldTaskAmount: 0,
    currentOpen: -1,
    popupOrNot: -1,
    popupType: -1,
    actResult: 200,
    acquireEggType: -1,
    handNum: -1,
    taskAmountScene: '',
    opportunityList: [],
    showWarmupDialog: false,
    showAnimHand: 0, // 0.去使用 1.去借款 2.立即抽奖 3.赚机会
    subscribeScene: '',
    couponShowInfo: null,
    lastExecutionTime: 0 
  },
  getters: {

  },
  mutations: {
    setHomeData(state: homeState, payload: BaseResponse<any>) {
      const currentTime = Date.now();

      if (currentTime - state.lastExecutionTime < 500) {
        return;
      }
      state.lastExecutionTime = currentTime;

      const { Result, Content } = payload;
      if (Result === 200) {
        state.homeData = Content;
        state.currentOpen = Content.currentOpen
        state.popupOrNot = Content.popupOrNot
        state.popupType = Content.popupType
        state.goldTaskAmount = Content.goldTaskAmount
        state.taskAmountScene = Content.taskAmountScene
        state.subscribeScene = Content.subscribeScene
        state.opportunityList = Content.opportunityList
        state.couponShowInfo = Content.couponShowInfo
        if (state.opportunityList && state.opportunityList.length > 0) {
          state.opportunityList.forEach(item => {
            if (item.lotteryType === 3 && item.totalOpportunity > 0) {
              state.acquireEggType = 3
              return
            }
            if (item.lotteryType === 2 && item.totalOpportunity > 0) {
              state.acquireEggType = 2
              return
            }
            if (item.lotteryType === 1 && item.totalOpportunity > 0) {
              state.acquireEggType = 1
              return
            }
          })
        }

        if (state.opportunityList && state.opportunityList.length > 0) {
          for (let item of state.opportunityList) {
            if (item.lotteryType === 1 && !(item.totalOpportunity > 0 && item.availableOpportunity === 0)) {
              state.handNum = 1
              return
            }
            if (item.lotteryType === 2 && !(item.totalOpportunity > 0 && item.availableOpportunity === 0)) {
              state.handNum = 2
              return
            }
            if (item.lotteryType === 3 && !(item.totalOpportunity > 0 && item.availableOpportunity === 0)) {
              state.handNum = 3
              return
            }
            state.handNum = -1
          }
        }

      }
      state.actResult = Result
    },

    setMarqueeShow(state: homeState, payload: BaseResponse<string[]>) {
      const { Result, Content } = payload;
      if (Result === 200) {
        state.marqueeShow = Content;
      }
    },
    setWarmupDialogShow(state: homeState, payload: any) {
      state.showWarmupDialog = payload
    },
    setAnimHand(state: homeState, payload: any) {
      state.showAnimHand = payload
      console.log('setAnimHand', payload)
    },
    setQueryCoupon(state: homeState, payload: BaseResponse<any>) {
      const { Result, Content } = payload;
      if (Result === 200) {
        if (Content) {
          state.couponList = Content;
          // if (state.showAnimHand !== 2) {
          //   if (state.couponList.length > 0 && ![1,2,3].includes(state.showAnimHand)) {
          //     state.showAnimHand = 0
          //   } else {
          //     state.showAnimHand = 1
          //   }
          // }
        }
      }
      state.actResult = Result
    },
  },
};

export { home };
