import { ISSRContext } from 'ssr-types'
import { VueRouter } from 'vue-router/types/router'
import { getConfigProduction } from '../../service/index'
import { IPageConfigResult } from '../../interface/index'
import { inApp } from '@/utils'
import hook from '@/preflight/hook'
import { getCookie } from '@/utils/util'
interface IApiService {
  configProduction: (projectId: String) => Promise<{ data: IPageConfigResult }>;
}

interface IApiRedisService {
  get: (key: string) => Promise<any>
  set: (key: string, value: string) => Promise<any>
  del: (key: string) => Promise<any>
}

export default async (
  { store, router }: { router: VueRouter, store: any },
  ctx?: ISSRContext<{ apiService?: IApiService, redisService?: IApiRedisService }>
) => {
//     // 真实环境请解开
//   const projectId = __isBrowser__ ? router?.params?.projectId : ctx?.params?.projectId
//   const res = __isBrowser__
//     ? await getConfigProduction(projectId)
//     : await ctx?.apiService?.configProduction(projectId);
//   await store.dispatch('homeStore/initialData', { payload: res?.data });
//     // 真实环境请解开

  //  mock
  const data = {
    "CodeMsg": null,
    "Content": {
        "createTime": 1668422312000,
        "pageList": [
            {
                "componentProperties": [
                    {
                        "componentId": "c_tIFqU6FxKGv7",
                        "pageId": "1",
                        "propertyComment": null,
                        "propertyName": "rcMarquee",
                        "propertyValue": {
                            "children": [],
                            "containerStyle": {
                                "marginRight": 0,
                                "bgColor": "rgba(0, 0, 0, 0.37)",
                                "width": 375,
                                "marginBottom": 0,
                                "marginTop": 0,
                                "height": 33,
                                "marginLeft": 0
                            },
                            "property": {
                                "switchOldVersion": true
                            },
                            "selfStyle": {
                                "fontFamily": "",
                                "color": "#fff",
                                "paddingRight": 0,
                                "fontSize": 13,
                                "paddingLeft": 18,
                                "height": 33
                            },
                            "pageId": 1
                        }
                    },
                    {
                        "componentId": "c_8adGyAHipfUR",
                        "pageId": "1",
                        "propertyComment": null,
                        "propertyName": "image",
                        "propertyValue": {
                            "children": [],
                            "containerStyle": {
                                "borderColor": "rgba(0,0,0,0)",
                                "bgImgUrl": "",
                                "align": "right",
                                "paddingBottom": 0,
                                "bgColor": "rgba(0,0,0,0)",
                                "top": 0,
                                "borderRadius": 0,
                                "left": 0,
                                "borderWidth": 0,
                                "width": 375,
                                "marginBottom": 30,
                                "position": "relative",
                                "paddingTop": 0,
                                "borderStyle": "solid",
                                "marginTop": 14,
                                "zIndex": 0,
                                "order": 0
                            },
                            "property": {
                                "setAppMarignTop": false,
                                "animDuration": 1,
                                "animLoop": false,
                                "linkUrl": "",
                                "clickType": 2,
                                "animName": "",
                                "url": "https://maumkt.ppdaicdn.com/acp/uploadImages/LWOKNN20221108114032icon-rule.png"
                            },
                            "selfStyle": {
                                "borderColor": "rgba(0,0,0,0)",
                                "paddingRight": 0,
                                "marginLeft": 0,
                                "marginRight": 0,
                                "paddingBottom": 0,
                                "borderRadius": 0,
                                "borderWidth": 0,
                                "width": 18,
                                "marginBottom": 0,
                                "paddingTop": 0,
                                "borderStyle": "solid",
                                "paddingLeft": 0,
                                "marginTop": 0,
                                "height": 34
                            },
                            "pageId": 1
                        }
                    },
                    {
                        "componentId": "c_TcU9WuFBwq3T",
                        "pageId": "1",
                        "propertyComment": null,
                        "propertyName": "rcParticipationCard",
                        "propertyValue": {
                            "children": [],
                            "containerStyle": {
                                "marginRight": 0,
                                "paddingBottom": 0.1,
                                "bgColor": "rgba(245, 248, 250, 0)",
                                "width": 375,
                                "marginBottom": 8,
                                "paddingTop": 0.1,
                                "align": "center",
                                "marginTop": 0,
                                "marginLeft": 0
                            },
                            "property": {
                                "switchOldVersion": true
                            },
                            "selfStyle": {
                                "marginRight": 0,
                                "marginBottom": 8,
                                "marginTop": 0,
                                "marginLeft": 0
                            },
                            "pageId": 1,
                            "elemStyle": {
                                "redWordBefore": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/1726211222001.png"
                                },
                                "redWord": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/1726209512654.png"
                                },
                                "redSmallBg": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/22total_loan/red_card_small.png"
                                },
                                "redBigBg": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/1726210560541.png"
                                },
                                "redWordAfter": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/22total_loan/red_word_after.png"
                                },
                                "redTag": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/22total_loan/red_tag.png"
                                }
                            }
                        }
                    },
                    {
                        "componentId": "c_KHdcjhRslE9I",
                        "pageId": "1",
                        "propertyComment": null,
                        "propertyName": "rcAwardCard",
                        "propertyValue": {
                            "children": [],
                            "containerStyle": {
                                "marginRight": 0,
                                "paddingBottom": 0.1,
                                "bgColor": "rgba(245, 248, 250, 0)",
                                "width": 375,
                                "marginBottom": 0,
                                "paddingTop": 0.1,
                                "align": "center",
                                "marginTop": 0,
                                "marginLeft": 0
                            },
                            "property": {
                                "switchOldVersion": true,
                                "title": "- 完成xx任务 免费领好礼 -",
                                "awardList": [
                                    {
                                        "awardKey": "sanjiantao_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/KNDWJK20221216091310beizi1.png",
                                        "disabled": false,
                                        "awardName": "南极人三件套"
                                    },
                                    {
                                        "awardKey": "jianguolibao_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/ZLLISE20221216091314lihe1.png",
                                        "disabled": false,
                                        "awardName": "百草味坚果礼盒"
                                    },
                                    {
                                        "awardKey": "xiaomibaowenbei_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/EOKJZL20221109025310daxmbaowenbei.png",
                                        "disabled": false,
                                        "awardName": "小米米家保温杯"
                                    },
                                    {
                                        "awardKey": "zuyupen_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/MNIOTY20221109025359dazuyupen.png",
                                        "disabled": false,
                                        "awardName": "康佳家用足浴盆"
                                    },
                                    {
                                        "awardKey": "zhedieyi_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/QJQLQW20221109025508dazedieyi.png",
                                        "disabled": false,
                                        "awardName": "户外折叠椅"
                                    },
                                    {
                                        "awardKey": "nuanfengji_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/IEVSSQ20221109025610danuanfengji.png",
                                        "disabled": false,
                                        "awardName": "米家桌面暖风机"
                                    },
                                    {
                                        "awardKey": "shanmoshi_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/LZOUDO20221109025736dashanmoshibaowenbei.png",
                                        "disabled": false,
                                        "awardName": "膳魔师保温杯"
                                    },
                                    {
                                        "awardKey": "xiaomiyinxiang_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/BPQMRZ20221109025746daxmyingxiang.png",
                                        "disabled": false,
                                        "awardName": "小米小爱音箱"
                                    },
                                    {
                                        "awardKey": "baiwei_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/NBRWPV20221216091320pijiu1.png",
                                        "disabled": false,
                                        "awardName": "百威450ml*18听"
                                    },
                                    {
                                        "awardKey": "bamahongcha_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/TENMJP20221216091327chaye1.png",
                                        "disabled": false,
                                        "awardName": "八马红茶250g"
                                    },
                                    {
                                        "awardKey": "erji_1069",
                                        "buttonText": "xxx",
                                        "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/LJSLWP20221129012605bigerji.png",
                                        "disabled": false,
                                        "awardName": "联想耳机"
                                    }
                                ]
                            },
                            "selfStyle": {
                                "marginRight": 0,
                                "textAlign": "center",
                                "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/card-large.png",
                                "width": 357,
                                "marginBottom": 0,
                                "marginTop": 0,
                                "height": 508,
                                "marginLeft": 0
                            },
                            "pageId": 1,
                            "elemStyle": {
                                "redAwardCardButton": {
                                    "bgImgUrl": "linear-gradient(90deg, #FB6D46 0%, #F2442C 100%)",
                                    "styleNoOper": []
                                },
                                "redAwardCardBg": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/22total_loan/red_award_card_bg.png"
                                },
                                "titleColor": {
                                    "color": "#441003"
                                },
                                "buttonColor": {
                                    "color": "#fff"
                                },
                                "awardBg": {
                                    "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/award-background.png"
                                },
                                "buttonBgColor": {
                                    "bgImgUrl": "linear-gradient(90deg, #fb6d46 0%, #f83871 100%)"
                                }
                            }
                        }
                    },
                    {
                        "componentId": "c_AGyEFiTjJph6",
                        "pageId": "1",
                        "propertyComment": null,
                        "propertyName": "copyright",
                        "propertyValue": {
                            "children": [],
                            "containerStyle": {
                                "marginRight": 0,
                                "textAlign": "center",
                                "width": 375,
                                "marginBottom": 16,
                                "align": "center",
                                "marginTop": 14,
                                "marginLeft": 0
                            },
                            "property": {
                                "mainText": "仅限xx岁以上用户参与",
                                "subText": "活动奖励由xxxx提供，与xxxx公司无关"
                            },
                            "selfStyle": {
                                "color": "#fff"
                            },
                            "pageId": 1,
                            "elemStyle": {}
                        }
                    }
                ],
                "pageId": 1,
                "pageProperties": [
                    {
                        "propertyComment": null,
                        "propertyName": "pageProperty",
                        "propertyValue": {
                            "titleBgImgUrl": null,
                            "popupBgColor": "rgba(255,255,255,1)",
                            "isAppSwitch": false,
                            "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/1726208176817.png",
                            "title": "xx领好礼",
                            "titleBgColor": "rgba(255,255,255,1)",
                            "version": "3.0",
                            "bgColor": "rgba(255,255,255,1)",
                            "titleColor": "rgba(0,0,0,1)",
                            "routerName": "home",
                            "linkUrl": "",
                            "titleSwitch": false,
                            "id": 1,
                            "popupFontColor": "rgba(0,0,0,1)"
                        }
                    }
                ]
            }
        ],
        "projectItems": null,
        "projectProperties": [
            {
                "propertyComment": null,
                "propertyName": "activityID",
                "propertyValue": {
                    "activityID": "1069"
                }
            },
            {
                "propertyComment": null,
                "propertyName": "projectMain",
                "propertyValue": {
                    "min": 0,
                    "productId": "golden",
                    "max": 0.1,
                    "iviewid": "",
                    "versionName": "黄金版本"
                }
            }
        ],
        "projectStatus": 0,
        "projectTimeStatus": 0,
        "projectTypeTag": 101
    },
    "Result": 200,
    "ResultMessage": null
  }
  await store.dispatch('homeStore/initialData', { payload: data });
}
