import Vue from 'vue'
import Vuex from 'Vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    mutations
  }
})
