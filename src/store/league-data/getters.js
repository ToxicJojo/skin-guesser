const getters = {
  getChampionById: (state) => (id) => {
    return state.champions.find((champion) => {
      return champion.id === id
    })
  },
}

export default getters
