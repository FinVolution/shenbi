import Mock from 'mockjs';

Mock.mock(/\/api\/acp\/projectPortalService\/list/, 'post', {
  CodeMsg: null,
  Content: {
    pageList: [
      {
        contractEmail: null,
        createByName: 'admin',
        createTime: 1729135927210,
        id: 21049,
        itemsCount: 2,
        ownerStatus: 1,
        parentProjectId: '0',
        projectDesc: '测试项目',
        projectEndTime: 2145974399000,
        projectId: '134218070',
        projectName: '测试项目',
        projectStartTime: 1729135927210,
        projectStatusId: 0,
        projectType: 100,
        projectTypeTag: 100,
        properties: [
          {
            propertyComment: null,
            propertyName: 'activityID',
            propertyValue: {
              activityID: '1069',
            },
          },
          {
            propertyComment: null,
            propertyName: 'productTag',
            propertyValue: {
              productTag: 'laokeshiwu',
            },
          },
          {
            propertyComment: null,
            propertyName: 'iViewID',
            propertyValue: {
              iViewID: 0,
            },
          },
        ],
        publishStatus: 1,
        updateTime: 1729135927210,
      },
    ],
    totalCount: 1,
  },
  Result: 200,
  ResultMessage: null,
});

Mock.mock(/\/api\/acp\/projectPortalService\/itemsOnGroup/, 'post', {
  CodeMsg: null,
  Content: [
    {
      contractEmail: null,
      createByName: 'admin',
      createTime: 1729135927210,
      id: 21050,
      itemsCount: 0,
      ownerStatus: 1,
      parentProjectId: '134218070',
      projectDesc: '',
      projectEndTime: 2145974399000,
      projectId: '134218071',
      projectName: '黄金版本',
      projectStartTime: 1729135927210,
      projectStatusId: 0,
      projectType: 100,
      projectTypeTag: 101,
      properties: [
        {
          propertyComment: null,
          propertyName: 'activityID',
          propertyValue: {
            activityID: '1069',
          },
        },
        {
          propertyComment: null,
          propertyName: 'projectMain',
          propertyValue: {
            min: 0,
            productId: 'gold',
            max: 0.5,
            iviewid: '',
            versionName: '黄金版本',
          },
        },
      ],
      publishStatus: 0,
      updateTime: 1729135927210,
    },
    {
      contractEmail: null,
      createByName: 'admin',
      createTime: 1729135927210,
      id: 21051,
      itemsCount: 0,
      ownerStatus: 1,
      parentProjectId: '134218070',
      projectDesc: '',
      projectEndTime: 2145974399000,
      projectId: '134218072',
      projectName: '红色版本',
      projectStartTime: 1729135927210,
      projectStatusId: 0,
      projectType: 100,
      projectTypeTag: 101,
      properties: [
        {
          propertyComment: null,
          propertyName: 'activityID',
          propertyValue: {
            activityID: '1069',
          },
        },
        {
          propertyComment: null,
          propertyName: 'projectMain',
          propertyValue: {
            min: 0.5,
            productId: 'red',
            max: 1,
            iviewid: '',
            versionName: '红色版本',
          },
        },
      ],
      publishStatus: 0,
      updateTime: 1729135927210,
    },
  ],
  Result: 200,
  ResultMessage: null,
});

