<template>
  <div id="add-feed">
    <form>
      <md-field>
        <label style="font-size: 12px">OMG!!🤫</label>
        <md-textarea v-model="message"></md-textarea>
      </md-field>
      <md-button v-on:click="onSubmit" class="md-accent">
        Submit
      </md-button>
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
    message: '',
    showSnackbar: false,
    errMessage: ''
  }),
  beforeCreate () {
    const groupId = localStorage.getItem('groupId')
    if (!groupId) {
      this.$router.back()
    }
  },
  methods: {
    onSubmit (event) {
      const groupId = localStorage.getItem('groupId')
      const payload = {
        groupId,
        message: this.message,
        createdAt: new Date()
      }
      // const college = localStorage.getItem('college')
      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL + '/gossip', payload, options)
        .then(res => {
          this.$router.back()
        })
        .catch((err) => {
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