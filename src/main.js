import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { EmojiPicker } from 'vue-emoji-picker'
Vue.use(EmojiPicker)

Vue.use(EmojiPicker)


const firebaseConfig = {
  apiKey: "AIzaSyAIiSHXoEYu_UsKDEjG2pK3uW8YMKCFQh0",
  authDomain: "vuetify-6a36e.firebaseapp.com",
  databaseURL: "https://vuetify-6a36e.firebaseio.com",
  projectId: "vuetify-6a36e",
  storageBucket: "vuetify-6a36e.appspot.com",
  messagingSenderId: "644137798508",
  appId: "1:644137798508:web:0f5176fc2d8b6176fa4149"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
