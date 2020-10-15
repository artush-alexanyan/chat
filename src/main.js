import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAY_ekc5_-9Y-QvDtsOegWSQ2LXiJZpsrY",
  authDomain: "chat-app-faf9a.firebaseapp.com",
  databaseURL: "https://chat-app-faf9a.firebaseio.com",
  projectId: "chat-app-faf9a",
  storageBucket: "chat-app-faf9a.appspot.com",
  messagingSenderId: "218089494190",
  appId: "1:218089494190:web:4b363dae665736086dbf3f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
