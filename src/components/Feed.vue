<template>
  <div class="page-container">
    <md-card v-for="(item, index) in gossips" style="margin-bottom: 20px" :key="index">
    <md-card-header>
      <md-avatar class="md-avatar-icon md-large md-accent">
        <md-icon>person_outline</md-icon>
      </md-avatar>

      <div class="md-title">Anonymous</div>
      <div class="md-subhead">Coimbatore, India</div>
    </md-card-header>

    <md-card-content>
        {{item.message}}
    </md-card-content>

    <!-- <md-card-actions md-alignment="left">
      <md-button class="md-icon-button md-accent" style="margin-right: 5px">
        <md-icon>thumb_up</md-icon>
      </md-button>
      <md-button class="md-icon-button md-accent">
        <md-icon>add_comment</md-icon>
      </md-button>
    </md-card-actions> -->
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    gossips: []
  }),
  created () {
    const college = localStorage.getItem('college')
    if (!college) {
      this.$router.back()
    }
    axios.get(`https://oh-my-gossip.firebaseio.com/${college}.json`)
      .then(res => {
        this.gossips = res.data
        console.log(this.gossips)
      }).catch(e => console.log(e))
  }
}
</script>