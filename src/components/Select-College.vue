<template>
  <div class="md-layout-item">
    <md-field>
        <md-select v-model="college" name="college" id="college" placeholder="Select College">
          <md-option value="PSG">PSG</md-option>
          <md-option value="KCT">KCT</md-option>
          <md-option value="KIT">KIT</md-option>
          <md-option value="SRI_SAKTHI">Sri Sakthi</md-option>
        </md-select>
    </md-field>
    <md-button class="md-primary md-raised" @click="onSubmit()">Enter</md-button>
  </div>
</template>

<script>

export default {
  data: () => ({
    college: ''
  }),
  beforeCreate () {
    const college = localStorage.getItem('college')
    if (college) {
      this.$router.push({path: 'home'})
    }
  },
  methods: {
    onSubmit (event) {
      this.$router.push({path: 'home'})
      localStorage.setItem('college', this.college)
    }
  }
}
</script>