<template lang='pug'>
  .game-timer
    .game-timer__bar(:style='gameTimerBarStyle')
</template>

<script>
export default {
  name: 'GameTimer',
  props: {
    maxTime: {
      type: Number,
      required: true,
    },
    remainingTime: {
      type: Number,
      required: true,
    },
  },
  computed: {
    gameTimerBarStyle () {
      const remainingRation = Math.max((this.remainingTime / this.maxTime), 0)

      return {
        transform: `scaleX(${remainingRation})`,
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.game-timer {
  display: flex;
  width: 100%;
  height: 24px;
  background-color: var(--color-background-dark);
}

.game-timer__bar {
  transition: transform .25s;
  width: 100%;
  background-color: var(--color-button-background);
}
</style>
