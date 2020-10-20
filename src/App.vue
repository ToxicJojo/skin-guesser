<template lang='pug'>
  .app
    h1 Skin Guesser
    router-view
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.loadChampionData()
  },
  methods: {
    async loadChampionData () {
      await this.$store.dispatch('leagueData/loadChampions')
    },
  },
}
</script>

<style lang='scss'>

</style>
