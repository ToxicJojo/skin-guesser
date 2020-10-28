<template lang='pug'>
  .difficulty-select
    template(v-for='difficulty in difficulties')
      input.radio-select(type='radio' name='difficulty' :id='"difficulty" + difficulty.id' :value='difficulty.id' :checked='value.id === difficulty.id' @change='$emit("input", difficulty)')
      label.radio-select(:for='"difficulty" + difficulty.id') {{ difficulty.name }}
</template>

<script>
import difficulties from '@/config/difficulties.json'

export default {
  name: 'DifficultySelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      difficulties,
    }
  },
}
</script>

<style lang='scss' scoped>

.difficulty-select {
  @include flex-row;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
