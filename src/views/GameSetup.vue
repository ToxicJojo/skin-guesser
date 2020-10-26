<template lang='pug'>
  .game-setup
    .mode
      h2 Gamemode
      ModeSelect(v-model='selectedMode')
      p.mode-description {{ selectedMode.description }}
    .difficulty
      h2 Difficulty
      DifficultySelect(v-model='selectedDifficulty')
    button(@click='startGame') Start Game
</template>

<script>
import ModeSelect from '@/components/setup/ModeSelect.vue'
import DifficultySelect from '@/components/setup/DifficultySelect.vue'

import gameModes from '@/config/gameModes.json'
import difficulties from '@/config/difficulties.json'

export default {
  name: 'GameSetup',
  components: {
    ModeSelect,
    DifficultySelect,
  },
  data () {
    return {
      selectedMode: gameModes[0],
      selectedDifficulty: difficulties[0],
    }
  },
  methods: {
    startGame () {
      this.$store.commit('gameData/setGameMode', this.selectedMode)
      this.$store.commit('gameData/setDifficulty', this.selectedDifficulty)

      this.$emit('startGame')
    },
  },
}
</script>

<style lang='scss' scoped>

.game-setup {
  @include flex-col;
  align-items: center;
  text-align: center;
}

</style>
