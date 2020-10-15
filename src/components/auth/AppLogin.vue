<template>
  <div id="app">
    <v-app id="inspire">
      <Loader v-if="isLoaded" />
      <v-main v-if="!isLoaded">
        <v-container
          fluid
          fill-height
        >
          <v-layout
            align-center
            justify-center
          >
            <v-flex
              xs12
              sm8
              md4
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Login"
                      name="login"
                      prepend-icon="mdi-email"
                      type="email"
                      v-model="user.email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="user.password"
                    ></v-text-field>
                  </v-form>
                  <p class="mr-5" style="color: red;" v-if="error.length > 0"> {{ error }} </p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import userAuth from './auth.js'
import Loader from '../Loader.vue'

export default {
  name: 'AppLogin',
  mixins: [ userAuth ],
  components: { Loader }
}
</script>