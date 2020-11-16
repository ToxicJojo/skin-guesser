<template lang='pug'>
  select.guess-select(@change='$emit("input", skinList[$event.target.selectedIndex])' :value='value.id' ref='select')
    option(v-for='skin in skinList' :value='skin.id' :key='skin.id') {{ skin.name }}
</template>

<script>
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
      if (this.champion.skins) {
        if (this.$store.state.settings.includeBaseSkins) {
          return this.champion.skins
        } else {
          return this.champion.skins.slice(1)
        }
      } else {
        return []
      }
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
