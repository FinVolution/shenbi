interface IAward {
    status: number;
    picUrl: string;
    smallPic: string;
    bigPic: string;
    awardKey: string;
    awardName: string;
    awardType: string;
    batchNo: string;
    recordId: number;
    addressId: number;
    expressNo: string;
    expressName: string;
}
interface IHomeData {
    loanAmount: number;
    targetAmount: number;
    choiceAward: IAward | null;
    awardList: IAward[];
    tag: string;
}
interface IState {
    activityStatus: number;
    activityStatusMsg: string;
    homeData: IHomeData;
    marqueeList: string[];
}
interface IActivityState {
    result: number;
    activityStatusMsg: string;
}

export const regularCustomerStore = {
    namespaced: true,
    state: {
        activityStatus: 200, 
        activityStatusMsg: '', // 用于未处理的错误接口msg
        homeData: {
            loanAmount: -1,
            targetAmount: -1,
            choiceAward: null,
            awardList: [],
            tag: '',
        },
        marqueeList: ['恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！'],
    },
    mutations: {
        setActivityStatus(state: IState, payload: IActivityState) {
            state.activityStatus = payload.result;
            state.activityStatusMsg = payload.activityStatusMsg;
        },
        setHomeData(state: IState, payload: IHomeData) {
            state.homeData = payload;
        },
        setMarqueeList(state: IState, payload: string[]) {
            state.marqueeList = payload;
        },
        setChoiceAward(state: IState, payload: IAward) {
            state.homeData.choiceAward = payload;
        },
        setAwardList(state: IState, payload: IAward[]) {
            state.homeData.awardList = payload;
        },
    },
    actions: {
        async getHomeData({ dispatch, commit, getters }: any) {
            // const params = {
            //     activityType: getters.activityType,
            // };
            // const { Result, Content, ResultMessage } = await queryHomeData(params);
            const data = {
                "CodeMsg": null,
                "Content": {
                    "awardList": [{
                        "addressId": null,
                        "awardKey": "sanjiantao_1069",
                        "awardName": "南极人三件套",
                        "awardType": 5,
                        "batchNo": "OB00000756",
                        "bigPic": "https://maumkt.ppdai.com/acp/uploadImages/nanjiren2.png",
                        "expressName": null,
                        "expressNo": null,
                        "picUrl": "",
                        "recordId": null,
                        "status": 1
                    }, {
                        "addressId": null,
                        "awardKey": "jianguolibao_1069",
                        "awardName": "百草味坚果礼盒",
                        "awardType": 5,
                        "batchNo": "OB00000756",
                        "bigPic": "https://maumkt.ppdai.com/acp/uploadImages/baicaowei-nut2.png",
                        "expressName": null,
                        "expressNo": null,
                        "picUrl": "",
                        "recordId": null,
                        "status": 1
                    }, {
                        "addressId": null,
                        "awardKey": "xiaomibaowenbei_1069",
                        "awardName": "小米保温杯",
                        "awardType": 5,
                        "batchNo": "OB00000756",
                        "bigPic": "https://maumkt.ppdai.com/acp/uploadImages/mi-thermos2.png",
                        "expressName": null,
                        "expressNo": null,
                        "picUrl": "",
                        "recordId": null,
                        "status": 1
                    }, {
                        "addressId": null,
                        "awardKey": "zuyupen_1069",
                        "awardName": "康佳家用足浴盆",
                        "awardType": 5,
                        "batchNo": "OB00000756",
                        "bigPic": "https://maumkt.ppdai.com/acp/uploadImages/konka-footbath2.png",
                        "expressName": null,
                        "expressNo": null,
                        "picUrl": "",
                        "recordId": null,
                        "status": 1
                    }],
                    "choiceAward": null,
                    "loanAmount": 1000000,
                    "tag": "1",
                    "targetAmount": 2000000
                },
                "Result": 200,
                "ResultMessage": null
            }
            const { Result, Content, ResultMessage } = data
            if (Result === 200) {
                commit('setHomeData', Content);
                dispatch('getMarqueeList');
            } else {
                commit('setActivityStatus', {
                    result: Result, 
                    activityStatusMsg: ResultMessage
                });
            }
        },
        async getMarqueeList({ commit, getters }: any) {
            // const params = {
            //     activityType: getters.activityType,
            // };
            // const { Result, Content, ResultMessage } = await marqueeShow(params);
            const data = {
                "CodeMsg": null,
                "Content": ['恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！', '恭喜用户0478，刚刚抽中了价值199元的坚果礼盒！'],
                "Result": 200,
                "ResultMessage": null
            }
            const { Result, Content, ResultMessage } = data
            if (Result === 200) {
                commit('setMarqueeList', Content);
            } else {
                commit('setActivityStatus', {
                    result: Result, 
                    activityStatusMsg: ResultMessage
                });
            }
        },
    },
    getters: {
        // 1-xx达标，0-未达标
        loanTaskDone: (state: any) => {
            return state.homeData.loanAmount >= state.homeData.targetAmount ? 1 : 0;
        },
        // 埋点用 领取结果：0未领取|1领取中|2领取失败|3领取成功待发货|4领取成功已发货
        receiveResult: (state: any) => {
            if (!state.homeData.choiceAward) {
                return 0;
            }
            const { status, expressNo } = state.homeData.choiceAward;
            if (status === 4) {
                return 1;
            }
            if (status === 6) {
                return 2;
            }
            if (status === 5) {
                return expressNo ? 4 : 3;
            }
            return 0;
        },
        activityType: (state: any, getters: any, rootState: any) =>
            rootState.homeStore.projectProperties.activityID,
    },
};
