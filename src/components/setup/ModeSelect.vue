<template lang='pug'>
  .mode-select
    template(v-for='mode in gameModes')
      input(type='radio' name='gameMode' :id='"mode" + mode.id' :value='mode.id' :checked='value.id === mode.id' @change='$emit("input", mode)')
      label(:for='"mode" + mode.id') {{ mode.name }}
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
  display: flex;
  justify-content: center;
}

</style>
