import Vue from 'vue'
import Vuex from 'vuex'

import gameData from './game'
import leagueData from './league-data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gameData,
    leagueData,
  },
})

export default store
