import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'AppLogin',
    component: () => import(/* webpackChunkName: "login" */ '../components/auth/AppLogin')
  },  
  {
    path: '/register',
    name: 'AppRegister',
    component: () => import(/* webpackChunkName: "register" */ '../components/auth/AppRegister')
  } ,
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "register" */ '../components/test.vue')
  } , 
  {
    path: '/chat',
    name: 'ChatBox',
    component: () => import(/* webpackChunkName: "chat" */ '../components/ChatBox'),
    meta: {
      requiresAuth: true
    }    
  }     
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({ path: '/' });
    }
  }
  next();
})

export default router
