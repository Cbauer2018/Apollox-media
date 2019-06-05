import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify/lib';
import AlertCmp from './Shared/Alert'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
const config = require('./config')
firebase.initializeApp(config);



new Vue({
  router,
  store,
  render: h => h(App),
  

  created() {
   
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.$store.dispatch('autoSignIn', user)   
      }
    })
    this.$store.dispatch('loadRecentPosts')
    this.$store.dispatch('loadPromotedPosts')
  },
}).$mount('#app')
