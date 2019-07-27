<template>
  <div id="add-feed">
    <form>
      <md-field>
        <label style="font-size: 12px">Name</label>
        <md-input v-model="college"></md-input>
      </md-field>
      <!-- <md-field>
        <label style="font-size: 12px">City</label>
        <md-input v-model="city"></md-input>
      </md-field> -->
      <md-button v-on:click="onSubmit" class="md-accent md-raised">
        Submit
      </md-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    college: ''
  }),
  methods: {
    onSubmit (event) {
      const payload = {
        message: 'The Group Created',
        createdAt: new Date()
      }

      axios.post(`https://oh-my-gossip.firebaseio.com/colleges.json`, JSON.stringify({name: this.college})).catch(err => console.log(err))

      axios.post(`https://oh-my-gossip.firebaseio.com/${this.college}.json`, JSON.stringify(payload))
        .then(res => {
          localStorage.setItem('college', this.college)
          this.$router.push('home')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>