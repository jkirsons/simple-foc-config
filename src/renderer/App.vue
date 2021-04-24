<template>
  <v-app>
    <v-navigation-drawer permanent app color="grey darken-3" dark>
      <v-list nav dense>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>          
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'simple-foc-config',
    methods: {
      close: function () {
        window.close()
      }
    },
    data: function () {
      return {
        navItems: [
          { text: 'Motor Config', icon: 'mdi-monitor-dashboard', to: '/motor-config' },
          { text: 'Console', icon: 'mdi-console', to: '/' },
          { text: '', icon: '', to: '' },
          { text: 'Connections', icon: 'mdi-connection', to: '/connections' },
          { text: 'Motors', icon: 'mdi-format-list-bulleted-square', to: '/motors' },
          { text: 'Settings', icon: 'mdi-cog', to: '/settings' }
        ]
      }
    }
  }
</script>
