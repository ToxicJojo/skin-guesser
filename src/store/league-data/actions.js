const actions = {
  async loadChampions ({ commit }) {
    const champions = (await import('@/data/champions.json')).default

    commit('setChampions', champions)
  },
}

export default actions
