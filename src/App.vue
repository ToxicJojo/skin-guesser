<template lang='pug'>
  .app
    router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang='scss'>
@import '@/scss/style.scss';

body {
  background-color: var(--color-background);
}

</style>
