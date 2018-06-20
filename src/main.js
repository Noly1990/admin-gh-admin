// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
import store from './store'
import F2 from '@antv/f2'
 

Vue.config.productionTip = false

//router导航守卫

router.beforeEach((to, from, next) => {
  
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    let token=window.sessionStorage.getItem('token') || store.state.token;
      if (token) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token=window.sessionStorage.getItem('token')||store.state.token;
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

// http response 拦截器

axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:  
                  // 返回 401 清除token信息并跳转到登录页面
                  store.dispatch('UserLoginOut');
                  router.replace({
                      path: '/',
                    //   query: {redirect: router.currentRoute.fullPath}
                  })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
  

axios.defaults.baseURL = 'http://long.lxxiyou.cn'

Vue.use(Vuex)

Vue.use(VueAxios, axios)

Vue.use(iView)

Vue.prototype.F2 = F2

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
