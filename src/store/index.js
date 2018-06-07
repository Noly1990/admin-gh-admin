import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
        token:'',
        username:'',
        isLogin:false
  },
  actions: {
    UserLogin({commit},data){
      commit('Login',data);
    },
    UserLoginOut({commit}){
      commit('LoginOut');
    }
  },
  mutations: {
    Login(state,data){
      state.token=data.token;
      state.username=data.username;
      state.isLogin=true;
      window.sessionStorage.setItem('token',data.token);
      window.sessionStorage.setItem('username',data.username);
    },
    LoginOut(state){
      state.token='';
      state.isLogin=false;
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('username');
    }
  },
  getters: {
    getToken:function(state){
        return state.token
    }
  },  
  modules: {
    
  }
})

export default store