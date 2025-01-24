import { REQUEST_METHOD_GET, REQUEST_METHOD_POST } from '@/common/const'

export default [
  // 获取项目的配置信息
  {
    subUrl: '/acp/projectService/query',
    name: 'queryProjectInfo',
    method: REQUEST_METHOD_POST
  },
  // 获取项目列表
  {
    subUrl: '/acp/projectPortalService/list',
    name: 'queryProjectList',
    method: REQUEST_METHOD_POST
  },
  // 重新发布
  {
    subUrl: '/acp/projectPortalService/republish',
    name: 'republishProjects',
    method: REQUEST_METHOD_POST
  },
  // 查询创建人列表
  {
    subUrl: '/acp/projectPortalService/getCreaterInfoes',
    name: 'queryCreateNameList',
    method: REQUEST_METHOD_POST
  },

  // 查询项目Id列表
  {
    subUrl: '/acp/projectPortalService/all',
    name: 'queryProjectIdList',
    method: REQUEST_METHOD_POST
  },

  //新建项目（活动）
  {
    subUrl: '/acp/projectPortalService/create',
    name: 'createProject',
    method: REQUEST_METHOD_POST
  },

  // 草稿项目列表-删除
  {
    subUrl: '/acp/projectPortalService/delete',
    name: 'deleteProject',
    method: REQUEST_METHOD_POST
  },

  //在线项目列表-禁用
  {
    subUrl: '/acp/projectPortalService/changeStatus',
    name: 'doProjectStatus',
    method: REQUEST_METHOD_POST
  },

  // 草稿项目编辑
  {
    subUrl: '/acp/projectPortalService/saveBasicInfo',
    name: 'editProjectBasicInfo',
    method: REQUEST_METHOD_POST
  },

  //发布项目
  {
    subUrl: '/acp/projectPortalService/publish',
    name: 'publishProject',
    method: REQUEST_METHOD_POST
  },

  // 编辑
  {
    subUrl: '/acp/projectService/preview',
    name: 'editPreviewProject',
    method: REQUEST_METHOD_POST
  },

  //保存项目组件属性
  {
    subUrl: '/acp/projectPortalService/savePage',
    name: 'saveProject',
    method: REQUEST_METHOD_POST
  },

  // 查询发布日志
  {
    subUrl: '/acp/projectPortalService/publishLog',
    name: 'queryPublishLog',
    method: REQUEST_METHOD_POST
  },

  // 复制副本获取当前项目配置信息
  {
    subUrl: '/acp/projectService/query',
    name: 'queryProject',
    method: REQUEST_METHOD_POST
  },

  // 查询用户权限
  {
    subUrl: '/acp/projectPortalService/getUserPerms',
    name: 'getUserPerms',
    method: REQUEST_METHOD_POST
  },

  // 查询公告列表
  {
    subUrl: '/acp/projectPortalService/announcementList',
    name: 'queryAnnouncementList',
    method: REQUEST_METHOD_POST
  },

  // 公告确认
  {
    subUrl: '/acp/projectPortalService/announcementConfirm',
    name: 'announcementConfirm',
    method: REQUEST_METHOD_POST
  },

  // 判断是否弹出公告
  {
    subUrl: '/acp/projectPortalService/checkAnnouncement',
    name: 'checkAnnouncement',
    method: REQUEST_METHOD_POST
  },
  // 生成v3静态landing页面
  {
    subUrl: '/landingSSR/v3Service/generate',
    name: 'generateV3Static',
    method: REQUEST_METHOD_POST
  },
  {
    subUrl: '/landingSSR/commonService/static/file/tree',
    name: 'getV3FileList',
    method: REQUEST_METHOD_GET
  },
  {
    subUrl: '/landingSSR/commonService/static/file/tail',
    name: 'getV3FileTail',
    method: REQUEST_METHOD_GET
  },
  // 获取V3生成的静态页面列表何日志列表
  {
    subUrl: '/landingSSR/commonService/static/file/tree',
    name: 'getFileTree',
    method: REQUEST_METHOD_GET
  },
  // 查询下载模式
  {
    subUrl: '/mktingService/ldSdcCfgPortalService/queryForceDownloadMode',
    name: 'queryForceDownloadMode',
    method: REQUEST_METHOD_GET
  },
  // 查询租户列表
  {
    subUrl: '/acp/tenantService/menus',
    name: 'menus',
    method: REQUEST_METHOD_POST
  },
  // 更新下载模式
  {
    subUrl: '/mktingService/ldSdcCfgPortalService/updateForceDownloadMode',
    name: 'updateForceDownloadMode',
    method: REQUEST_METHOD_POST
  },
  // 查询项目组下的所有版本信息
  {
    subUrl: '/acp/projectPortalService/itemsOnGroup',
    name: 'queryItemsOnGroup',
    method: REQUEST_METHOD_POST
  },
  // 查询项目组iview信息
  {
    subUrl: '/iview/service/getApigetCurrentMsg.do',
    name: 'getApigetCurrentMsg',
    method: REQUEST_METHOD_GET
  },
  // 查询项目组iview信息
  {
    subUrl: '/iview/service/v1/getApiMsg',
    name: 'getApiMsg',
    method: REQUEST_METHOD_POST
  },
  // 查询星云列表
  {
    subUrl: '/acprender/service/render/getNebulaEnvs',
    name: 'getNebulaEnvs',
    method: REQUEST_METHOD_POST
  },
  // 查询项目组iview信息
  {
    subUrl: '/psscms/fileNew/getStsToken',
    name: 'getStsToken',
    method: REQUEST_METHOD_POST
  },
  // 上传华为云
  {
    subUrl: '/acprender/service/uploadService/upload',
    name: 'imageUpload',
    method: REQUEST_METHOD_POST,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  },
  {
    subUrl: '/uploaduser/uploadServiceV2/uploadOss',
    name: 'imageUploadOss',
    method: REQUEST_METHOD_POST,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  },
  // 批量发布
  {
    subUrl: '/acp/projectPortalService/batchPublish',
    name: 'batchPublish',
    method: REQUEST_METHOD_POST
  },
  // 批量重新发布
  {
    subUrl: '/acp/projectPortalService/batchRepublish',
    name: 'batchRepublish',
    method: REQUEST_METHOD_POST
  },
  // project json 导出
  {
    subUrl: '/acp/projectService/export',
    name: 'exportProjectJSON',
    method: REQUEST_METHOD_POST
  },
]
