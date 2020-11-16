<template lang='pug'>
  .game-container
    template(v-if='isLoadingChampionData')
      span Loading Data
    template(v-else)
      GameSetup(v-if='currentState === "gameSetup"' @startGame='startGame')
      SkinGuesserGame(v-if='currentState === "gameRunning"' :gameMode='gameMode' :difficulty='difficulty')
</template>

<script>
import GameSetup from '@/views/GameSetup.vue'
import SkinGuesserGame from '@/views/SkinGuesserGame.vue'

export default {
  name: 'GameContainer',
  components: {
    GameSetup,
    SkinGuesserGame,
  },
  data () {
    return {
      isLoadingChampionData: true,
      currentState: 'gameSetup',
      gameMode: undefined,
      difficulty: undefined,
    }
  },
  async mounted () {
    await this.$store.dispatch('leagueData/loadChampions')
    this.isLoadingChampionData = false
  },
  methods: {
    startGame (gameMode, difficulty) {
      this.gameMode = gameMode
      this.difficulty = difficulty

      this.currentState = 'gameRunning'
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
