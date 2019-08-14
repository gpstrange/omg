<template>
  <div class="md-layout-item">
    <h3 align="center">Pick your Group</h3>
    <!--<md-autocomplete v-model="collegeName" :md-options="colleges">
      <label>Select College</label>
      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
        <md-highlight-text :md-term="collegeName" @click="selectedCollege(item)">{{ item.name }}</md-highlight-text>
      </template>
    </md-autocomplete> -->
    <md-field>
      <md-select v-model="college" name="college" id="college" placeholder="Select Group">
        <md-option v-for="(option, index) in colleges" v-bind:value="option.name" :key="index">
          {{option.name}}
        </md-option>
      </md-select>
    </md-field>
    <div align="center">
      <md-button class="md-accent md-raised" v-on:click="onSubmit()" :disabled="college ? false : true">Enter</md-button>
      <router-link to="/add-college">
        <md-button class="md-primary md-raised" >Add Group</md-button>
      </router-link>
    </div>
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
    collegeId: '',
    college: '',
    colleges: [],
    buttonFlag: true,
    showSnackbar: false,
    errMessage: ''
  }),
  beforeCreate () {
    const groupId = localStorage.getItem('groupId')
    if (groupId) {
      this.$router.push({path: 'home'})
    }
    const token = localStorage.getItem('token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get(URL + '/group?sort=-createdAt', options).then((res) => {
      this.colleges = res.data
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
    onSubmit (event) {
      let id
      this.colleges.forEach((c) => {
        if (c.name === this.college) {
          id = c._id
        }
      })
      if (!id) {
        return
      }
      localStorage.setItem('groupId', id)

      const user = JSON.parse(localStorage.getItem('user'))
      const userId = user._id

      const token = localStorage.getItem('token')
      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.patch(URL + '/user/' + userId, {groupId: id}, options).then((res) => {
        this.$router.push({path: 'home'})
      }).catch((err) => {
        if (err.message) {
          this.errMessage = err.message
        } else {
          this.errMessage = 'Something went wrong'
        }
        this.showSnackbar = true
      })
    }
    // getCustomers(searchTerm) {
    //   this.customers = new Promise(resolve => {
    //     if (!searchTerm) {
    //       resolve(this.GET_CUSTOMERS);
    //     } else {
    //       const term = searchTerm.toLowerCase();
    //       this.customers = this.GET_CUSTOMERS.filter(({ email }) => {
    //       email.toLowerCase().includes(term);
    //     });
    //       resolve(this.customers);
    //     }
    //   });
    // },
    // getSelected() {
    //   console.log(this.customer);
    // }
  }
}
</script>