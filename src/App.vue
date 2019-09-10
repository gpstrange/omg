<template>
  <div id="app" style="background-color: #ccc">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span class="md-title">
          <md-avatar>
            <img src="static/img/logo.png" alt="Avatar">
          </md-avatar>
          Oh My Gossip!!
        </span>
        <div class="md-toolbar-section-end" v-if="path && (path === 'add-feed' || path === 'comments' || path === 'home')">
          <router-link to="/add-feed">
            <md-button class="md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
          <md-menu>
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>

            <md-menu-content>
              <md-menu-item v-on:click="exitGroup()">
                <md-icon style="margin: 0px; margin-right: 10px">exit_to_app</md-icon>
                Exit Group
              </md-menu-item>
              <md-menu-item v-on:click="logout()">
                <md-icon style="margin: 0px; margin-right: 10px">power_settings_new</md-icon>
                Logout
              </md-menu-item>
            </md-menu-content>
          </md-menu>
          <!-- <router-link v-if="!college" to="/add-college">
            <md-button class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </router-link>-->
        </div>
        <div v-if="path && (path === 'add-feed' || path === 'comments' || path === 'home')" class="md-elevation-4" style=" position: absolute; top: 56px; width: 100%; background-color: #64dd17; display: flex; justify-content: center; z-index: 1; margin-left: -8px; color: black; height: 45%;font-size: 16px; align-items: center;">
          {{groupName}}
        </div>
      </md-app-toolbar>

      <md-app-content style="background-color: rgb(230, 230, 230)">
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
    errMessage: '',
    groupName: ''
  }),
  watch: {
    $route (to, from) {
      this.path = to.path.replace('/', '')
    }
  },
  mounted () {
    this.path = this.$route.path.replace('/', '')
    if (this.path === 'login' || this.path === 'add-college' || this.path === 'college') {
      return
    }
    const token = localStorage.getItem('token')
    if (!token) {
      this.errMessage = 'Session Expired, Please login again!'
      localStorage.clear()
      this.$router.push({path: 'login'})
      return
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const groupId = localStorage.getItem('groupId')
    axios.get(URL + '/group/' + groupId, options)
      .then(res => {
        this.groupName = res.data.name
      }).catch((err) => {
        console.log(err)
      })
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
          if (err.response && err.response.data && err.response.data.message) {
            this.errMessage = err.response.data.message
            if (err.response.data.code === 'TOKEN_EXPIRED') {
              localStorage.clear()
              this.$router.push({path: 'login'})
            }
          } else {
            this.errMessage = 'Something went wrong'
          }
          this.showSnackbar = true
        })
    },
    logout () {
      localStorage.clear()
      this.$router.push('login')
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
  #app {
    height:
  }
  .md-app {
    border: 1px solid rgba(#000, .12);
  }
  .md-list-item-content {
    justify-content: flex-start;
  }
</style>
