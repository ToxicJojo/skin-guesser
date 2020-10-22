<template lang='pug'>
  .difficulty-select
    template(v-for='difficulty in difficulties')
      input(type='radio' name='difficulty' :id='"difficulty" + difficulty.id' :value='difficulty.id' :checked='value.id === difficulty.id' @change='$emit("input", difficulty)')
      label(:for='"difficulty" + difficulty.id') {{ difficulty.name }}
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

</style>
