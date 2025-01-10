# 开发文档

## 前置准备

### 环境要求

在启动项目前，需要确保你的环境满足以下要求：

- [Node.js](https://nodejs.org/en) v16.17.0，推荐使用 [volta](https://github.com/volta-cli/volta) 进行版本管理。
- [Git](https://git-scm.com/) 任意版本。

验证你的环境是否满足以上要求，可以通过以下命令查看版本：

```bash
# 出现相应 node LTS版本即可
node -v
# 出现相应 git 版本即可
git -v
```

### 技术栈

- [Vue](https://v2.cn.vuejs.org) v2.6.12
- [Midway.js](https://midwayjs.org/) v2，Node.js 框架
- [ssr](https://doc.ssr-fc.com/) v6.0.0，开箱即用的 SSR 框架

## 快速开始

项目架构包含搭建平台、页面渲染端两部分

### 搭建平台

#### 安装依赖

在你的代码目录内打开终端，并执行以下命令:

```bash
# 进入项目目录
cd admin

# 安装依赖
npm install
```

#### 运行项目

执行以下命令即可运行项目:

```bash
# 启动项目
npm run serve
```

现在，你可以在浏览器访问 `http://localhost:3001/` 查看项目。

### 页面渲染端

#### 安装依赖

在你的代码目录内打开终端，并执行以下命令:

```bash
# 安装依赖
npm install
```

#### 运行项目

执行以下命令即可运行项目:

```bash
# 启动项目
npm run start
```

现在，你可以在浏览器访问 `http://localhost:3000/view/134218070/1/` 查看项目。

#### 一键生成组件模板
```bash
# 启动项目
npm run plop
```

## 项目目录介绍

```
.
├── admin # 搭建平台
│   ├── public
│   └── src
│       ├── assets
│       ├── common
│       ├── components
│       ├── filters
│       ├── icons
│       ├── router
│       ├── service
│       ├── store
│       ├── utils
│       └── views
├── assets
│   ├── icons
│   │   └── svg
│   ├── images
│   │   ├── activity
│   │   ├── common
│   │   ├── palette
│   │   └── preview
│   ├── js
│   └── less
│       ├── base
│       ├── pc
│       └── pcV2
├── common  # UI组件
│   ├── activity   # 活动组件
│   │   └── regularCustomer
│   ├── config
│   │   └── editor
│   ├── foundation  # 基础组件
│   │   ├── base
│   │   ├── css
│   │   └── popup
│   └── o2o         # 业务流程组件
│       ├── acsdk
│       ├── cityList
│       ├── comList
│       ├── constraintsDialog
│       ├── images
│       ├── list
│       └── login
├── docs  # 文档
│   └── images
├── public
│   └── images
│       └── nineGrid
├── src  # 存放服务端 Node.js 相关代码
│   ├── common
│   ├── config
│   ├── controller  
│   │   ├── api
│   │   ├── common
│   │   ├── nineGird
│   │   └── regularCustomer
│   ├── interface
│   │   └── common
│   ├── middleware
│   ├── service
│   │   ├── baseService
│   │   └── common
│   ├── types
│   └── utils
├── typings
│   ├── app
│   └── config
├── utils
└── web   # 存放前端组件相关代码
    ├── @types
    ├── components
    │   ├── activity
    │   ├── common
    │   ├── foundation
    │   ├── layout
    │   └── o2o
    ├── interface
    ├── pages  # pages目录下的文件夹会映射为前端路由表，存放页面级别的组件
    │   ├── error
    │   ├── preview  
    │   ├── regularCustomer
    │   └── view
    ├── plugins
    ├── preflight
    │   └── types
    ├── service
    ├── store
    │   └── modules
    ├── style
    ├── types
    └── utils
        └── collect
```

## 生成页面的数据结构

```json
{
    "createTime": 1667811035000,
    "pageList": [
        {
            "componentProperties": [
                {
                    "componentId": "c_UFEIvOfZhoK4",
                    "pageId": "1",
                    "propertyComment": null,
                    "propertyName": "rcMarquee",
                    "propertyValue": {
                        "children": [],
                        "containerStyle": {
                            "marginRight": 0,
                            "bgColor": "rgba(0, 0, 0, 0.37)",
                            "width": 375,
                            "marginBottom": 14,
                            "marginTop": 0,
                            "height": 33,
                            "marginLeft": 0
                        },
                        "property": {
                            "switchOldVersion": false
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
                    "componentId": "c_rcNi5AO0qycD",
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
                            "marginTop": 0,
                            "zIndex": 0,
                            "order": 0
                        },
                        "property": {
                            "setAppMarignTop": false,
                            "animDuration": 1,
                            "animLoop": false,
                            "linkUrl": "",
                            "animCss": "",
                            "clickType": 1,
                            "animName": "",
                            "url": "https://maumkt.ppdaicdn.com/acp/uploadImages/MJJCHR20221107021430icon-rule.png"
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
                    "componentId": "c_trdi8S2j3hVO",
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
                            "marginBottom": 0,
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
                    "componentId": "c_4VIy7D5vo1fN",
                    "pageId": "1",
                    "propertyComment": null,
                    "propertyName": "rcAwardCard",
                    "propertyValue": {
                        "children": [],
                        "containerStyle": {
                            "marginRight": 0,
                            "paddingBottom": 0.1,
                            "bgColor": "rgba(245, 248, 250, 0)",
                            "width": 357,
                            "marginBottom": 0,
                            "paddingTop": 0.1,
                            "align": "center",
                            "marginTop": 0,
                            "marginLeft": 9
                        },
                        "property": {
                            "switchOldVersion": true,
                            "title": "- 好礼4选1 包邮送到家 -",
                            "awardList": [
                                {
                                    "awardKey": "jianguolibao_1069_1",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_2",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_3",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_4",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_5",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_6",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_7",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
                                },
                                {
                                    "awardKey": "jianguolibao_1069_8",
                                    "buttonText": "xxx",
                                    "bigPic": "https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png",
                                    "disabled": false,
                                    "awardName": "百草味坚果礼盒"
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
                    "componentId": "c_E8c92J06kYqy",
                    "pageId": "1",
                    "propertyComment": null,
                    "propertyName": "copyright",
                    "propertyValue": {
                        "children": [],
                        "containerStyle": {
                            "marginRight": 0,
                            "textAlign": "center",
                            "width": 375,
                            "marginBottom": 34,
                            "align": "center",
                            "marginTop": 20,
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
                },
                {
                    "componentId": "c_9iQgqvzJDG5f",
                    "pageId": "1",
                    "propertyComment": null,
                    "propertyName": "button",
                    "propertyValue": {
                        "children": [],
                        "containerStyle": {
                            "paddingBottom": 10,
                            "bgColor": "rgba(0,0,0,0)",
                            "top": 0,
                            "left": 0,
                            "bgImgUrl": "",
                            "marginBottom": 0,
                            "position": "relative",
                            "paddingTop": 10,
                            "align": "center",
                            "marginTop": 0,
                            "zIndex": 0,
                            "order": 0
                        },
                        "property": {
                            "routerPageId": 1,
                            "linkUrl": "https://www.baidu.com",
                            "text": "提交"
                        },
                        "selfStyle": {
                            "borderColor": "rgba(0,0,0,0)",
                            "color": "#fff",
                            "bgImgUrl": "",
                            "paddingRight": 0,
                            "fontFamily": "",
                            "paddingBottom": 0,
                            "borderRadius": 4,
                            "bgColor": "#FC5332",
                            "borderWidth": 0,
                            "width": 250,
                            "fontSize": 18,
                            "paddingTop": 0,
                            "borderStyle": "solid",
                            "paddingLeft": 0,
                            "height": 40
                        },
                        "pageId": 1
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
                        "bgImgUrl": "https://maumkt.ppdaicdn.com/acp/uploadImages/EIJPQP20221107021318background.png",
                        "title": "xx领好礼",
                        "titleBgColor": "rgba(255,255,255,1)",
                        "version": "3.0",
                        "bgColor": "rgba(108, 205, 255, 1)",
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
                "productId": "gold",
                "max": 1,
                "iviewid": "",
                "versionName": "黄金版本"
            }
        }
    ],
    "projectStatus": 0,
    "projectTimeStatus": 0,
    "projectTypeTag": 101
}
```
