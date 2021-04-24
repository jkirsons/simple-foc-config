import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  /* plugins: [
    createPersistedState(),
    createSharedMutations()
  ], */
  strict: process.env.NODE_ENV !== 'production'
})
