<template lang='pug'>
  .skin-guesser-game
    div(v-if='isLoadingData')
      p Loading champion data
    template(v-else)
      ChampionSelect(v-model='selectedChampion')
      SkinSelect(v-model='selectedSkin' :champion='selectedChampion')
      button(@click='checkGuess') Guess
      SkinDisplay(splashUrl='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Talon_12.jpg' :clipData='clipData')
</template>

<script>
import SkinDisplay from '@/components/game/SkinDisplay.vue'
import ChampionSelect from '@/components/game/ChampionSelect.vue'
import SkinSelect from '@/components/game/SkinSelect.vue'

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
      currentChampion: undefined,
      currentSkin: undefined,
      selectedChampion: {},
      selectedSkin: {},
      clipData: {
        radius: 50,
        x: 50,
        y: 50,
      },
    }
  },
  beforeMount () {
    this.loadChampionData()
  },
  methods: {
    async loadChampionData () {
      this.isLoadingData = true
      await this.$store.dispatch('leagueData/loadChampions')
      this.isLoadingData = false
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
