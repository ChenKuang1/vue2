import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

//header携带token
axios.interceptors.request.use(
  config => {
      config.headers.token = window.sessionStorage.getItem('token')
      return config;
  }
)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://www.api.com/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
