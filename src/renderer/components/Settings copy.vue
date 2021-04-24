<template>
  <v-container>
    <v-list dense>
      <v-list-item
        v-for="(setting, i) in settings"
        :key="i">
          <v-subheader>{{ setting.text }}</v-subheader>
          <v-container>
            <v-row>
              <v-col v-if="[0,2].includes(setting.type)" align-self="center">
                <v-slider
                  :max="setting.max"
                  :min="setting.min"
                  :color="setting.colour"
                  track-color="blue-grey darken-1"
                  :thumb-label="true"
                  thumb-size="52"
                  :step="setting.step"
                  v-model="values[setting.id]"
                ></v-slider>
              </v-col>
              <v-col v-if="[1,2].includes(setting.type)">
                <v-text-field v-model="values[setting.id]" solo></v-text-field>
              </v-col>
              <v-col v-if="[3].includes(setting.type)">
                <v-btn-toggle
                v-model="values[setting.id]"
                light mandatory rounded
                color="white"
                active-class="blue-grey"
              >
                <v-btn v-for="(item, index) in setting.possibleValues" :key="index" :height="32" :value="item.text">{{ item.text }}</v-btn>
              </v-btn-toggle>
              </v-col>
              <v-col sm=4>
                <v-btn fab small :disabled="i== 0" @click="moveUp(i)"><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
                <v-btn fab small :disabled="i == settings.length - 1" @click="moveDown(i)"><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
                <v-btn fab small dark color="blue-grey" :to="'/setting/' + setting.id"><v-icon>mdi-cog</v-icon></v-btn>
                <v-btn fab small dark color="blue-grey" @click="deleteValue(i)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-container>
      </v-list-item>
    </v-list>
    <v-layout row justify-center align-center>
      <v-btn rounded dark color="blue-grey" :to="getRoute()"><v-icon>mdi-plus</v-icon>Add New Setting</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'settings-page',
    data: function () {
      return {
        settings: [],
        values: {}
      }
    },
    methods: {
      getRoute () {
        if (this.settings.length > 0) {
          return '/setting/' + (Math.max.apply(this, this.settings.map(o => parseInt(o.id))) + 1)
        } else {
          return '/setting/0'
        }
      },
      deleteValue (index) {
        this.settings.splice(index, 1)
        this.$store.dispatch('deleteSetting', index)
      },
      moveUp (index) {
        this.settings.splice(index - 1, 0, this.settings.splice(index, 1)[0])
        const to = index - 1
        this.$store.dispatch('moveSetting', {from: index, to: to})
      },
      moveDown (index) {
        this.settings.splice(index + 1, 0, this.settings.splice(index, 1)[0])
        const to = index + 1
        this.$store.dispatch('moveSetting', {from: index, to: to})
      }
    },
    beforeMount: function () {
      this.settings = JSON.parse(JSON.stringify(this.$store.state.Settings.settings))
      console.log(this.settings)
    }
  }
</script>