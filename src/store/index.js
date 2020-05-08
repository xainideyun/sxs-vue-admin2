import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import app from './modules/app'
import user from './modules/user'
import settings from './modules/settings'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    app,
    settings,
    tagsView
  }
})
