import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import AddFeed from '@/components/Add-Feed'
import SelectCollege from '@/components/Select-College'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ]
})
