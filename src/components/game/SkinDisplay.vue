<template lang='pug'>
  .skin-display
    img(:src='splashUrl' :style='imageStyle')
</template>

<script>
export default {
  name: 'SkinDisplay',
  props: {
    splashUrl: {
      type: String,
      required: true,
    },
    clipData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageStyle () {
      return {
        clipPath: `circle(${this.clipData.radius}% at ${this.clipData.x}% ${this.clipData.y}%)`,
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.skin-display {
  img {
    transition: clip-path .5s;
  }
}
</style>
