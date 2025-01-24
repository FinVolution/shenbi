import { mock } from 'mockjs';

mock(/\/api\/acp\/projectPortalService\/list/, 'post', (options) => {
  const { onlineType } = JSON.parse(options.body);
  return {
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
          publishStatus: onlineType,
          updateTime: 1729135927210,
        },
      ],
      totalCount: 1,
    },
    Result: 200,
    ResultMessage: null,
  }
});

mock(/\/api\/acp\/projectPortalService\/itemsOnGroup/, 'post', (options) => {
  const { onlineType } = JSON.parse(options.body);
  return {
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
        publishStatus: onlineType,
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
        publishStatus: onlineType,
        updateTime: 1729135927210,
      },
    ],
    Result: 200,
    ResultMessage: null,
  }
});

mock(/\/api\/acp\/projectService\/preview/, 'post', (options) => {
  const { projectId } = JSON.parse(options.body);
  const Content = require(`./json/${projectId}.json`)
  return {
    CodeMsg: null,
    Content,
    Result: 200,
    ResultMessage: null,
  };
});

mock(
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

mock(/\/api\/acp\/projectPortalService\/savePage/, 'post', {
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

mock(/\/api\/acp\/projectPortalService\/create/, 'post', {
  CodeMsg: null,
  Content: {
    preId: 21582,
    projectId: '134218201',
  },
  Result: 200,
  ResultMessage: null,
});

mock(/\/api\/acp\/projectService\/query/, 'post', {
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

mock(/\/api\/acp\/projectPortalService\/publishLog/, 'post', {
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

mock(/\/api\/acp\/projectService\/export/, 'post', (options) => {
  const { projectId } = JSON.parse(options.body);
  const Content = require(`./json/${projectId}.json`)
  return {
    CodeMsg: null,
    Content,
    Result: 200,
    ResultMessage: null,
  };
});
