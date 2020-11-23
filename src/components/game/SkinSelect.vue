<template lang='pug'>
  select.guess-select(@change='$emit("input", skinList[$event.target.selectedIndex])' :value='value.id' ref='select')
    option(v-for='skin in skinList' :value='skin.id' :key='skin.id') {{ skin.name }}
</template>

<script>
import skinHelper from '@/util/skin-helper'

export default {
  name: 'SkinSelect',
  props: {
    value: {
      type: Object,
      required: true,
    },
    champion: {
      type: Object,
      required: true,
    },
  },
  computed: {
    skinList () {
      return skinHelper.filterSkins(this.champion.skins, this.$store.state.settings)
    },
  },
  watch: {
    champion () {
      this.$emit('input', this.skinList[0])
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
