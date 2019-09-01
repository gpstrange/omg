<template>
  <div id="add-feed">
    <h3 align="center">Choose an unique Group Name!</h3>
    <form>
      <md-field>
        <label style="font-size: 12px">Group Name</label>
        <md-input v-model="group"></md-input>
      </md-field>
      <!-- <md-field>
        <label style="font-size: 12px">City</label>
        <md-input v-model="city"></md-input>
      </md-field> -->
      <div align="center">
        <md-button v-on:click="onSubmit" :disabled="group ? false : true" class="md-accent md-raised">
          Submit
        </md-button>
      </div>
    </form>
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
    group: null,
    showSnackbar: false,
    errMessage: ''
  }),
  methods: {
    onSubmit (event) {
      const payload = {
        message: 'The Group Created',
        createdAt: new Date()
      }
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/group', {name: this.group}, options).then((res) => {
        payload.groupId = res.data._id
        localStorage.setItem('groupId', res.data._id)
        axios.post(URL + '/gossip', payload, options).then(res => {
          this.$router.push('home')
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