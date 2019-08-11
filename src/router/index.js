import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import AddFeed from '@/components/Add-Feed'
import SelectCollege from '@/components/Select-College'
import AddCollege from '@/components/Add-College'
import Auth from '@/components/Auth'
import Login from '@/components/Login'
import Comment from '@/components/Comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signup',
      component: Auth
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/college',
      name: 'College',
      component: SelectCollege
    },
    {
      path: '/home',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/add-feed',
      name: 'Add-Feed',
      component: AddFeed
    },
    {
      path: '/add-college',
      name: 'Add-College',
      component: AddCollege
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comment
    }
  ]
})
