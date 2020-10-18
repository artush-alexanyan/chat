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
                  <v-card-text>
                    <v-bnt icon @click="refresh">Refresh<v-icon color="green">mdi-refresh-circle</v-icon> </v-bnt>
                  </v-card-text>
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
                <div class="wrapper">
                  <emoji-picker @emoji="append" :search="search">
                    <div
                      class="emoji-invoker"
                      slot="emoji-invoker"
                      slot-scope="{ events: { click: clickEvent } }"
                      @click.stop="clickEvent"
                    >
                      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                      </svg>
                    </div>
                    <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                      <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
                        <div class="emoji-picker__search">
                          <input type="text" v-model="search" v-focus>
                        </div>
                        <div>
                          <div v-for="(emojiGroup, category) in emojis" :key="category">
                            <h5>{{ category }}</h5>
                            <div class="emojis">
                              <span
                                v-for="(emoji, emojiName) in emojiGroup"
                                :key="emojiName"
                                @click="insert(emoji)"
                                :title="emojiName"
                              >{{ emoji }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </emoji-picker>
                </div>            
          </v-row>
        </v-container>
        </v-main>
    </v-app>
</div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/auth'
import EmojiPicker from 'vue-emoji-picker'

export default {
  name: 'ChatBox',
  components: { EmojiPicker },
  data: () => {
    return {
      search: '',
      messages: [],
      userName: null,
      userFullName: null,
      message: '',
      isSent: false
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },  
  methods: {
    refresh () { 
      this.messages = [],
      this.getMessages()
    },
    append(emoji) {
      this.message += emoji
    },    
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
.wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: orange;
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>