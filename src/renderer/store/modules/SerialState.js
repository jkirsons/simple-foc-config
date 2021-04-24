const state = {
  message: ''
}

const mutations = {
  SET_MESSAGE (state, payload) {
    state.message += payload.message
  }
}

const actions = {
  setMessage ({ commit }, payload) {
    commit('SET_MESSAGE', { message: payload.message })
  }
}

export default {
  state,
  mutations,
  actions
}
