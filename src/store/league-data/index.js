import state from './state'
import mutations from './mutations'
import actions from './actions'

const leagueDataModule = {
  namespaced: true,
  actions,
  mutations,
  state,
}

export default leagueDataModule
