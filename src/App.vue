<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span class="md-title">🤯 Oh My Gossip!!</span>
        <div class="md-toolbar-section-end">
          <router-link to="/add-feed">
            <md-button class="md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
          <!-- <router-link v-if="!college" to="/add-college">
            <md-button class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </router-link>-->
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'app'
  // data () {
  //   return {
  //     college: ''
  //   }
  // },
  // beforeCreate () {
  //   this.college = localStorage.getItem('college')
  // }
}
</script>

<style>
  .md-app {
    border: 1px solid rgba(#000, .12);
  }
</style>
