<template lang='pug'>
  .game-setup
    .mode
      h2 Gamemode
      ModeSelect(v-model='selectedMode')
      p.mode-description {{ selectedMode.description }}
    .difficulty
      h2 Difficulty
      DifficultySelect(v-model='selectedDifficulty')
    button.button.button-start-game(@click='startGame') Start Game
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
      this.$emit('startGame', this.selectedMode, this.selectedDifficulty)
    },
  },
}
</script>

<style lang='scss' scoped>

.game-setup {
  @include flex-col;
  align-items: center;
  text-align: center;
  background-color: var(--color-background-dark);
  padding: 64px;
  margin: 32px;
  border-radius: 24px;
}

.button-start-game {
  margin-top: 32px;
}

</style>
