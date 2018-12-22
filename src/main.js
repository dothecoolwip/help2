// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import AlertCmp from './components/Shared/alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.component('app-alert', AlertCmp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // firebase
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBhlnZryjxDPvg5AhmyLAe_0hU6r-nF7NY',
      authDomain: 'hikershangout.firebaseapp.com',
      databaseURL: 'https://hikershangout.firebaseio.com',
      projectId: 'hikershangout',
      storageBucket: 'gs://hikershangout.appspot.com/',
    })
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadHangouts')

  }
})
