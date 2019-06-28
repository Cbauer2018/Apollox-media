import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify/lib';
import AlertCmp from './Shared/Alert'
import responsive from 'vue-responsive'
Vue.use(responsive)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
const config = require('./config')
firebase.initializeApp(config);
var infiniteloading =  require('vue-infinite-loading');
var infiniteScroll = require('vue-infinite-scroll')
Vue.use(infiniteloading)
Vue.use(infiniteScroll)
var Prevue = require('link-prevue')
Vue.use(Prevue)



new Vue({
  router,
  store,
  render: h => h(App),
  

  created() {
   
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.$store.dispatch('autoSignIn', user)  
        this.$store.dispatch('loadFollowingPosts', {index:2}) 
      }
    })
    
    this.$store.dispatch('loadPromotedPosts', {index:2})
  },
}).$mount('#app')
