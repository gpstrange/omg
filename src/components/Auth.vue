<template>
  <div id="add-feed">
    <h3 align="center">Welcome to the world of Gossips!</h3>
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab id="tab-login" md-label="LOGIN">
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
              <md-button v-on:click="onLogin" class="md-accent md-raised" style="margin-top: 10px">
                  Login
              </md-button>
          </div>
        </form>
      </md-tab>
      <md-tab id="tab-signup" md-label="SIGN UP">
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
              <md-button v-on:click="onSubmit" class="md-accent md-raised" style="margin-top: 10px">
                  SignUp
              </md-button>
          </div>
        </form>
      </md-tab>
    </md-tabs>
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
    const token = localStorage.getItem('token')
    const groupId = localStorage.getItem('groupId')
    if (token && groupId) {
      this.$router.push({path: 'home'})
    } else if (token) {
      this.$router.push({path: 'college'})
    }
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
        if (err.response && err.response.data && err.response.data.message) {
          this.errMessage = err.response.data.message
        } else {
          this.errMessage = 'Something went wrong'
        }
        this.showSnackbar = true
      })
    },
    onLogin (event) {
      if (!this.username || !this.password) {
        return
      }
      const payload = {
        name: this.username,
        password: this.password
      }

      axios.post(URL + '/login', payload).then((res) => {
        // payload.groupId = res.data._id
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        if (res.data.user.groupId) {
          localStorage.setItem('groupId', res.data.user.groupId)
          this.$router.push('home')
        } else {
          this.$router.push('college')
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          this.errMessage = err.response.data.message
        } else {
          this.errMessage = 'Something went wrong'
        }
        this.showSnackbar = true
      })
    }
  }
}
</script>
