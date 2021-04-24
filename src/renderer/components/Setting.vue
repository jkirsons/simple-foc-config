<template>
  <v-container>
    <v-btn rounded dark color="blue-grey" @click="$router.go(-1)">Back</v-btn>
    <br><br>
    <v-card elevation="2">
      <v-card-title>Value</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col><v-text-field label="Name" v-model="setting.text"></v-text-field></v-col>
            <v-col><v-text-field disabled label="Identifier" v-model="setting.id"></v-text-field></v-col>
          </v-row>
        </v-container>
        Type:<br>
        <v-btn-toggle
          v-model="setting.type"
          mandatory dense rounded
          color="white"
          active-class="blue-grey"
        >
          <v-btn>Slider</v-btn>
          <v-btn>Value</v-btn>
          <v-btn>Slider + Value</v-btn>
          <v-btn>Selection</v-btn>
          <v-btn>Checkbox</v-btn>
        </v-btn-toggle><br><br>
        <v-text-field label="Default Value" v-model="setting.defaultValue"></v-text-field>
        <v-container>
          <v-row>
            <v-col><v-text-field label="Minimum" v-model="setting.min" v-show="[0,1,2].includes(setting.type)"></v-text-field></v-col>
            <v-col><v-text-field label="Maximum" v-model="setting.max" v-show="[0,1,2].includes(setting.type)"></v-text-field></v-col>
          </v-row>
        </v-container>
        <v-text-field label="Step" v-model="setting.step" v-show="[0,2].includes(setting.type)"></v-text-field>
        <div v-show="[3].includes(setting.type)">
          Add New Value:<br>
          <v-container>
            <v-row>
              <v-col><v-text-field label="Value" v-model="newValue" /></v-col>
              <v-col><v-text-field label="Text" v-model="newText" /></v-col>
              <v-col><v-btn @click="addValue">Add Value</v-btn></v-col>
            </v-row>
          </v-container>
          Possible Values:<br>
          <v-list dense>
            <v-list-item v-for="(item, index) in setting.possibleValues" :key="item.value">
              <v-list-item-subtitle label="Value" v-text="item.value"></v-list-item-subtitle>
              <v-list-item-subtitle label="Text" v-text="item.text"></v-list-item-subtitle>
              <v-btn fab small :disabled="index == 0" @click="moveUp(index)"><v-icon>mdi-arrow-up-bold</v-icon></v-btn>
              &nbsp;
              <v-btn fab small :disabled="index == setting.possibleValues.length - 1" @click="moveDown(index)"><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
              &nbsp;&nbsp;&nbsp;
              <v-btn fab small @click="deleteValue(index)"><v-icon>mdi-delete</v-icon></v-btn>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card><br><br>

    <v-card elevation="2">
      <v-card-text>
        <v-card-title>Commands</v-card-title>
        <v-switch label="Send Command Immediately Upon Change" v-model="setting.sendImmediately"></v-switch>
        <v-switch label="Prepend Motor ID to Command" v-model="setting.prepend"></v-switch>
        <v-text-field label="Command" v-model="setting.command"></v-text-field>
        <v-text-field label="Response" v-model="setting.response"></v-text-field>
        <v-text-field label="Group" v-model="setting.group"></v-text-field>
        Colour:<br>
        <v-color-picker label="Colour" v-model="setting.colour" hide-mode-switch hide-inputs elevation=5></v-color-picker>
      </v-card-text>
    </v-card>


    <v-bottom-navigation app height="128">
        <v-card elevation="0" width="160">
          <v-card-title>Test:</v-card-title>
        </v-card>
        <v-card elevation="0" width="360">
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
                  v-model="value"
                ></v-slider>
              </v-col>
              <v-col v-if="[1,2].includes(setting.type)">
                <v-text-field v-model="value" solo></v-text-field>
              </v-col>
              <v-col v-if="[3].includes(setting.type)">
                <v-btn-toggle
                v-model="value"
                light mandatory rounded
                color="white"
                active-class="blue-grey"
              >
                <v-btn v-for="(item, index) in setting.possibleValues" :key="index" :height="32" :value="item.text">{{ item.text }}</v-btn>
              </v-btn-toggle>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
    </v-bottom-navigation>

  </v-container>
</template>

<script>
  export default {
    name: 'setting-page',
    props: { identifier: String },
    data: function () {
      return {
        setting: {
          id: 1,
          text: '',
          type: 0,
          defaultValue: 0,
          min: 0,
          max: 1,
          step: 0.01,
          possibleValues: [],
          sendImmediately: false,
          prepend: true,
          command: '',
          response: '',
          group: 'default',
          colour: '#546E7A'
        },
        value: 0,
        newValue: '',
        newText: ''
      }
    },
    methods: {
      addValue () {
        this.setting.possibleValues.push({ value: this.newValue, text: this.newText })
      },
      deleteValue (index) {
        this.setting.possibleValues.splice(index, 1)
      },
      moveUp (index) {
        this.setting.possibleValues.splice(index - 1, 0, this.setting.possibleValues.splice(index, 1)[0])
      },
      moveDown (index) {
        this.setting.possibleValues.splice(index + 1, 0, this.setting.possibleValues.splice(index, 1)[0])
      }
    },
    watch: {
      setting: {
        deep: true,
        handler (val) {
          if (val !== undefined) {
            this.$store.dispatch('setSetting', val)
            console.log(val)
          }
        }
      }
    },
    beforeMount: function () {
      console.log(this.$route.params.id)
      // console.log(this.$store.state.Settings.settings.filter(obj => obj.id === this.$route.params.id)[0])
      if (this.$route.params.id >= this.$store.state.Settings.settings.length) {
        console.log('Setting init parameters')
        this.setting = {
          id: parseInt(this.$route.params.id),
          text: '',
          type: 0,
          defaultValue: 0,
          min: 0,
          max: 1,
          step: 0.01,
          possibleValues: [],
          sendImmediately: false,
          prepend: true,
          command: '',
          response: '',
          group: 'default',
          colour: '#546E7A'
        }
      } else {
        console.log('loading parameters')
        this.setting = this.$store.state.Settings.settings.filter(obj => obj.id === parseInt(this.$route.params.id))[0]
      }
    }
  }
</script>