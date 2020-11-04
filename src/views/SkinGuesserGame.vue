<template lang='pug'>
  .skin-guesser-game
    div(v-if='isLoadingData')
      p Loading champion data
    template(v-else)
      GameSetup(v-if='isSelectingMode' @startGame='startGame')
      template(v-else)
        SkinDisplay(:splashUrl='currentSkin.splashUrl' :skinName='currentSkin.name' :clipData='clipData' :class='{"guess-correct": gameState.isGuessCorrect, "guess-incorrect": gameState.isGuessIncorrect}')
        img.preload(:src='nextSkin.splashUrl')
        .guess-row
          ChampionSelect(v-model='selectedChampion')
          SkinSelect(v-model='selectedSkin' :champion='selectedChampion')
          button.guess-button(@click='checkGuess') Guess
        button(@click='isShowDebug = !isShowDebug') Toggle debug mode
        .cheats(v-if='isShowDebug')
          h2 Debug Tools
          label Displayed Skin:
          ChampionSelect(v-model='currentChampion')
          SkinSelect(v-model='currentSkin' :champion='currentChampion')
          button(@click='showNextSkin') Random Skin
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
import GameTimer from '@/components/game/GameTimer.vue'
import SkinDisplay from '@/components/game/SkinDisplay.vue'
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'
import GameSetup from '@/views/GameSetup.vue'

import randomHelper from '@/util/random-helper'
import wait from '@/util/wait'

export default {
  name: 'SkinGuesserGamer',
  components: {
    GameTimer,
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
    }
  },
  computed: {
    champions () {
      return this.$store.state.leagueData.champions
    },
    clipSettings () {
      return this.$store.state.gameData.difficulty.clipSettings
    },
    gameMode () {
      return this.$store.state.gameData.gameMode
    },
    isTimeAttack () {
      return this.gameMode.id === 'timeAttack'
    },
  },
  async mounted () {
    await this.loadChampionData()
    this.isLoadingData = false
  },
  methods: {
    async startGame () {
      this.selectNextSkin()
      this.showNextSkin()

      this.randomizeClipping()

      this.$store.commit('gameData/setPoints', 0)

      if (this.isTimeAttack) {
        this.$store.commit('gameData/setRemainingTime', 120)

        this.timerId = window.setInterval(this.timerTick, 1000)
      }

      this.selectedChampion = this.champions[0]
      if (this.$store.state.settings.includeBaseSkins) {
        this.selectedSkin = this.selectedChampion.skins[0]
      } else {
        this.selectedSkin = this.selectedChampion.skins[1]
      }

      this.isSelectingMode = false
    },
    showNextSkin () {
      this.currentChampion = this.nextChampion
      this.currentSkin = this.nextSkin
      this.selectNextSkin()
      this.randomizeClipping()
    },
    timerTick () {
      this.$store.commit('gameData/setRemainingTime', this.$store.state.gameData.remainingTime - 1)
      if (this.$store.state.gameData.remainingTime <= 0 && this.isTimeAttack) {
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
      this.gameState.isGuessCorrect = true
      this.$store.commit('gameData/addPoints', 10)
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
  padding: 24px;
  position: relative;
}

.guess-row {
  @include flex-row;
  flex-wrap: wrap;
  justify-content: center;
}

.guess-button {
  background: #EB5757;
  color: var(--color-text);
  font-size: 24px;
  border-radius: 8px;
  border-style: solid;
  border-width: 0px;
  padding: 16px;
  margin: 8px;
}

.game-timer {
  position: absolute;
  right: 48px;
}
</style>
