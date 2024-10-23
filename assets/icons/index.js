// requires and returns all modules that match
import Vue from 'vue';
import SvgIcon from '../../common/foundation/base/SvgIcon.vue';

Vue.component('SvgIcon', SvgIcon);
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
