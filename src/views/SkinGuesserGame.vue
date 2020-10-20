<template lang='pug'>
  .skin-guesser-game
    div(v-if='isLoadingData')
      p Loading champion data
    template(v-else)
      SkinDisplay(splashUrl='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Talon_12.jpg' :clipData='clipData')
</template>

<script>
import SkinDisplay from '@/components/game/SkinDisplay.vue'

export default {
  name: 'SkinGuesserGamer',
  components: {
    SkinDisplay,
  },
  data () {
    return {
      isLoadingData: false,
      currentChampion: undefined,
      currentSkin: undefined,
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
  },
}
</script>

<style lang='scss' scoped>

</style>
