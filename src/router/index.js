import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
import AddFeed from '@/components/Add-Feed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
