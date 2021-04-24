const state = {
  settings: [
  ]
}

const mutations = {
  SET_SETTING (state, payload) {
    const foundIndex = state.settings.findIndex(obj => obj.id === payload.id)
    if (foundIndex !== -1) {
      console.log('setting found')
      state.settings.splice(foundIndex, 1, JSON.parse(JSON.stringify(payload)))
    } else {
      state.settings.push(JSON.parse(JSON.stringify(payload)))
    }
  },
  MOVE_SETTING (state, payload) {
    state.settings.splice(payload.to, 0, state.settings.splice(payload.from, 1)[0])
  },
  DELETE_SETTING (state, id) {
    const foundIndex = state.settings.findIndex(obj => obj.id === id)
    if (foundIndex !== -1) {
      console.log('setting found')
      state.settings.splice(foundIndex, 1)
    }
  },
  INIT_SETTING (state) {
    const fs = require('fs')
    try {
      const data = fs.readFileSync('settings.json', { encoding: 'utf8' })
      state.settings = JSON.parse(JSON.stringify(JSON.parse(data)))
    } catch (err) {
      console.log('Cannot open settings file - settings.json')
    }
  }
}

function saveSettings () {
  // Save File
  const fs = require('fs')
  let data = JSON.stringify(state.settings)
  try {
    fs.writeFileSync('settings.json', data)
  } catch (err) {
    console.log('Cannot save settings file - settings.json')
  }
}

const actions = {
  setSetting ({ commit }, payload) {
    commit('SET_SETTING', payload)
    saveSettings()
  },
  initSetting ({ commit }) {
    commit('INIT_SETTING')
  },
  deleteSetting ({ commit }, id) {
    commit('DELETE_SETTING', id)
    saveSettings()
  },
  moveSetting ({ commit }, payload) {
    commit('MOVE_SETTING', payload)
    saveSettings()
  }
}

export default {
  state,
  mutations,
  actions
}
