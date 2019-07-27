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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    message: ''
  }),
  beforeCreate () {
    const college = localStorage.getItem('college')
    if (!college) {
      this.$router.back()
    }
  },
  methods: {
    onSubmit (event) {
      const payload = {
        message: this.message,
        createdAt: new Date()
      }
      const college = localStorage.getItem('college')
      axios.post(`https://oh-my-gossip.firebaseio.com/${college}.json`, JSON.stringify(payload))
        .then(res => {
          this.$router.back()
        })
        .catch(err => console.log(err))
    }
  }
}
</script>