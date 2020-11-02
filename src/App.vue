<template lang='pug'>
  .app
    Settings(@close='isShowSettings = false' v-if='isShowSettings')
    Header(@showSettings='isShowSettings = true')
    router-view
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Settings from '@/components/layout/Settings.vue'

export default {
  name: 'App',
  components: {
    Header,
    Settings,
  },
  data () {
    return {
      isShowSettings: false,
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.state.settings.isDarkMode
    },
  },
  watch: {
    isDarkMode: function () {
      this.setColorMode()
    },
  },
  beforeMount () {
    this.setColorMode()
  },
  methods: {
    setColorMode () {
      if (this.isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    },
  },
}
</script>

<style lang='scss'>
@import '@/scss/style.scss';

body {
  background-color: var(--color-background);
}

</style>
