import mutations from './mutations'
import state from './state'

const gameDataModule = {
  namespaced: true,
  mutations,
  state,
}

export default gameDataModule
