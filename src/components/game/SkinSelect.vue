<template lang='pug'>
  select.guess-select(@change='$emit("input", skinList[$event.target.selectedIndex])' :value='value.id')
    option(v-for='skin in skinList' :value='skin.id') {{ skin.name }}
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
}
</script>

<style lang='scss' scoped>

</style>
