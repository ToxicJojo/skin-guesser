<template lang='pug'>
  .game-result
    .guess-summary
      h1 {{ gameMode.name }} {{ difficulty.name }}
      .guess-summary__row
        span Right Guesses : {{ rightGuesseCount }}
      .guess-summary__row
        span Wrong Guesses : {{ wrongGuessCount }}
      button.button.button--new-game(@click='$emit("newGame")') New Game
    .guess-results-container
      .guess-result(v-for='guess in guessHistory')
        template(v-if='guess.correct')
          img.guess-result__img.guess-result__img--right(:src='guess.skin.loadingUrl')
          svg.guess-result__icon.guess-result__icon--right(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24')
            path(d='M0 0h24v24H0z' fill='none')
            path(d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z')
        template(v-else)
          img.guess-result__img.guess-result__img--wrong(:src='guess.skin.loadingUrl')
          svg.guess-result__icon.guess-result__icon--wrong(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24')
            path(d='M0 0h24v24H0z' fill='none')
            path(d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z')
</template>

<script>
export default {
  name: 'GameResult',
  props: {
    guessHistory: {
      type: Array,
      required: true,
    },
    gameMode: {
      type: Object,
      required: true,
    },
    difficulty: {
      type: Object,
      required: true,
    },
  },
  computed: {
    rightGuesseCount () {
      return this.guessHistory.filter((guess) => {
        return guess.correct
      }).length
    },
    wrongGuessCount () {
      return this.guessHistory.filter((guess) => {
        return !guess.correct
      }).length
    },
  },
}
</script>

<style lang='scss' scoped>
.game-result {
  @include flex-col;
  align-items: center;
  padding: 24px;
  width: 100%;

  @include min-width(1300) {
    @include flex-row;
    align-items: flex-start;
  }
}

.guess-summary {
  @include flex-col;
  align-items: center;
  width: 80%;
  margin: 24px;
  padding: 24px;
  background: var(--color-background-dark);
  border-radius: 24px;
  font-size: 24px;
  text-align: center;

  @include min-width(1300) {
    min-width: 400px;
    max-width: 30%;
  }

  h1 {
    margin: 0px;
  }
}

.guess-summary__row {
}

.guess-results-container {
  @include flex-row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 24px;
}

.guess-result {
  position: relative;
  margin: 16px;
}

.guess-result__img {
  width: 250px;
  height: auto;

  &.guess-result__img--right {
    box-shadow: 0px 0px 35px -1px var(--color-success);
  }

  &.guess-result__img--wrong {
    box-shadow: 0px 0px 35px -1px var(--color-error);
  }
}

.guess-result__icon {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;

  &.guess-result__icon--right {
    fill: var(--color-success);
  }
  &.guess-result__icon--wrong {
    fill: var(--color-error);
  }
}

.button--new-game {
  margin-top: 48px;
}

</style>
