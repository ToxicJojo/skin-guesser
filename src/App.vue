<template lang='pug'>
  .app
    h1 Skin Guesser
    router-link(to='game') Play
    router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang='scss'>

</style>
