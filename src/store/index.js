import Vue from 'vue'
import Vuex from 'vuex'

import leagueData from './league-data'
import settings from './settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    leagueData,
    settings,
  },
})

export default store
