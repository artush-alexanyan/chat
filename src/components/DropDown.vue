<template>
  <div class="text-center">
    <div  v-if="!isLogged">
      <router-link to='/register' tag="button">
          <v-btn rounded color="green">
              Register
          </v-btn >
      </router-link>         
    </div>

    <v-menu offset-y     v-if="isLogged"> 
      <template v-slot:activator="{ on, attrs }">

       <v-btn
          color="black"
          dark
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>       

      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title @click="signout">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/auth'
import userAuth from '../components/auth/auth.js'

  export default {
    mixins: [ userAuth ],
    data: () => ({
      isLogged: false
    }),
  created () {
      firebase.auth().onAuthStateChanged(user => {
          if(user) {
            this.isLogged = true
          }else{
            this.isLogged = false
          }
      })
  }   
  }
</script>