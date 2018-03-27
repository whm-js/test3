// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
import { LoadingPlugin, AlertPlugin, ToastPlugin, dateFormat } from 'vux'
import store from './store/store'

Vue.use(ToastPlugin, {position: 'top'})

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.$dateFormat = Vue.prototype.$dateFormat = dateFormat;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
