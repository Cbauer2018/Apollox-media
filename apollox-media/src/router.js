import Vue from 'vue'
import Router from 'vue-router'
import Promoted from './components/Promoted.vue'
import Following from './components/Following.vue'
import addPost from './components/addPost.vue'
import Recent from './components/Recent.vue'
import Store from './components/Store.vue'
import Profile from './components/Profile.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Promoted',
      component: Promoted
    },
    {
      path: '/Following',
      name: 'Following',
      component: Following
    },
    {
      path: '/Post',
      name: 'addPost',
      component: addPost
    },
    {
      path: '/Recent',
      name: 'Recent',
      component: Recent
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ],
  
})
