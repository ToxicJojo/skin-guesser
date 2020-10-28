<template lang='pug'>
  .game-timer
    span Remaining Time:
    span  {{ remainingTime }}
</template>

<script>
export default {
  name: 'GameTimer',
  computed: {
    remainingTime () {
      return this.$store.state.gameData.remainingTime
    },
  },
}
</script>

<style lang='scss' scoped>

.game-timer {
  font-size: 32px;
  margin: 0 8px;
}

</style>
