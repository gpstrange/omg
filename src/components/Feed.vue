<template>
  <div class="page-container" style="padding-top: 30px">
    <md-card v-for="(item, index) in gossips" style="margin: 0px; margin-bottom: 20px" :key="index">
    <md-card-header style="padding: 8px 14px 3px;">
      <div v-if="username && username !== item.username" style="font-size: 20px; font-weight: 500">
        {{item.username}}
      </div>
      <div v-if="username && username === item.username" style="color: #64dd17; font-size: 20px; font-weight: 500">
        You
      </div>
    </md-card-header>

    <md-card-content style="padding-bottom: 10px">
        {{item.message}}
    </md-card-content>
    <div class="md-subhead" style="margin-left: 16px">
      {{item.likesNumber}} likes - {{item.commentsCount}} Comments
    </div>
    <hr style="margin: 5px 7px; margin-bottom: 0px; border-top: 1px solid #ccc;">
    <md-card-actions style="justify-content: space-between;">
      <div>
        <md-button v-if="item.userLiked" v-on:click="unlike(item, index)" class="md-accent" style="margin-right: 5px">
          <span style="display:flex; align-items: center">
            <i class="material-icons" style="margin-right: 5px">thumb_up</i>
            Liked
          </span>
        </md-button>
        <md-button v-if="!item.userLiked" v-on:click="like(item, index)" class="md-accent" style="margin-right: 5px">
          <span style="display:flex; align-items: center">
            <i class="material-icons-outlined" style="margin-right: 5px">thumb_up</i>
            Like
          </span>
        </md-button>
      </div>
      <div>
        <md-button class="md-primary" v-on:click="showComments(item)">
          <span style="display:flex; align-items: center">
            <i class="material-icons-outlined" style="margin-right: 5px">comment</i>
            Comment
          </span>
        </md-button>
      </div>
      <div>
        <md-button class="md-primary" v-on:click="share(item)">
          <span style="display:flex; align-items: center">
            <i class="material-icons-outlined" style="margin-right: 5px">reply</i>
            share
          </span>
        </md-button>
      </div>
    </md-card-actions>
    </md-card>
    <div>
      <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showSnackbar" md-persistent>
      <span>{{errMessage}}</span>
    </md-snackbar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { URL } from '../constants'

export default {
  data: () => ({
    gossips: [],
    showSnackbar: false,
    errMessage: '',
    groupName: '',
    username: ''
  }),
  created () {
    const groupId = localStorage.getItem('groupId')
    if (!groupId) {
      this.$router.back()
      return
    }
    const token = localStorage.getItem('token')
    if (!token) {
      this.errMessage = 'Session Expired, Please login again!'
      localStorage.clear()
      this.$router.push({path: 'login'})
      return
    }
    const user = JSON.parse(localStorage.getItem('user'))
    this.username = user.username
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get(URL + '/get-gossip/' + groupId, options)
      .then(res => {
        this.gossips = res.data
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
  methods: {
    showComments (gossip) {
      this.$router.push({path: 'comments', query: {gossipId: gossip._id}})
    },
    like (item, i) {
      const payload = {
        gossipId: item._id
      }
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/like-gossip', payload, options)
        .then(res => {
          item.userLiked = true
          item.likesNumber = item.likesNumber + 1
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
    unlike (item, i) {
      const payload = {
        gossipId: item._id
      }
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/unlike-gossip', payload, options)
        .then(res => {
          item.userLiked = false
          item.likesNumber = item.likesNumber - 1
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
    share (gossip) {
      console.log('https://ohmygossip.in/#/comments?gossipId=' + gossip._id)
      if (!('share' in window.navigator)) {
        this.errMessage = 'Sorry. This feature is only available in Chrome for Android'
        return
      }
      window.navigator.share({
        title: 'OMG!',
        text: 'Checkout OMG!, world`s first Gossiping platform! -- It rocks!',
        url: 'https://ohmygossip.in/#/comments?gossipId=' + gossip._id
      })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error))
    }
  }
}
</script>