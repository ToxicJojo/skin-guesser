<template lang='pug'>
  .settings-container(@click.self='$emit("close")')
    .settings
      h2 Settings
      h3.settings-category General
      label Darkmode
        input(type='checkbox' v-model='isDarkMode')
      h3.settings-category Game
      label Include base skins
        input(type='checkbox' v-model='includeBaseSkins')
</template>

<script>

export default {
  name: 'Settings',
  computed: {
    includeBaseSkins: {
      get () {
        return this.$store.state.settings.includeBaseSkins
      },
      set (value) {
        this.$store.commit('settings/setIncludeBaseSkins', value)
      },
    },
    isDarkMode: {
      get () {
        return this.$store.state.settings.isDarkMode
      },
      set (value) {
        this.$store.commit('settings/setIsDarkMode', value)
      },
    },
  },
}
</script>

<style lang='scss' scoped>

.settings-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, .5);
  z-index: 10;
  width: 100vw;
  height: 100vh;
}

.settings {
  background: var(--color-background);
  min-width: 300px;
  padding: 32px;
  border: 5px solid var(--color-background-dark);
  @include flex-col;

  h1, h2 {
    margin: 0;
  }
}

.settings-category {
  border-bottom: 1px solid var(--color-background-dark);
}

</style>
