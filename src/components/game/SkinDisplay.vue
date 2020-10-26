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
  background-color: #1c1c1c;
  max-width: 1215px;
  max-height: 717px;
  transition: box-shadow .5s;
  margin: 24px auto;
  box-shadow: 0px 0px 20px 10px #333;
  border-radius: 16px;
  overflow: hidden;

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
    color: var(--color-success);
  }

  .guess-incorrect-message {
    color: var(--color-error);
  }

  &.guess-correct {
    box-shadow: 0px 0px 20px 10px var(--color-success);

    .guess-correct-message {
      opacity: 1;
    }
  }

  &.guess-incorrect {
    box-shadow: 0px 0px 20px 10px var(--color-error);

    .guess-incorrect-message {
      opacity: 1;
    }
  }

  img {
    transition: clip-path .5s;
    width: 100%;
    height: auto;
  }
}
</style>
