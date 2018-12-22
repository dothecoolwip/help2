import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Meetups from '@/components/Meetup/meetups'
import CreateMeetup from '@/components/Meetup/createMeetup'
import profile from '@/components/User/profile'
import signup from '@/components/User/signup'
import signin from '@/components/User/signin'
import Meetup from '@/components/Meetup/meetup'
import test from '@/components/Testdate'
import authGuard from './authGuard';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: authGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      beforeEnter: authGuard
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
      // eslint-disable-next-line
    },
  ],

  // delete if it doesnt work on firebase
  mode: 'history'
})
