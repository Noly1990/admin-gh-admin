import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Setting from '@/subpages/Setting'
import Mine from '@/subpages/Mine'
import Overview from '@/subpages/Overview'

import Users from '@/subpages/Users'
import Payinfo from '@/subpages/Payinfo'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/',
        name: 'Overview',
        component: Overview,
        meta:{
          requireAuth:true
        }
      },
      {
        path: '/index/mine',
        name: 'Mine',
        component: Mine,
        meta:{
          requireAuth:true
        }
      },
      {
        path: '/index/setting',
        name: 'Setting',
        component: Setting,
        meta:{
          requireAuth:true
        }
      },
      {
        path: '/index/payinfo',
        name: 'Payinfo',
        component: Payinfo,
        meta:{
          requireAuth:true
        }
      },
      {
        path: '/index/users',
        name: 'Users',
        component: Users,
        meta:{
          requireAuth:true
        }
      }
    ],
    meta:{
      requireAuth:true
    }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