Mock.mock(/\/api\/acp\/projectService\/preview/, 'post', (options) => {
  const { projectId } = JSON.parse(options.body);
  let Content = {
    createTime: 1729135927210,
    pageList: [
      {
        componentProperties: [
          {
            componentId: 'c_UFEIvOfZhoK4',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcMarquee',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                bgColor: 'rgba(0, 0, 0, 0.37)',
                width: 375,
                marginBottom: 14,
                marginTop: 0,
                height: 33,
                marginLeft: 0,
              },
              property: {
                switchOldVersion: false,
              },
              selfStyle: {
                fontFamily: '',
                color: '#fff',
                paddingRight: 0,
                fontSize: 13,
                paddingLeft: 18,
                height: 33,
              },
              pageId: 1,
            },
          },
          {
            componentId: 'c_rcNi5AO0qycD',
            pageId: '1',
            propertyComment: null,
            propertyName: 'image',
            propertyValue: {
              children: [],
              containerStyle: {
                borderColor: 'rgba(0,0,0,0)',
                bgImgUrl: '',
                align: 'right',
                paddingBottom: 0,
                bgColor: 'rgba(0,0,0,0)',
                top: 0,
                borderRadius: 0,
                left: 0,
                borderWidth: 0,
                width: 375,
                marginBottom: 30,
                position: 'relative',
                paddingTop: 0,
                borderStyle: 'solid',
                marginTop: 0,
                zIndex: 0,
                order: 0,
              },
              property: {
                setAppMarignTop: false,
                animDuration: 1,
                animLoop: false,
                linkUrl: '',
                animCss: '',
                clickType: 1,
                animName: '',
                url: 'https://maumkt.ppdaicdn.com/acp/uploadImages/MJJCHR20221107021430icon-rule.png',
              },
              selfStyle: {
                borderColor: 'rgba(0,0,0,0)',
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 0,
                borderRadius: 0,
                borderWidth: 0,
                width: 18,
                marginBottom: 0,
                paddingTop: 0,
                borderStyle: 'solid',
                paddingLeft: 0,
                marginTop: 0,
                height: 34,
              },
              pageId: 1,
            },
          },
          {
            componentId: 'c_trdi8S2j3hVO',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcParticipationCard',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                paddingBottom: 0.1,
                bgColor: 'rgba(245, 248, 250, 0)',
                width: 375,
                marginBottom: 0,
                paddingTop: 0.1,
                align: 'center',
                marginTop: 0,
                marginLeft: 0,
              },
              property: {
                switchOldVersion: true,
              },
              selfStyle: {
                marginRight: 0,
                marginBottom: 8,
                marginTop: 0,
                marginLeft: 0,
              },
              pageId: 1,
              elemStyle: {
                redWordBefore: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/acp/uploadImages/1726211222001.png',
                },
                redWord: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/acp/uploadImages/1726209512654.png',
                },
                redSmallBg: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/22total_loan/red_card_small.png',
                },
                redBigBg: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/acp/uploadImages/1726210560541.png',
                },
                redWordAfter: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/22total_loan/red_word_after.png',
                },
                redTag: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/22total_loan/red_tag.png',
                },
              },
            },
          },
          {
            componentId: 'c_4VIy7D5vo1fN',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcAwardCard',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                paddingBottom: 0.1,
                bgColor: 'rgba(245, 248, 250, 0)',
                width: 357,
                marginBottom: 0,
                paddingTop: 0.1,
                align: 'center',
                marginTop: 0,
                marginLeft: 9,
              },
              property: {
                switchOldVersion: true,
                title: '- 好礼4选1 包邮送到家 -',
                awardList: [
                  {
                    awardKey: 'jianguolibao_1069_1',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_2',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_3',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_4',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_5',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_6',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_7',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                  {
                    awardKey: 'jianguolibao_1069_8',
                    buttonText: 'xxx',
                    bigPic:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/baicaowei-nut2.png',
                    disabled: false,
                    awardName: '百草味坚果礼盒',
                  },
                ],
              },
              selfStyle: {
                marginRight: 0,
                textAlign: 'center',
                bgImgUrl:
                  'https://maumkt.ppdaicdn.com/acp/uploadImages/card-large.png',
                width: 357,
                marginBottom: 0,
                marginTop: 0,
                height: 508,
                marginLeft: 0,
              },
              pageId: 1,
              elemStyle: {
                redAwardCardButton: {
                  bgImgUrl: 'linear-gradient(90deg, #FB6D46 0%, #F2442C 100%)',
                  styleNoOper: [],
                },
                redAwardCardBg: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/22total_loan/red_award_card_bg.png',
                },
                titleColor: {
                  color: '#441003',
                },
                buttonColor: {
                  color: '#fff',
                },
                awardBg: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/acp/uploadImages/award-background.png',
                },
                buttonBgColor: {
                  bgImgUrl: 'linear-gradient(90deg, #fb6d46 0%, #f83871 100%)',
                },
              },
            },
          },
          {
            componentId: 'c_E8c92J06kYqy',
            pageId: '1',
            propertyComment: null,
            propertyName: 'copyright',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                textAlign: 'center',
                width: 375,
                marginBottom: 34,
                align: 'center',
                marginTop: 20,
                marginLeft: 0,
              },
              property: {
                mainText: '仅限xx岁以上用户参与',
                subText: '活动奖励由xxxx提供，与xxxx公司无关',
              },
              selfStyle: {
                color: '#fff',
              },
              pageId: 1,
              elemStyle: {},
            },
          },
          {
            componentId: 'c_9iQgqvzJDG5f',
            pageId: '1',
            propertyComment: null,
            propertyName: 'button',
            propertyValue: {
              children: [],
              containerStyle: {
                paddingBottom: 10,
                bgColor: 'rgba(0,0,0,0)',
                top: 0,
                left: 0,
                bgImgUrl: '',
                marginBottom: 0,
                position: 'relative',
                paddingTop: 10,
                align: 'center',
                marginTop: 0,
                zIndex: 0,
                order: 0,
              },
              property: {
                routerPageId: 1,
                linkUrl: 'https://www.baidu.com',
                text: '提交',
              },
              selfStyle: {
                borderColor: 'rgba(0,0,0,0)',
                color: '#fff',
                bgImgUrl: '',
                paddingRight: 0,
                fontFamily: '',
                paddingBottom: 0,
                borderRadius: 4,
                bgColor: '#FC5332',
                borderWidth: 0,
                width: 250,
                fontSize: 18,
                paddingTop: 0,
                borderStyle: 'solid',
                paddingLeft: 0,
                height: 40,
              },
              pageId: 1,
            },
          },
        ],
        pageId: 1,
        pageProperties: [
          {
            propertyComment: null,
            propertyName: 'pageProperty',
            propertyValue: {
              titleBgImgUrl: null,
              popupBgColor: 'rgba(255,255,255,1)',
              isAppSwitch: false,
              bgImgUrl:
                'https://maumkt.ppdaicdn.com/acp/uploadImages/1726208176817.png',
              title: 'xx领好礼',
              titleBgColor: 'rgba(255,255,255,1)',
              version: '3.0',
              bgColor: 'rgba(108, 205, 255, 1)',
              titleColor: 'rgba(0,0,0,1)',
              routerName: 'home',
              linkUrl: '',
              titleSwitch: false,
              id: 1,
              popupFontColor: 'rgba(0,0,0,1)',
            },
          },
        ],
      },
    ],
    projectItems: null,
    projectProperties: [
      {
        propertyComment: null,
        propertyName: 'activityID',
        propertyValue: {
          activityID: '1069',
        },
      },
      {
        propertyComment: null,
        propertyName: 'projectMain',
        propertyValue: {
          min: 0,
          productId: 'gold',
          max: 1,
          iviewid: '',
          versionName: '黄金版本',
        },
      },
    ],
    projectStatus: 0,
    projectTimeStatus: 0,
    projectTypeTag: 101,
  };
  if (projectId === '134218072') {
    Content = {
      createTime: 1729135927210,
      pageList: [
        {
          componentProperties: [
            {
              componentId: 'c_UFEIvOfZhoK4',
              pageId: '1',
              propertyComment: null,
              propertyName: 'rcMarquee',
              propertyValue: {
                children: [],
                containerStyle: {
                  marginRight: 0,
                  bgColor: 'rgba(0, 0, 0, 0.37)',
                  width: 375,
                  marginBottom: 37,
                  marginTop: 0,
                  height: 22,
                  marginLeft: 0,
                },
                property: {
                  switchOldVersion: false,
                },
                selfStyle: {
                  fontFamily: '',
                  color: '#fff',
                  paddingRight: 0,
                  fontSize: 13,
                  paddingLeft: 18,
                  height: 22,
                },
                pageId: 1,
              },
            },
            {
              componentId: 'c_rcNi5AO0qycD',
              pageId: '1',
              propertyComment: null,
              propertyName: 'image',
              propertyValue: {
                children: [],
                containerStyle: {
                  borderColor: 'rgba(0,0,0,0)',
                  bgImgUrl: '',
                  align: 'right',
                  paddingBottom: 0,
                  bgColor: 'rgba(0,0,0,0)',
                  top: 0,
                  borderRadius: 0,
                  left: 0,
                  borderWidth: 0,
                  width: 375,
                  marginBottom: 0,
                  position: 'relative',
                  paddingTop: 0,
                  borderStyle: 'solid',
                  marginTop: 0,
                  zIndex: 0,
                  order: 0,
                },
                property: {
                  setAppMarignTop: false,
                  animDuration: 1,
                  animLoop: false,
                  linkUrl: '',
                  clickType: 2,
                  animName: '',
                  url: 'https://maumkt.ppdaicdn.com/acp/uploadImages/MJJCHR20221107021430icon-rule.png',
                },
                selfStyle: {
                  borderColor: 'rgba(0,0,0,0)',
                  paddingRight: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingBottom: 0,
                  borderRadius: 0,
                  borderWidth: 0,
                  width: 18,
                  marginBottom: 0,
                  paddingTop: 0,
                  borderStyle: 'solid',
                  paddingLeft: 0,
                  marginTop: 0,
                  height: 34,
                },
                pageId: 1,
              },
            },
            {
              componentId: 'c_1gx6GShqwjtY',
              pageId: '1',
              propertyComment: null,
              propertyName: 'rcParticipationCard',
              propertyValue: {
                children: [],
                containerStyle: {
                  marginRight: 0,
                  paddingBottom: 0.1,
                  bgColor: 'rgba(245, 248, 250, 0)',
                  width: 375,
                  marginBottom: 0,
                  paddingTop: 0.1,
                  align: 'center',
                  marginTop: -5,
                  marginLeft: 0,
                },
                property: {
                  switchOldVersion: false,
                },
                selfStyle: {
                  marginRight: 0,
                  marginBottom: 8,
                  marginTop: 0,
                  marginLeft: 0,
                },
                pageId: 1,
                elemStyle: {
                  redWordBefore: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/1726211222001.png',
                  },
                  redWord: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/1726209512654.png',
                  },
                  redSmallBg: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/22total_loan/red_card_small.png',
                  },
                  redBigBg: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/1726210560541.png',
                  },
                  redWordAfter: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/22total_loan/red_word_after.png',
                  },
                  redTag: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/22total_loan/red_tag.png',
                  },
                },
              },
            },
            {
              componentId: 'c_4VIy7D5vo1fN',
              pageId: '1',
              propertyComment: null,
              propertyName: 'rcAwardCard',
              propertyValue: {
                children: [],
                containerStyle: {
                  marginRight: 0,
                  paddingBottom: 0.1,
                  bgColor: 'rgba(245, 248, 250, 0)',
                  width: 375,
                  marginBottom: 0,
                  paddingTop: 0.1,
                  align: 'center',
                  marginTop: 0,
                  marginLeft: 0,
                },
                property: {
                  switchOldVersion: false,
                  title: '- 好礼4选1 包邮送到家 -',
                  awardList: [
                    {
                      awardKey: 'sanjiantao_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/ZPRFNV20221109030256sanjiantaoda.png',
                      disabled: false,
                      awardName: '南极人三件套',
                    },
                    {
                      awardKey: 'jianguolibao_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/PEMMTG20221109030308dajianguolihe.png',
                      disabled: false,
                      awardName: '百草味坚果礼盒',
                    },
                    {
                      awardKey: 'xiaomibaowenbei_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/SUWJDR20221109030319daxmbaowenbei.png',
                      disabled: false,
                      awardName: '小米米家保温杯',
                    },
                    {
                      awardKey: 'zuyupen_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/MGIMHB20221109030332dazuyupen.png',
                      disabled: false,
                      awardName: '康佳家用足浴盆',
                    },
                    {
                      awardKey: 'zhedieyi_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/RJMYZM20221109072800jd-folding-chair.png',
                      disabled: false,
                      awardName: '户外折叠椅',
                    },
                    {
                      awardKey: 'nuanfengji_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/TLOTYM20221109030355daxmnuanfengji.png',
                      disabled: false,
                      awardName: '米家桌面暖风机',
                    },
                    {
                      awardKey: 'shanmoshi_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/WXLHMR20221109030411dashanmoshibaowenbei.png',
                      disabled: false,
                      awardName: '膳魔师保温杯',
                    },
                    {
                      awardKey: 'xiaomiyinxiang_1069',
                      buttonText: 'xxx',
                      bigPic:
                        'https://maumkt.ppdaicdn.com/acp/uploadImages/GDRPUZ20221109030419daxmyinxiang.png',
                      disabled: false,
                      awardName: '小米小爱音箱',
                    },
                  ],
                },
                selfStyle: {
                  marginRight: 0,
                  textAlign: 'center',
                  bgImgUrl: '',
                  width: 357,
                  marginBottom: 0,
                  marginTop: 0,
                  height: 508,
                  marginLeft: 0,
                },
                pageId: 1,
                elemStyle: {
                  redAwardCardButton: {
                    bgImgUrl:
                      'linear-gradient(90deg, #FB6D46 0%, #F2442C 100%)',
                    styleNoOper: [],
                  },
                  redAwardCardBg: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/22total_loan/red_award_card_bg.png',
                  },
                  titleColor: {
                    color: 'rgba(255, 255, 255, 1)',
                  },
                  buttonColor: {
                    color: 'rgba(252, 255, 254, 1)',
                  },
                  awardBg: {
                    bgImgUrl:
                      'https://maumkt.ppdaicdn.com/acp/uploadImages/award-background.png',
                  },
                  buttonBgColor: {
                    bgImgUrl:
                      'linear-gradient(90deg, #fb6d46 0%, #f83871 100%)',
                  },
                },
              },
            },
            {
              componentId: 'c_E8c92J06kYqy',
              pageId: '1',
              propertyComment: null,
              propertyName: 'copyright',
              propertyValue: {
                children: [],
                containerStyle: {
                  marginRight: 0,
                  textAlign: 'center',
                  width: 375,
                  marginBottom: 34,
                  align: 'center',
                  marginTop: 8,
                  marginLeft: 0,
                },
                property: {
                  mainText: '仅限xx岁以上用户参与',
                  subText: '活动奖励由xxxx提供，与xxxx公司无关',
                },
                selfStyle: {
                  color: '#fff',
                },
                pageId: 1,
                elemStyle: {},
              },
            },
          ],
          pageId: 1,
          pageProperties: [
            {
              propertyComment: null,
              propertyName: 'pageProperty',
              propertyValue: {
                titleBgImgUrl: null,
                popupBgColor: 'rgba(255,255,255,1)',
                isAppSwitch: false,
                bgImgUrl:
                  'https://maumkt.ppdaicdn.com/acp/uploadImages/1726208165089.png',
                title: 'xx领好礼',
                titleBgColor: 'rgba(255,255,255,1)',
                version: '3.0',
                bgColor: 'rgba(152, 15, 2, 1)',
                titleColor: 'rgba(0,0,0,1)',
                routerName: 'home',
                linkUrl: '',
                titleSwitch: false,
                id: 1,
                popupFontColor: 'rgba(0,0,0,1)',
              },
            },
          ],
        },
      ],
      projectItems: null,
      projectProperties: [
        {
          propertyComment: null,
          propertyName: 'activityID',
          propertyValue: {
            activityID: '1069',
          },
        },
        {
          propertyComment: null,
          propertyName: 'projectMain',
          propertyValue: {
            min: 0,
            productId: 'red',
            max: 1,
            iviewid: '',
            versionName: '红色版本',
          },
        },
      ],
      projectStatus: 0,
      projectTimeStatus: 0,
      projectTypeTag: 101,
    };
  }
  return {
    CodeMsg: null,
    Content,
    Result: 200,
    ResultMessage: null,
  };
});

