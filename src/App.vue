<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>

          <router-link to='/chat' tag="button">
              <v-btn icon rounded color="black">
                  <v-icon>mdi-forum</v-icon>
              </v-btn >
          </router-link>

          <DropDown />
          
    </v-app-bar>
    <v-main>
      <!-- <AppLogin /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import DropDown from './components/DropDown.vue'
import userAuth from './components/auth/auth.js'
// import firebase from 'firebase'
// import 'firebase/auth'
export default {
  name: 'App',
  mixins: [ userAuth ],
  components: {
     DropDown
  },
  data: () => ({
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
      isLogged: false,
  })
};
</script>
