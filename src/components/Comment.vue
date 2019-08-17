<template>
  <div class="page-container">
    <md-card style="margin-bottom: 20px">
    <md-card-header>
      <md-avatar class="md-avatar-icon md-medium md-accent">
        <md-icon>person_outline</md-icon>
      </md-avatar>

      <div class="md-title">{{gossip && gossip.username}}</div>
      <div class="md-subhead">Coimbatore, India</div>
    </md-card-header>

    <md-card-content>
        {{gossip.message}}
    </md-card-content>

    <md-card-actions md-alignment="left">
      <md-field>
        <md-input placeholder="Enter comment" style="margin: 0 8px" v-model="newComment"></md-input>
      </md-field>
      <md-button class="md-icon-button md-accent md-raised" v-on:click="onSubmit" style="margin-left: 10px;">
        <md-icon>send</md-icon>
      </md-button>
    </md-card-actions>
    </md-card>
    <md-card v-for="(item, index) in comments" :key="index" style="margin-bottom: 20px">
        <md-card-header>
            <md-avatar class="md-avatar-icon md-medium md-accent">
                <md-icon>person_outline</md-icon>
            </md-avatar>

            <div class="md-title">{{item && item.username}}</div>
            <div class="md-subhead">Coimbatore, India</div>
        </md-card-header>

        <md-card-content>
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
    errMessage: ''
  }),
  beforeCreate () {
    const showErr = (err) => {
      if (err.message) {
        this.errMessage = err.message
      } else {
        this.errMessage = 'Something went wrong'
      }
      this.showSnackbar = true
    }
    const token = localStorage.getItem('token')
    if (!token) {
      errMessage = 'Session Expired, Please login again!'
      localStorage.clear()
      this.$router.push({path: 'login'})
      return
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
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
          console.log(err)
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
