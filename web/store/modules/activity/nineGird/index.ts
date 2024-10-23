import {
  IAwardProperties,
  IBaseArrayResult,
} from "@/interface/nineGird";

declare interface IndexState {
  awardList: IBaseArrayResult<IAwardProperties>;
  activityResult: number;
}

const nineGridStore = {
  namespaced: true,
  state: {
    awardListPagetitle: {
      fullScreen: "2", // 1全屏，2非全屏
      visible: "1",
      leftView: [],
      rightView: [],
      titleView: {
        text: "我的奖品",
        color: "#000000",
      },
    },
  },
  mutations: {
    setData(state: IndexState, payload: { [prop: string]: any }) {
      Object.assign(state, payload);
    },
  },
  getters: {
    activityStatus: (state: any) => {
      return state.activityResult === 40600 || state.activityResult === 40900
    }
  },
  actions: {
    initialList({ commit }: { commit: Commit }, params: { payload: IBaseArrayResult<IAwardProperties> }) {
      commit('setData', { awardList: params.payload.Content || [] })
      commit('setData', { activityResult: params.payload.Result })

    }
  }
};

export { nineGridStore };
