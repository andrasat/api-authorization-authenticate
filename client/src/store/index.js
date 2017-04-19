import Vue from 'vue'
import Vuex from 'vuex'
import { state ,mutations, actions, getters } from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})