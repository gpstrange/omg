<template>
  <div class="page-container">
    <md-card v-for="(item, index) in gossips" style="margin-bottom: 20px" :key="index">
    <md-card-header>
      <md-avatar class="md-avatar-icon md-medium md-accent">
        <md-icon>person_outline</md-icon>
      </md-avatar>

      <div class="md-title">{{item.username}}</div>
      <div class="md-subhead">Coimbatore, India</div>
    </md-card-header>

    <md-card-content>
        {{item.message}}
    </md-card-content>

    <md-card-actions md-alignment="right">
      <md-button v-if="item.userLiked" v-on:click="unlike(item, index)" class="md-accent md-raised" style="margin-right: 5px">
        <md-icon>thumb_up</md-icon>
        {{item.likesNumber}}
      </md-button>
      <md-button v-if="!item.userLiked" v-on:click="like(item, index)" class="md-accent" style="margin-right: 5px">
        <md-icon>thumb_up</md-icon>
        {{item.likesNumber}}
      </md-button>
      <md-button class="md-primary" v-on:click="showComments(item)">
        <md-icon>add_comment</md-icon>
        View Comments
      </md-button>
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
    errMessage: ''
  }),
  created () {
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
    axios.get(URL + '/get-gossip/' + groupId, options)
      .then(res => {
        this.gossips = res.data
      }).catch((err) => {
        if (err.message) {
          this.errMessage = err.message
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
          if (err.message) {
            this.errMessage = err.message
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
          if (err.message) {
            this.errMessage = err.message
          } else {
            this.errMessage = 'Something went wrong'
          }
          this.showSnackbar = true
        })
    }
  }
}
</script>