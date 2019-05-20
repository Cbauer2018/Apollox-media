import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAB0W19cf5MVHZcpGhvWH-_AJAMeJad3Hc",
      authDomain: "apollox-media.firebaseapp.com",
      databaseURL: "https://apollox-media.firebaseio.com",
      projectId: "apollox-media",
      storageBucket: "apollox-media.appspot.com",
      messagingSenderId: "1080630559415",
      appId: "1:1080630559415:web:29d4ecb17fcf38a3"
    })
    
  },
}).$mount('#app')
