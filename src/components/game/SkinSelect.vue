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
      return this.champion.skins
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
