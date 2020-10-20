<template lang='pug'>
  .skin-display
    .guess-correct-message Correct
    .guess-incorrect-message Incorrect
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
  position: relative;
  transition: box-shadow .5s;
  margin: 24px;

  .guess-correct-message, .guess-incorrect-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 128px;
    z-index: 1;
    transition: opacity .3s;
    opacity: 0;
  }

  .guess-correct-message {
    color: #168d2a;
  }

  .guess-incorrect-message {
    color: #8d1616;
  }

  &.guess-correct {
    box-shadow: 0px 0px 20px 10px #168d2abf;

    .guess-correct-message {
      opacity: 1;
    }
  }

  &.guess-incorrect {
    box-shadow: 0px 0px 20px 10px #8d1616bf;

    .guess-incorrect-message {
      opacity: 1;
    }
  }

  img {
    transition: clip-path .5s;
  }
}
</style>
