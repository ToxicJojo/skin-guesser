<template lang='pug'>
  .point-counter
    span Points:
    span  {{ points }}
</template>

<script>
export default {
  name: 'PointCounter',
  computed: {
    points () {
      return this.$store.state.gameData.points
    },
  },
}
</script>

<style lang='scss' scoped>

.point-counter {
  font-size: 32px;
  margin: 0 8px;
}

</style>
