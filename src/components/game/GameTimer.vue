<template lang='pug'>
  .game-timer
    span {{ time }}
</template>

<script>
export default {
  name: 'GameTimer',
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
