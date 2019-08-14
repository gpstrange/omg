<template>
  <div id="add-feed">
    <h3 align="center">Welcome to the world of Gossips!</h3>
    <form>
        <md-field>
            <label style="font-size: 12px">Your Secret Name</label>
            <md-input v-model="username"></md-input>
        </md-field>
        <md-field>
            <label style="font-size: 12px">Password</label>
            <md-input v-model="password" type="password"></md-input>
        </md-field>
        <div align="center">
            <router-link to="/login">Already have account - Login</router-link>
        </div>
        <div align="center">
            <md-button v-on:click="onSubmit" class="md-accent md-raised" style="margin-top: 10px">
                SignUp
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
    username: '',
    password: '',
    showSnackbar: false,
    errMessage: ''
  }),
  beforeCreate () {
    localStorage.clear()
  },
  methods: {
    onSubmit (event) {
      if (!this.username || !this.password) {
        return
      }

      const payload = {
        name: this.username,
        password: this.password
      }

      axios.post(URL + '/signup', payload).then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        this.$router.push('college')
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
