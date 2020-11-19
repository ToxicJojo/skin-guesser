<template lang='pug'>
  .game-container
    template(v-if='isLoadingChampionData')
      span Loading Data
    template(v-else)
      GameSetup(v-if='currentState === "gameSetup"' @startGame='startGame')
      SkinGuesserGame(v-if='currentState === "gameRunning"' :gameMode='gameMode' :difficulty='difficulty' @gameFinished='gameFinished')
      GameResult(v-if='currentState === "gameResult"' :guessHistory='guessHistory' :gameMode='gameMode' :difficulty='difficulty' @newGame='currentState = "gameSetup"')
</template>

<script>
import GameSetup from '@/views/GameSetup.vue'
import SkinGuesserGame from '@/views/SkinGuesserGame.vue'
import GameResult from '@/views/GameResult.vue'

export default {
  name: 'GameContainer',
  components: {
    GameSetup,
    SkinGuesserGame,
    GameResult,
  },
  data () {
    return {
      isLoadingChampionData: true,
      currentState: 'gameSetup',
      gameMode: undefined,
      difficulty: undefined,
      guessHistory: undefined,
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
    gameFinished (guessHistory) {
      this.guessHistory = guessHistory
      this.currentState = 'gameResult'
    },
  },
}
</script>

<style lang='scss' scoped>

.game-container {
  @include flex-row;
  justify-content: center;
}

</style>
