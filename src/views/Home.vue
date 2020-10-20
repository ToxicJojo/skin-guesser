<template lang='pug'>
  .home
    router-link(to='/game') Play
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center
}

a {
  color: #fefefe;
  font-size: 128px;
  padding: 32px;
  text-decoration: none;
  border: 8px solid purple;
  border-radius: 16px;
}

</style>
