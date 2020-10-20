<template lang='pug'>
  .skin-guesser-game
    div(v-if='isLoadingData')
      p Loading champion data
    template(v-else)
      ChampionSelect(v-model='selectedChampion')
      SkinSelect(v-model='selectedSkin' :champion='selectedChampion')
      button(@click='checkGuess') Guess
      SkinDisplay(:splashUrl='currentSkin.splashUrl' :clipData='clipData')
      .cheats
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
</template>

<script>
import SkinDisplay from '@/components/game/SkinDisplay.vue'
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'

import randomHelper from '@/util/random-helper'

export default {
  name: 'SkinGuesserGamer',
  components: {
    SkinDisplay,
    ChampionSelect,
    SkinSelect,
  },
  data () {
    return {
      isLoadingData: false,
      currentChampion: {},
      currentSkin: {},
      selectedChampion: {},
      selectedSkin: {},
      clipData: {
        radius: 50,
        x: 50,
        y: 50,
      },
      clipSettings: {
        radius: {
          min: 8,
          max: 25,
        },
        x: {
          min: 15,
          max: 85,
        },
        y: {
          min: 15,
          max: 85,
        },
      },
    }
  },
  computed: {
    champions () {
      return this.$store.state.leagueData.champions
    },
  },
  beforeMount () {
    this.loadChampionData()
  },
  methods: {
    async loadChampionData () {
      this.isLoadingData = true
      await this.$store.dispatch('leagueData/loadChampions')
      this.isLoadingData = false

      this.showRandomSkin()
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
    checkGuess () {
      if (this.currentChampion.id === this.selectedChampion.id && this.currentSkin.id === this.selectedSkin.id) {
        alert('Correct guess!')
      } else {
        alert(`Wrong it was: ${this.currentSkin.name}`)
      }
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
