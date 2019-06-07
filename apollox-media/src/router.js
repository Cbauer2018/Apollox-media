import Vue from 'vue'
import Router from 'vue-router'
import Promoted from './components/Promoted.vue'
import Following from './components/Following.vue'
import Post from './components/Post.vue'
import Recent from './components/Recent.vue'
import Store from './components/Store.vue'
import Profile from './components/Profile.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import ProfileEdit from './components/ProfileEdit.vue'
import Search from './components/Search.vue'


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
      path: '/Search/:keyword',
      name: 'Search',
      component: Search
    },
    {
      path: '/Following',
      name: 'Following',
      component: Following
    },
    {
      path: '/Post',
      name: 'Post',
      component: Post
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
      path: '/Profile/:uid',
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
    },
    {
      path: '/Profiles/Edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    }
  ],
  
})
