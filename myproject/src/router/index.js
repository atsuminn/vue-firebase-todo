import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Appform from '@/components/Appform'
import Createform from '@/components/Createform'
import Top from '@/components/Top'
import Home from '@/components/Home'
import Navi from '@/components/Navi'
import Teacher from '@/components/Teacher'
import Reportform from '@/components/Reportform'
import Makeform from '@/components/Makeform'

import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'Top'
    },
    {
      path: '/',
      name: Top,
      component: Top
    },
    {
      path: '/home',
      name: Home,
      component: Home,
      children: [
        {
          path: '',
          component: Navi
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
      meta: { requiresAuth: true }
    },
  	{
  		path: '/appform',
  		name: 'Appform',
  		component: Appform,
      children: [
        {
          path: '',
          component: Createform
        }
      ],
  		meta: { requiresAuth: true }
    },
    {
  		path: '/reportform',
  		name: 'Reportform',
  		component: Reportform,
      children: [
        {
          path: '',
          component: Makeform
        }
      ],
  		meta: { requiresAuth: true }
  	},
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})
*/


router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router