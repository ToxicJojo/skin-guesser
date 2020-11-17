<template lang='pug'>
  .skin-guesser-game
    GameTimer(:maxTime='120' :remainingTime='remainingTime' v-if='isTimeAttack || isSurvival')
    SkinDisplay(:splashUrl='currentSkin.splashUrl' :skinName='currentSkin.name' :clipData='clipData' :class='{"guess-correct": gameState.isGuessCorrect, "guess-incorrect": gameState.isGuessIncorrect}')
    img.preload(:src='nextSkin.splashUrl')
    .guess-row
      ChampionSelect(v-model='selectedChampion')
      SkinSelect(v-model='selectedSkin' :champion='selectedChampion')
      button.button(@click='checkGuess' :disabled='currentPhase !== "guessing"') Guess
    //button(@click='isShowDebug = !isShowDebug') Toggle debug mode
    DebugTools(v-if='isShowDebug' @randomizeClipping='randomizeClipping' @revealSkin='revealSkin' @showNextSkin='showNextSkin' :currentChampion='currentChampion' :currentSkin='currentSkin' :clipData='clipData' @changeChampion='currentChampion = $event' @changeSkin='currentSkin = $event')
</template>

<script>
import GameTimer from '@/components/game/GameTimer.vue'
import SkinDisplay from '@/components/game/SkinDisplay.vue'
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'
import DebugTools from '@/components/game/DebugTools.vue'

import randomHelper from '@/util/random-helper'
import wait from '@/util/wait'

export default {
  name: 'SkinGuesserGamer',
  components: {
    GameTimer,
    SkinDisplay,
    ChampionSelect,
    SkinSelect,
    DebugTools,
  },
  props: {
    gameMode: {
      type: Object,
      required: true,
    },
    difficulty: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      isShowDebug: false,
      gameState: {
        isGuessCorrect: false,
        isGuessIncorrect: false,
      },
      currentChampion: undefined,
      currentSkin: undefined,
      nextChampion: undefined,
      nextSkin: undefined,
      selectedChampion: {},
      selectedSkin: {},
      clipData: {
        radius: 0,
        x: 0,
        y: 0,
      },
      timerId: 0,
      remainingTime: 0,
      currentPhase: 'none',
    }
  },
  computed: {
    champions () {
      return this.$store.state.leagueData.champions
    },
    clipSettings () {
      return this.difficulty.clipSettings
    },
    isTimeAttack () {
      return this.gameMode.id === 'timeAttack'
    },
    isSurvival () {
      return this.gameMode.id === 'survival'
    },
  },
  beforeMount () {
    this.startGame()
  },
  methods: {
    startGame () {
      this.selectNextSkin()
      this.showNextSkin()

      if (this.isTimeAttack || this.isSurvival) {
        this.remainingTime = 120

        this.timerId = window.setInterval(this.timerTick, 50)
      }

      this.selectedChampion = this.champions[0]
      if (this.$store.state.settings.includeBaseSkins) {
        this.selectedSkin = this.selectedChampion.skins[0]
      } else {
        this.selectedSkin = this.selectedChampion.skins[1]
      }
    },
    showNextSkin () {
      this.currentChampion = this.nextChampion
      this.currentSkin = this.nextSkin
      this.selectNextSkin()
      this.randomizeClipping()

      this.currentPhase = 'guessing'
    },
    timerTick () {
      if (this.isSurvival) {
        this.remainingTime -= this.difficulty.survivalSettings.lifeDrain
      } else {
        this.remainingTime -= 0.05
      }
      if (this.remainingTime <= 0 && (this.isTimeAttack || this.isSurvival)) {
        window.clearInterval(this.timerId)
        alert('Time Up.')
        this.hideSkin()
      }
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
      if (this.isSurvival) {
        this.remainingTime += this.difficulty.survivalSettings.lifeGain
      }

      this.gameState.isGuessCorrect = true
      await this.revealSkin()
    },
    async guessIncorrect () {
      if (this.isSurvival) {
        this.remainingTime -= this.difficulty.survivalSettings.lifeLoss
      }

      this.gameState.isGuessIncorrect = true
      await this.revealSkin()
    },
    selectNextSkin () {
      this.nextChampion = randomHelper.getRandomElement(this.champions)
      if (this.$store.state.settings.includeBaseSkins) {
        this.nextSkin = randomHelper.getRandomElement(this.nextChampion.skins)
      } else {
        this.nextSkin = randomHelper.getRandomElementBetween(this.nextChampion.skins, 1)
      }
    },
    randomizeClipping () {
      this.clipData.radius = randomHelper.getRandomIntBetween(this.clipSettings.radius.min, this.clipSettings.radius.max)
      this.clipData.x = randomHelper.getRandomIntBetween(this.clipSettings.x.min, this.clipSettings.x.max)
      this.clipData.y = randomHelper.getRandomIntBetween(this.clipSettings.y.min, this.clipSettings.y.max)
    },
    async checkGuess () {
      this.currentPhase = 'transition'
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
img.preload {
  display: none;
}

.skin-guesser-game {
  position: relative;
  @include flex-col;
  align-items: center;
}

.guess-row {
  @include flex-row;
  flex-wrap: wrap;
  margin: 0px 24px;
}

.button {
  width: 100%;

  @include min-width(900) {
    width: auto;
  }
}
</style>