Mock.mock(
  /\/api\/acp\/projectPortalService\/saveBasicInfo/,
  'post',
  (options) => {
    const { preId, projectId } = JSON.parse(options.body);
    return {
      CodeMsg: null,
      Content: {
        preId,
        projectId,
      },
      Result: 200,
      ResultMessage: null,
    };
  }
);

Mock.mock(/\/api\/acp\/projectPortalService\/savePage/, 'post', {
  CodeMsg: null,
  Content: {
    CodeMsg: null,
    Content: null,
    Result: 200,
    ResultMessage: null,
  },
  Result: 200,
  ResultMessage: null,
});

Mock.mock(/\/api\/acp\/projectPortalService\/create/, 'post', {
  CodeMsg: null,
  Content: {
    preId: 21582,
    projectId: '134218201',
  },
  Result: 200,
  ResultMessage: null,
});

Mock.mock(/\/api\/acp\/projectService\/query/, 'post', {
  CodeMsg: null,
  Content: {
    createTime: 1729135927210,
    pageList: [
      {
        componentProperties: [
          {
            componentId: 'c_UFEIvOfZhoK4',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcMarquee',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                width: 375,
                marginBottom: 14,
                marginTop: 0,
                height: 33,
                marginLeft: 0,
              },
              property: {
                switchOldVersion: false,
              },
              selfStyle: {
                fontFamily: '',
                color: '#fff',
                bgColor: 'rgba(0, 0, 0, 0.37)',
                paddingRight: 0,
                fontSize: 13,
                paddingLeft: 18,
                height: 33,
              },
              pageId: 1,
            },
          },
          {
            componentId: 'c_rcNi5AO0qycD',
            pageId: '1',
            propertyComment: null,
            propertyName: 'image',
            propertyValue: {
              children: [],
              containerStyle: {
                borderColor: 'rgba(0,0,0,0)',
                bgImgUrl: '',
                align: 'right',
                paddingBottom: 0,
                bgColor: 'rgba(0,0,0,0)',
                top: 0,
                borderRadius: 0,
                left: 0,
                borderWidth: 0,
                width: 375,
                marginBottom: 30,
                position: 'relative',
                paddingTop: 0,
                borderStyle: 'solid',
                marginTop: 0,
                zIndex: 0,
                order: 0,
              },
              property: {
                setAppMarignTop: false,
                linkUrl: '',
                clickType: 1,
                url: 'https://maumkt.ppdaicdn.com/acp/uploadImages/MJJCHR20221107021430icon-rule.png',
              },
              selfStyle: {
                borderColor: 'rgba(0,0,0,0)',
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 0,
                borderRadius: 0,
                borderWidth: 0,
                width: 18,
                marginBottom: 0,
                paddingTop: 0,
                borderStyle: 'solid',
                paddingLeft: 0,
                marginTop: 0,
                height: 34,
              },
              pageId: 1,
            },
          },
          {
            componentId: 'c_ctecpSNbAC6u',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcParticipationCard',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                marginBottom: 8,
                marginTop: 0,
                marginLeft: 0,
              },
              property: {
                switchOldVersion: false,
              },
              selfStyle: {},
              pageId: 1,
            },
          },
          {
            componentId: 'c_4VIy7D5vo1fN',
            pageId: '1',
            propertyComment: null,
            propertyName: 'rcAwardCard',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                textAlign: 'center',
                bgImgUrl:
                  'https://maumkt.ppdaicdn.com/acp/uploadImages/card-large.png',
                width: 357,
                marginBottom: 0,
                marginTop: 0,
                height: 508,
                marginLeft: 9,
              },
              property: {
                switchOldVersion: false,
                title: '- 好礼4选1 包邮送到家 -',
              },
              selfStyle: {},
              pageId: 1,
              elemStyle: {
                titleColor: {
                  color: '#441003',
                },
                buttonColor: {
                  color: '#fff',
                },
                awardBg: {
                  bgImgUrl:
                    'https://maumkt.ppdaicdn.com/acp/uploadImages/award-background.png',
                },
                buttonBgColor: {
                  bgImgUrl: 'linear-gradient(90deg, #fb6d46 0%, #f83871 100%)',
                },
              },
            },
          },
          {
            componentId: 'c_E8c92J06kYqy',
            pageId: '1',
            propertyComment: null,
            propertyName: 'copyright',
            propertyValue: {
              children: [],
              containerStyle: {
                marginRight: 0,
                textAlign: 'center',
                width: 375,
                marginBottom: 34,
                align: 'center',
                marginTop: 20,
                marginLeft: 0,
              },
              property: {
                mainText: '仅限xx岁以上用户参与',
                subText: '活动奖励由xxxx提供，与xxxx公司无关',
              },
              selfStyle: {
                color: '#fff',
              },
              pageId: 1,
              elemStyle: {},
            },
          },
        ],
        pageId: 1,
        pageProperties: [
          {
            propertyComment: null,
            propertyName: 'pageProperty',
            propertyValue: {
              titleBgImgUrl: null,
              popupBgColor: 'rgba(255,255,255,1)',
              isAppSwitch: false,
              bgImgUrl:
                'https://maumkt.ppdaicdn.com/acp/uploadImages/1726208176817.png',
              title: 'xx领好礼',
              titleBgColor: 'rgba(255,255,255,1)',
              version: '3.0',
              bgColor: 'rgba(108, 205, 255, 1)',
              titleColor: 'rgba(0,0,0,1)',
              routerName: 'home',
              linkUrl: '',
              titleSwitch: false,
              id: 1,
              popupFontColor: 'rgba(0,0,0,1)',
            },
          },
        ],
      },
    ],
    projectItems: null,
    projectProperties: [
      {
        propertyComment: null,
        propertyName: 'activityID',
        propertyValue: {
          activityID: '1069',
        },
      },
      {
        propertyComment: null,
        propertyName: 'projectMain',
        propertyValue: {
          min: 0,
          productId: 'gold',
          max: 1,
          iviewid: '',
          versionName: '黄金版本',
        },
      },
    ],
    projectStatus: 0,
    projectTimeStatus: 0,
    projectTypeTag: 101,
  },
  Result: 200,
  ResultMessage: null,
});

Mock.mock(/\/api\/acp\/projectPortalService\/publishLog/, 'post', {
  CodeMsg: null,
  Content: {
    publishLogList: [
      {
        preId: 21050,
        projectId: '134218071',
        publishTime: '2022-11-08 13:58:29',
        publisherName: 'admin',
      },
    ],
  },
  Result: 200,
  ResultMessage: null,
});
