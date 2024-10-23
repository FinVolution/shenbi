import {
  Button,
  Overlay,
  Toast,
  Field,
  Popup,
  Icon,
  List,
  NoticeBar,
  Swipe,
  SwipeItem,
  Tabs,
  Tab,
  Cell,
  NumberKeyboard,
  Picker,
  Progress,
  ActionSheet,
  Cascader,
} from 'vant'

const registerVenderComponents = Vue => {
  Vue.use(Button)
  Vue.use(Overlay)
  Vue.use(Toast)
  Vue.use(Field)
  Vue.use(Popup)
  Vue.use(Icon)
  Vue.use(List)
  Vue.use(NoticeBar)
  Vue.use(Swipe)
  Vue.use(SwipeItem)
  Vue.use(Tab)
  Vue.use(Cell)
  Vue.use(NumberKeyboard)
  Vue.use(Picker)
  Vue.use(Progress)
  Vue.use(ActionSheet)
  Vue.use(Cascader)
  Vue.use(Tabs)
}

// { tag: '', vue: someComponent }
const customComponents = [];

const registerCustomComponents = (Vue, components) => {
    components.map(component => {
        return Vue.component(component.tag, component.vue);
    });
};

export const registerComponents = Vue => {
    registerCustomComponents(Vue, customComponents);
    registerVenderComponents(Vue);
};
