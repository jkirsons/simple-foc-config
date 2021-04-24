import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/motor-config',
      name: 'motors-config-page',
      component: require('@/components/MotorConfig').default
    },
    {
      path: '/',
      name: 'serial',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/setting/:id',
      name: 'setting-page',
      component: require('@/components/Setting').default
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: require('@/components/Settings').default
    },
    {
      path: '/motors',
      name: 'motors-page',
      component: require('@/components/Motors').default
    },
    {
      path: '/connections',
      name: 'connections-page',
      component: require('@/components/Connections').default
    }
    /* ,
    {
      path: '*',
      redirect: '/'
    }
    */
  ],
  scrollBehavior (to, from, savedPosition) {
    // if (['setting-page'].includes(to.name)) {
    document.getElementById('app').scrollIntoView()
    // }
  }
})
