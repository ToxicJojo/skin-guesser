<template lang='pug'>
  .skin-guesser-game
    div(v-if='isLoadingData')
      p Loading champion data
    template(v-else)
      GameSetup(v-if='isSelectingMode' @startGame='startGame')
      template(v-else)
        ChampionSelect(v-model='selectedChampion')
        SkinSelect(v-model='selectedSkin' :champion='selectedChampion')
        button(@click='checkGuess') Guess
        button(@click='isSelectingMode = true') Mode Select
        SkinDisplay(:splashUrl='currentSkin.splashUrl' :clipData='clipData' :class='{"guess-correct": gameState.isGuessCorrect, "guess-incorrect": gameState.isGuessIncorrect}')
        button(@click='isShowDebug = !isShowDebug') Toggle debug mode
        .cheats(v-if='isShowDebug')
          h2 Debug Tools
          label Displayed Skin:
          ChampionSelect(v-model='currentChampion')
          SkinSelect(v-model='currentSkin' :champion='currentChampion')
          button(@click='showRandomSkin') Random Skin
          br
          label Radius
            input(type='range' min='0' max='100' v-model='clipData.radius')
          label X
            input(type='range' min='0' max='100' v-model='clipData.x')
          label Y
            input(type='range' min='0' max='100' v-model='clipData.y')
          button(@click='randomizeClipping') Random Clipping
          button(@click='revealSkin') Reveal Skin
</template>

<script>
import SkinDisplay from '@/components/game/SkinDisplay.vue'
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'
import GameSetup from '@/views/GameSetup.vue'

import randomHelper from '@/util/random-helper'
import wait from '@/util/wait'

export default {
  name: 'SkinGuesserGamer',
  components: {
    SkinDisplay,
    ChampionSelect,
    SkinSelect,
    GameSetup,
  },
  data () {
    return {
      isSelectingMode: true,
      isLoadingData: true,
      isShowDebug: false,
      gameState: {
        isGuessCorrect: false,
        isGuessIncorrect: false,
      },
      currentChampion: undefined,
      currentSkin: undefined,
      selectedChampion: {},
      selectedSkin: {},
      clipData: {
        radius: 0,
        x: 0,
        y: 0,
      },
    }
  },
  computed: {
    champions () {
      return this.$store.state.leagueData.champions
    },
    clipSettings () {
      return this.$store.state.gameData.difficulty.clipSettings
    },
  },
  async mounted () {
    await this.loadChampionData()
    this.isLoadingData = false
  },
  methods: {
    async startGame () {
      await this.showRandomSkin()
      this.randomizeClipping()

      this.isSelectingMode = false
    },
    showNextSkin () {
      this.showRandomSkin()
      this.randomizeClipping()
    },
    async revealSkin () {
      this.clipData.radius = 150
      await wait(1000)
    },
    async hideSkin () {
      this.clipData.radius = 0
      await wait(1000)
    },
    async guessCorrect () {
      this.gameState.isGuessCorrect = true
      await this.revealSkin()
    },
    async guessIncorrect () {
      this.gameState.isGuessIncorrect = true
      await this.revealSkin()
    },
    async loadChampionData () {
      this.isLoadingData = true
      await this.$store.dispatch('leagueData/loadChampions')
    },
    async showRandomSkin () {
      this.currentChampion = randomHelper.getRandomElement(this.champions)
      // Without waiting for the next renderTick the skin select will not properly update to the new skin. I'm not sure why but this works.
      await this.$nextTick()
      this.currentSkin = randomHelper.getRandomElement(this.currentChampion.skins)
    },
    randomizeClipping () {
      this.clipData.radius = randomHelper.getRandomIntBetween(this.clipSettings.radius.min, this.clipSettings.radius.max)
      this.clipData.x = randomHelper.getRandomIntBetween(this.clipSettings.x.min, this.clipSettings.x.max)
      this.clipData.y = randomHelper.getRandomIntBetween(this.clipSettings.y.min, this.clipSettings.y.max)
    },
    async checkGuess () {
      if (this.currentChampion.id === this.selectedChampion.id && this.currentSkin.id === this.selectedSkin.id) {
        await this.guessCorrect()
      } else {
        await this.guessIncorrect()
      }

      this.gameState.isGuessCorrect = false
      this.gameState.isGuessIncorrect = false
      await this.hideSkin()
      this.showNextSkin()
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
