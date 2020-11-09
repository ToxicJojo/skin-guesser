<template lang='pug'>
  .app
    Settings(@close='closeSettings' v-if='isShowSettings')
    Header(@showSettings='isShowSettings = true')
    SkinGuesserGame
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Settings from '@/components/layout/Settings.vue'
import SkinGuesserGame from '@/views/SkinGuesserGame.vue'

export default {
  name: 'App',
  components: {
    Header,
    Settings,
    SkinGuesserGame,
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
    const settings = JSON.parse(window.localStorage.getItem('settings'))

    this.$store.commit('settings/setIncludeBaseSkins', settings.includeBaseSkins)
    this.$store.commit('settings/setIsDarkMode', settings.isDarkMode)

    this.setColorMode()
  },
  methods: {
    closeSettings () {
      this.isShowSettings = false
      window.localStorage.setItem('settings', JSON.stringify(this.$store.state.settings))
    },
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
