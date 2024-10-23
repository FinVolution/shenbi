import currency from 'currency.js';

const CNY = value => currency(value, { symbol: '￥' });
const CNY_WITHOUT_SYMBOl = value => currency(value, { symbol: '' });

export default {
  install(Vue) {
    Vue.filter('currencyFormat', (value, hasSymbol = true) => {
      const formatter = hasSymbol ? CNY : CNY_WITHOUT_SYMBOl;
      return formatter(value).format();
    });
  },
};
