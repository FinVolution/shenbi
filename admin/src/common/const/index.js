import moment from 'moment'
// 存在sessionStorage中用于获取登陆态相关信息的key
export const Y = 'y'
export const N = 'n'
export const NO_USER_TOKEN_STATUS_CODE_GATEWAY = 400
export const NO_USER_TOKEN_STATUS_CODE_SERVER = 401
export const SUCCESS_STATUS_CODE = 200
export const SERVER_ERROR_STATUS_CODE = 500
export const EXCEPTION_MSG = '系统异常，请稍后再试！'

// 请求接口的方式
export const REQUEST_METHOD_GET = 'get'
export const REQUEST_METHOD_POST = 'post'

export const API_APP_ID = '0000000000'

export const ELEMENT_POSTION_MAP = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  FIXED: 'fixed',
}

export const ACT_URL = 'http://localhost:3000'

// 待替换
export const ACP_UED_APPID = '00000000000'
export const ACP_UED_VERSION = 'v1.0.0'

const formatTime = time => {
  return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : '--'
}

const fromatPublishStatus = status => {
  switch (status) {
    case 0: return '未发布';
    case 1: return '发布成功';
    case 2: return '发布中';
    case 3: return '发布失败';
  }
  return
}

export const tabOptions = [
  { name: 'first', label: '已上线项目' },
  { name: 'second', label: '未上线项目' }
]

export const projectListColumns = [
  { label: '项目ID', prop: 'projectId', minWidth: 130 },
  { label: '项目名称', prop: 'projectName', minWidth: 140 },
  { label: '项目描述', prop: 'projectDesc', minWidth: 200 },
  { label: '创建人', prop: 'createByName', minWidth: 100 },
  {
    label: '项目开始时间',
    prop: 'projectStartTime',
    minWidth: 120,
    formatter: row => formatTime(row.projectStartTime)
  },
  {
    label: '项目结束时间',
    prop: 'projectEndTime',
    minWidth: 120,
    formatter: row => formatTime(row.projectEndTime)
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 120,
    formatter: row => formatTime(row.updateTime)
  },
  { label: '操作', minWidth: 240, type: 'action' }
]
export const projectUnlineListColumns = [
  { type: 'selection', width: 55 },
  { label: '项目ID', prop: 'projectId', minWidth: 130 },
  { label: '项目名称', prop: 'projectName', minWidth: 140 },
  { label: '项目描述', prop: 'projectDesc', minWidth: 200 },
  { label: '创建人', prop: 'createByName', minWidth: 100 },
  {
    label: '项目开始时间',
    prop: 'projectStartTime',
    minWidth: 120,
    formatter: row => formatTime(row.projectStartTime)
  },
  {
    label: '项目结束时间',
    prop: 'projectEndTime',
    minWidth: 120,
    formatter: row => formatTime(row.projectEndTime)
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 120,
    formatter: row => formatTime(row.updateTime)
  },
  {
    label: '发布状态',
    prop: 'publishStatus',
    minWidth: 80,
    formatter: row => fromatPublishStatus(row.publishStatus)
  },
  { label: '操作', minWidth: 270, type: 'action' }
]

export const projectOnlineListColumns = [
  { type: 'selection', width: 55 },
  { label: '项目ID', prop: 'projectId', minWidth: 150 },
  { label: '项目名称', prop: 'projectName', minWidth: 140 },
  { label: '项目描述', prop: 'projectDesc', minWidth: 200 },
  { label: '创建人', prop: 'createByName', minWidth: 100 },
  {
    label: '项目开始时间',
    prop: 'projectStartTime',
    minWidth: 130,
    formatter: row => formatTime(row.projectStartTime)
  },
  {
    label: '项目结束时间',
    prop: 'projectEndTime',
    minWidth: 130,
    formatter: row => formatTime(row.projectEndTime)
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 130,
    formatter: row => formatTime(row.updateTime)
  },
  {
    label: '发布状态',
    prop: 'publishStatus',
    minWidth: 80,
    formatter: row => fromatPublishStatus(row.publishStatus)
  },
  { label: '操作', minWidth: 200, type: 'action' }
]

export const thirdProjectListColumns = [
  { label: '项目ID', prop: 'projectId', minWidth: 150 },
  { label: '项目名称', prop: 'projectName', minWidth: 140 },
  { label: '项目url', prop: 'projectUrl', minWidth: 200 },
  { label: '创建人', prop: 'createByName', minWidth: 100 },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 140,
    formatter: row => formatTime(row.updateTime)
  },

]

export const projectTypeOptions = [
  { label: '运营活动', value: 1 },
  { label: '运营弹窗', value: 3 },
  { label: '第三方活动', value: 2 }
]

export const projectO2OTypeOptions = [
  { label: 'landing', value: 1 },
]

export const publishStatusTenantIdList = ['o2o', 'bg', 'paizg'];
export const tenantInfo = {
  paizg: {
    type: 3,
    offlineDomain: 'xxx.xxx.com'
  },
};
export const API_DOMAIN_URL = 'http://xxx.xxx.com'

export const logListColumns = [
  { label: '项目ID', prop: 'projectId', minWidth: 120 },
  { label: '项目编号', prop: 'preId', minWidth: 120 },
  { label: '发布人', prop: 'publisherName', minWidth: 120 },
  { label: '发布时间', prop: 'publishTime', minWidth: 200 },
]

// 神笔
export const tabOptionsV2 = [
  { name: 'first', label: '已上线项目' },
  { name: 'second', label: '未上线项目' },
]
export const projectTypeOptionsV2 = [
  { label: '落地页', value: 100 },
  { label: '弹窗', value: 102 },
  { label: '资源位', value: 101 },
]
export const projectListColumnsV2 = [
  { label: '项目ID', prop: 'projectId', minWidth: 130 },
  { label: '项目名称', prop: 'projectName', minWidth: 140 },
  {
    label: '版本数量',
    prop: 'itemsCount',
    minWidth: 100,
    formatter: row => itemsCountFormatter(row)
  },
  { label: '项目描述', prop: 'projectDesc', minWidth: 200 },
  {
    label: '创建时间',
    prop: 'createTime',
    minWidth: 120,
    formatter: row => formatTime(row.createTime)
  },
  { label: '创建人', prop: 'createByName', minWidth: 100 },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 120,
    formatter: row => formatTime(row.updateTime)
  },
  { label: '操作', minWidth: 220, type: 'action' }
]
export const resourceTypeOptions = [
  { label: '首页资源位', value: 0 },
  { label: '精选活动', value: 1 },
  { label: '了解我们', value: 2 },
  { label: '底部活动', value: 3 },
]
// 版本数量 基础项目没有版本概念，展示 /
export const itemsCountFormatter = row => {
  return row.projectTypeTag === 0 ? '/' : row.itemsCount;
}

// 调用对应华为云存储Bucket的appid
export const bucketAppId = '1000004917';
export const bucketKey = 'file11';