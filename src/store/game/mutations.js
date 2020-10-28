const mutations = {
  setGameMode (state, gameMode) {
    state.gameMode = gameMode
  },
  setDifficulty (state, difficulty) {
    state.difficulty = difficulty
  },
  setRemainingTime (state, remainingTime) {
    state.remainingTime = remainingTime
  },
  setPoints (state, points) {
    state.points = points
  },
  addPoints (state, points) {
    state.points += points
  },
}

export default mutations
