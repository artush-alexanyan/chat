import firebase from 'firebase'
import 'firebase/auth'

const userAuth = {
    data: () => {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            error: [],
            isLoaded: false
        }
    },
    methods: {
      register () {
        this.isLoaded = true
          firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
                console.log('User : ', user)
                firebase.firestore().collection('userCollection').doc(user.user.uid).set({
                    userId: user.user.uid,
                    userName: this.user.name,
                    userEmail: this.user.email
                })
            })
            .then(() => {
                this.isLoaded = false
              this.$router.push({ name: 'ChatBox' })
              console.log('User doc created successfuly!')
              console.log('User sign in successfuly!')
          })            
      },
      login () {
          this.isLoaded = true
          firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
                this.isLoaded = false
                console.log('User logged in successfuly!', user)
                this.$router.push({ name: 'ChatBox' })
            })
            .catch(error => {
                this.error = error.message
            })
      },
      signout () {
          firebase.auth().signOut()
            .then(() => {
                this.$router.push({ name: 'AppLogin' })
                console.log('Signed out!')
            })
      }
    }
}

export default userAuth