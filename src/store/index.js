import Vue from 'vue'
import Vuex from 'vuex'

import leagueData from './league-data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    leagueData,
  },
})

export default store
