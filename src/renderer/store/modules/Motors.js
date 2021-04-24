const state = {
  settings: [ // Motors
  ],
  motor_setting_values: [ // Motors Settings
  ],
  connections: [ // Connections
  ]
}

const mutations = {
  SET_MOTOR_SETTINGS (state, payload) {
    state.settings = JSON.parse(JSON.stringify(payload))
  },
  INIT_MOTOR_SETTING (state) {
    const fs = require('fs')
    try {
      const data = fs.readFileSync('settings_motor.json', { encoding: 'utf8' })
      state.settings = JSON.parse(JSON.stringify(JSON.parse(data)))
    } catch (err) {
      console.log('Cannot open settings file - settings_motor.json')
    }
  },

  SET_MOTOR_SETTING_VALUES (state, payload) {
    state.motor_setting_values = JSON.parse(JSON.stringify(payload))
  },
  INIT_MOTOR_SETTING_VALUES (state) {
    const fs = require('fs')
    try {
      const data = fs.readFileSync('settings_motor_values.json', { encoding: 'utf8' })
      state.motor_setting_values = JSON.parse(JSON.stringify(JSON.parse(data)))
    } catch (err) {
      console.log('Cannot open settings file - settings_motor_values.json')
    }
  },

  SET_CONNECTIONS (state, payload) {
    state.connections = JSON.parse(JSON.stringify(payload))
  },
  INIT_CONNECTIONS (state) {
    const fs = require('fs')
    try {
      const data = fs.readFileSync('settings_connections.json', { encoding: 'utf8' })
      state.connections = JSON.parse(JSON.stringify(JSON.parse(data)))
    } catch (err) {
      console.log('Cannot open settings file - settings_connections.json')
    }
  }
}

const actions = {
  setMotorSettings ({ commit }, payload) {
    commit('SET_MOTOR_SETTINGS', payload)
    // Save File
    const fs = require('fs')
    let data = JSON.stringify(state.settings)
    try {
      fs.writeFileSync('settings_motor.json', data)
    } catch (err) {
      console.log('Cannot save settings file - settings_motor.json')
    }
  },
  initMotorSetting ({ commit }) {
    commit('INIT_MOTOR_SETTING')
  },

  setMotorSettingValues ({ commit }, payload) {
    commit('SET_MOTOR_SETTING_VALUES', payload)
    // Save File
    const fs = require('fs')
    let data = JSON.stringify(state.motor_setting_values)
    try {
      fs.writeFileSync('settings_motor_values.json', data)
    } catch (err) {
      console.log('Cannot save settings file - settings_motor_values.json')
    }
  },
  initMotorSettingValues ({ commit }) {
    commit('INIT_MOTOR_SETTING_VALUES')
  },

  setConnections ({ commit }, payload) {
    commit('SET_CONNECTIONS', payload)
    // Save File
    const fs = require('fs')
    let data = JSON.stringify(state.connections)
    try {
      fs.writeFileSync('settings_connections.json', data)
    } catch (err) {
      console.log('Cannot save settings file - settings_connections.json')
    }
  },
  initConnections ({ commit }) {
    commit('INIT_CONNECTIONS')
  }
}

export default {
  state,
  mutations,
  actions
}
