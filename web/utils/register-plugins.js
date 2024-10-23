import date from './date'
import currency from './currency'
import VueClipboard from 'vue-clipboard2'

export const registerPlugins = Vue => {
  Vue.use(date)
  Vue.use(currency)
  Vue.use(VueClipboard)
}
