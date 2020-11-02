<template lang='pug'>
  header.header
    router-link(to='/') Skin Guesser
    .game-info
      GameTimer(v-if='isTimeAttack')
      PointCounter
    img.settings-icon(src='@/assets/settings-24px.svg' @click='$emit("showSettings")')
</template>

<script>
import GameTimer from '@/components/game/GameTimer.vue'
import PointCounter from '@/components/game/PointCounter.vue'

export default {
  name: 'Header',
  components: {
    GameTimer,
    PointCounter,
  },
  computed: {
    isTimeAttack () {
      return this.$store.state.gameData.gameMode.id === 'timeAttack'
    },
  },
}
</script>

<style lang='scss' scoped>

header.header {
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 8px 0px 8px 16px;
  background-color: var(--color-header-background);
  box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.75);
}

.settings-icon {
  padding: 8px;
  width: 64px;
  height: 64px;
}

.game-info {
  @include flex-row;
}

</style>
