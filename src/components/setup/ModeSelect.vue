<template lang='pug'>
  .mode-select
    template(v-for='mode in gameModes')
      input.radio-select(type='radio' name='gameMode' :id='"mode" + mode.id' :value='mode.id' :checked='value.id === mode.id' @change='$emit("input", mode)')
      label.radio-select(:for='"mode" + mode.id') {{ mode.name }}
</template>

<script>
import gameModes from '@/config/gameModes.json'

export default {
  name: 'ModeSelection',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      gameModes,
    }
  },
}
</script>

<style lang='scss' scoped>

.mode-select {
  @include flex-row;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
