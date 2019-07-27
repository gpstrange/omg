<template>
  <div class="md-layout-item">
    <md-field>
        <md-select v-model="college" name="college" id="college" placeholder="Select Group">
          <md-option v-for="(option, index) in colleges" v-bind:value="option.name" :key="index">
            {{option.name}}
          </md-option>
          <!-- <md-option value="KCT">KCT</md-option>
          <md-option value="KIT">KIT</md-option>
          <md-option value="SRI_SAKTHI">Sri Sakthi</md-option> -->
        </md-select>
    </md-field>
    <md-button class="md-accent md-raised" @click="onSubmit()">Enter</md-button>
    <router-link to="/add-college">
      <md-button class="md-primary md-raised" >Add Group</md-button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    college: '',
    colleges: []
  }),
  beforeCreate () {
    const college = localStorage.getItem('college')
    if (college) {
      this.$router.push({path: 'home'})
    }
    axios.get(`https://oh-my-gossip.firebaseio.com/colleges.json`).then((res) => {
      this.colleges = res.data
      this.colleges.reverse()
    }).catch(err => console.log(err))
  },
  methods: {
    onSubmit (event) {
      this.$router.push({path: 'home'})
      localStorage.setItem('college', this.college)
    }
  }
}
</script>