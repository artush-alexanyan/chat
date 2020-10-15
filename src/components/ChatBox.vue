<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container
          class="fill-height pa-0 "
        >
          <v-row class="no-gutters elevation-4">
            <v-col
              cols="12" sm="3"
              class="flex-grow-1 flex-shrink-0"
              style="border-right: 1px solid #0000001f;"
            >
              <v-responsive
                class="overflow-y-auto fill-height"
                height="200"
              >
                <v-list subheader>
                  <v-list-item-group>
                    <template>
                      <v-list-item>
                        <v-list-item-avatar color="grey lighten-1 white--text">
                            <v-avatar
                              color="primary"
                              rounded
                              size="56"
                              tile
                            > {{ userName }} </v-avatar>
                        </v-list-item-avatar>
                        <!-- <v-list-item-content>
                          <v-list-item-title/>
                          <v-list-item-subtitle />
                        </v-list-item-content> -->
                        <v-list-item-icon>
                          <v-icon color="green">
                            mdi-chat
                          </v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                      <v-divider/>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-responsive>
            </v-col>
            <v-col
              cols="auto"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-responsive
                class="overflow-y-hidden fill-height"
                height="500"
              >
                <v-card
                  flat
                  class="d-flex flex-column fill-height"
                >
                  <v-card-title>
                   {{ userFullName }} 
                  </v-card-title>
                  <v-card-text class="flex-grow-1 overflow-y-auto">
                    <p class="float-right user" v-if="isSent">Sending...</p>
                    <template v-for="msg in messages">
                      <div
                        :class="{ 'd-flex flex-row-reverse': msg.me }"
                        :key="msg.id"
                        v-if="!isSent"
                      >
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                             <span class="mt-3 ml-1"><strong> {{ msg.userName }} </strong></span>  
                            <v-hover
                              v-slot:default="{ hover }"
                            >                          
                              <v-chip
                                :color="msg.me ? 'primary' : 'blue'"
                                dark
                                style="height:auto;white-space: normal;"
                                class="pa-4 mb-2"
                                v-on="on"
                              >
                                {{ msg.content }}
                                <v-icon
                                  v-if="hover"
                                  small
                                >
                                  mdi-expand-more
                                </v-icon>
                              </v-chip>
                            </v-hover>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-btn icon color="red">
                                  <v-icon>
                                      mdi-delete
                                  </v-icon>
                              </v-btn>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </template>
                  </v-card-text>
                  <v-card-text class="flex-shrink-1">
                      <v-text-field
                        v-model="message"
                        type="text"
                        :placeholder="isSent ? 'sending...' : 'type a message...'"
                        no-details
                        outlined
                        append-outer-icon="mdi-send"
                        @click:append-outer="sendMessage"
                        hide-details
                        @keyup.enter="sendMessage"
                    />
                  </v-card-text>
                </v-card>
              </v-responsive>
            </v-col>
          </v-row>
        </v-container>
        </v-main>
    </v-app>
</div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/auth'

export default {
  name: 'ChatBox',
  data: () => {
    return {
      messages: [],
      userName: null,
      userFullName: null,
      message: '',
      isSent: false
    }
  },
  methods: {
    sendMessage () {
      console.log('test')
        firebase.auth().onAuthStateChanged(user => {
        if(this.message !== '' && user){
            firebase.firestore().collection('messages').doc().set({
                content: this.message,
                me: 'me',
                created_at: 'unknown date',
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                userName: this.userFullName
            })
            .then(doc => {
                console.log('Document created successfuly', doc)
                this.message = ''   
                this.messages = []
                this.getMessages()             
            })
        }          
        })
    },
  getMessages () {
    this.isSent = true
        firebase.firestore().collection('messages').orderBy("timestamp", "desc")
          .get()
          .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                  console.log('Messsages :', doc.data() )
                  console.log('Document :', doc)
                  this.messages.push(doc.data())
              })
              this.isSent = false
          })
  
  }

  },
  created () {
      this.getMessages()
      firebase.auth().onAuthStateChanged(user => {
          if(user){
              firebase.firestore().collection('userCollection').where('userId', "==", user.uid)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log('Name : ', doc.data().userName)
                        this.userFullName = doc.data().userName
                        let name = doc.data().userName.slice(0,1).toUpperCase()
                        this.userName = name
                    })
                })
          }
      })
  }
}
</script>

<style scoped>

</style>