

const show_log = process.env.VUE_APP_SHOW_SENSOR_LOG === Y;
const merge = target => {
  // eslint-disable-next-line
for (let i = 1, j = arguments.length; i < j; i++) {
  // eslint-disable-next-line
  const source = arguments[i] || {}
      for (let prop in source) {
          if (source.hasOwnProperty(prop)) {
              let value = source[prop];
              if (value !== undefined) {
                  target[prop] = value;
              }
          }
      }
  }
  return target;
};
const isEmpty = (val, isZeroNull = false) => {
  return val === '' || val === null || val === undefined || (isZeroNull && val === 0);
};
const getUserAgent = () => {
  const u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    miniProgram: u.indexOf('miniProgram') > -1, // 从微信7.0.0开始，可以通过判断userAgent中包含miniProgram字样来判断小程序web-view环境。 2019-07-09 15:11:46
    qq: u.indexOf('QQ') > -1, // 是否QQ
    mi: u.indexOf('XiaoMi') > -1, // 是否小米,
    quick: u.indexOf('hap') > -1 // 是否快应用
  }
}
const ua = getUserAgent();
const Y = 'y'
const defaultOptions = {
  heatmap_url: ``,
  sdk_url: ``,
  name: 'SB',
  server_url: '',
  show_log
};

const getSaInstance = para => {
  const p = para.sdk_url;
  const n = para.name;
  const w = window;
  const d = document;
  const s = 'script';
  let x = null;
  let y = null;

  w['sensorsDataAnalytic201505'] = n;

  w[n] =
    w[n] ||
    function(a) {
      return function() {
        (w[n]._q = w[n]._q || []).push([a, arguments]);
      };
    };

  const ifs = [
    'track',
    'quick',
    'register',
    'registerPage',
    'registerOnce',
    'clearAllRegister',
    'trackSignup',
    'trackAbtest',
    'setProfile',
    'setOnceProfile',
    'appendProfile',
    'incrementProfile',
    'deleteProfile',
    'unsetProfile',
    'identify',
    'login',
    'logout',
    'trackLink',
    'clearAllRegister'
  ];

  for (let i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s);
    y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }

  return w[n];
};
