import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify)
Vue.config.productionTip = false
const config = require('./config')
firebase.initializeApp(config);



new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    
  },
}).$mount('#app')
