<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span class="md-title">🤯 Oh My Gossip!!</span>
        <div class="md-toolbar-section-end" v-if="path && path !== 'login' && path !== 'college'
        && path !== 'add-college'">
          <md-button class="md-icon-button" v-on:click="exitGroup()">
            <md-icon>exit_to_app</md-icon>
          </md-button>
          <router-link to="/add-feed">
            <md-button class="md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
          <!-- <router-link v-if="!college" to="/add-college">
            <md-button class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </router-link>-->
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
    <div>
      <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{errMessage}}</span>
    </md-snackbar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { URL } from './constants'

export default {
  name: 'app',
  data: () => ({
    path: '',
    showSnackbar: false,
    errMessage: ''
  }),
  watch: {
    $route (to, from) {
      this.path = to.path.replace('/', '')
    }
  },
  mounted () {
    this.path = this.$route.path.replace('/', '')
  },
  methods: {
    exitGroup () {
      const groupId = localStorage.getItem('groupId')
      if (!groupId) {
        this.$router.back()
        return
      }
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/exit-group', {}, options)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data.user))
          localStorage.removeItem('groupId')
          this.$router.push('/college')
          // item.userLiked = true
          // item.likesNumber = item.likesNumber + 1
          // this.gossips[i] = res.data.gossip
        }).catch((err) => {
          if (err.message) {
            this.errMessage = err.message
          } else {
            this.errMessage = 'Something went wrong'
          }
          this.showSnackbar = true
        })
    }
  }
  // data () {
  //   return {
  //     college: ''
  //   }
  // },
  // beforeCreate () {
  //   this.college = localStorage.getItem('college')
  // }
}
</script>

<style>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }
</style>
