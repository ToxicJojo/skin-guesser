<template lang='pug'>
  .skin-display
    .skin-name
      span {{ skinName }}
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
    skinName: {
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
  position: relative;
  background-color: #1c1c1c;
  max-width: 1215px;
  max-height: 717px;
  transition: box-shadow .5s;
  margin: 24px auto;
  box-shadow: 0px 0px 20px 10px #333;
  border-radius: 16px;
  overflow: hidden;

  .skin-name {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    padding: 8px;
    font-size: 48px;
    z-index: 1;
    transition: all .3s;
    opacity: 0;
  }

  &.guess-correct {
    box-shadow: 0px 0px 20px 10px var(--color-success);

    .skin-name {
      opacity: 1;
      color: var(--color-success)
    }
  }

  &.guess-incorrect {
    box-shadow: 0px 0px 20px 10px var(--color-error);

    .skin-name {
      opacity: 1;
      color: var(--color-error)
    }
  }

  img {
    transition: clip-path .5s;
    width: 100%;
    height: auto;
  }
}
</style>
