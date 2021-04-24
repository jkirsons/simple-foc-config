import Vue from 'vue'
import vuetify from '../plugins/vuetify'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import SerialPort from 'serialport'
import Convert from 'ansi-to-html'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

store.dispatch('initSetting')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  vuetify,
  template: '<App/>'
}).$mount('#app')

const port = new SerialPort('COM4', {
  baudRate: 115200
})

const Readline = SerialPort.parsers.Readline
const parser = port.pipe(new Readline())

parser.on('data', function (data) {
  // var decoded = new TextDecoder().decode(data)
  var msg = new Convert({ newline: true, stream: true }).toHtml(data) + '</br>'
  // console.log('Data:', msg)
  store.dispatch('setMessage', { message: msg })
})
