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
  methods: {
    onSubmit (event) {
      console.log(11111111111111111111)
      const payload = {
        message: this.message
      }
      console.log(payload)
      axios.post('https://ohmygossip-a2876.firebaseio.com/gossips.json', JSON.stringify(payload))
        .then(res => {
          // console.log(res)
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>