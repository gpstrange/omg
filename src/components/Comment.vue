<template>
  <div class="page-container" style="padding-top: 30px">
    <md-card style="margin: 0px; margin-bottom: 20px">
      <md-card-header style="padding: 8px 14px 3px;">
        <div v-if="username && username !== gossip.username" style="font-size: 20px; font-weight: 500">
          {{gossip.username}}
        </div>
        <div v-if="username && username === gossip.username" style="color: #64dd17; font-size: 20px; font-weight: 500">
          You
        </div>
      </md-card-header>

      <md-card-content style="padding-bottom: 0px">
          {{gossip.message}}
      </md-card-content>

    <md-card-actions md-alignment="left" style="padding-top: 0px">
      <md-field>
        <md-input placeholder="Enter comment" style="margin: 0 8px" v-model="newComment"></md-input>
      </md-field>
      <md-button class="md-icon-button md-accent md-raised" v-on:click="onSubmit" style="margin-left: 10px;">
        <md-icon>send</md-icon>
      </md-button>
    </md-card-actions>
    </md-card>
    <h2 v-if="comments && comments.length" style="margin-left: 20px; font-family: sans-serif;">
      Comments
    </h2>
    <md-card v-for="(item, index) in comments" :key="index" style="margin-bottom: 20px">
        <md-card-header style="padding: 8px 14px 3px;">
        <div v-if="username && username !== item.username" style="font-size: 20px; font-weight: 500">
          {{item.username}}
        </div>
        <div v-if="username && username === item.username" style="color: #64dd17; font-size: 20px; font-weight: 500">
          You
        </div>
      </md-card-header>

        <md-card-content style="padding-bottom: 8px">
            {{item && item.message}}
        </md-card-content>
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
    gossip: {},
    comments: [],
    newComment: '',
    showSnackbar: false,
    errMessage: '',
    username: ''
  }),
  created () {
    const showErr = (err) => {
      if (err.message) {
        this.errMessage = err.message
        if (err.response.data.code === 'TOKEN_EXPIRED') {
          localStorage.clear()
          this.$router.push({path: 'login'})
        }
      } else {
        this.errMessage = 'Something went wrong'
      }
      this.showSnackbar = true
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
    const user = JSON.parse(localStorage.getItem('user'))
    this.username = user.username
    const gossipId = this.$route.query.gossipId
    axios.get(URL + '/gossip/' + gossipId, options)
      .then(res => {
        this.gossip = res.data
      }).catch(e => showErr(e))
    axios.get(URL + '/comment?query={"gossipId":"' + gossipId + '"}&sort=-createdAt', options)
      .then(res => {
        this.comments = res.data
      }).catch(e => showErr(e))
  },
  methods: {
    onSubmit () {
      if (!this.newComment) {
        return
      }
      const payload = {
        message: this.newComment,
        gossipId: this.gossip._id
      }
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/comment', payload, options)
        .then(res => {
        // this.comments = res.data
          axios.get(URL + '/comment?query={"gossipId":"' + this.gossip._id + '"}&sort=-createdAt', options)
            .then(res => {
              this.comments = res.data
              this.newComment = ''
            })
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
    }
  }
}
</script>
