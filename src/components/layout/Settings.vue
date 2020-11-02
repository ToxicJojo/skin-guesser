<template lang='pug'>
  .settings-container(@click.self='$emit("close")')
    .settings
      h2 Settings
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
  padding: 24px;
  border: 5px solid var(--color-header-background);
  @include flex-col;

  h1, h2 {
    margin: 0;
  }
}

.settings-category {
  border-bottom: 1px solid white;
}

</style>
