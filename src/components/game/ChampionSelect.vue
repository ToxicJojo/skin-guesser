<template lang='pug'>
  select(@change='$emit("input", championList[$event.target.selectedIndex])' :value='value.id')
    option(v-for='champion in championList' :value='champion.id') {{ champion.name }}
</template>

<script>
export default {
  name: 'ChampionSelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    championList () {
      return this.$store.state.leagueData.champions
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
