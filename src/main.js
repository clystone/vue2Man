// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filters from './util/filters'

Vue.config.productionTip = false;

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

import axios1 from './config/axiosConfig';
Vue.prototype.$axios = axios1;

Vue.use(ElementUI);

Vue.prototype.imgUrlPre = 'http://10.10.10.135:8081/images/chengyu/';
Vue.prototype.imgUrlStar = 'http://10.10.10.135:8088/images/star/';
// Vue.prototype.imgUrlPre = 'https://wordgame.jizui.top/cy/images/chengyu/';
// Vue.prototype.imgUrlStar = 'https://wordgame.jizui.top/mx/images/star/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
