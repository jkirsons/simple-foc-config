<template>
  <v-container>
    <v-row>
      <v-col sm=3>
        <v-card
          class="mx-auto"
          max-width="300"
          tile
        >
          <v-list-item-group
            color="primary"
            multiple
            v-model="selectedMotors"
          >
            <v-list rounded>
                <v-list-item-action-text>
                  Select All
                </v-list-item-action-text>
              <v-list-item-action>
                <v-checkbox :indeterminate="someNodesSelected" :input-value="allNodesSelected"  @click="toggleCompleteSelection" />
              </v-list-item-action>
              <v-list-item v-for="(item) in motors" :key="item.title">
                  <v-list-item-subtitle label="Value" v-text="item.title"></v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-list-item-group>
        </v-card>
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="settings"
          class="elevation-1"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'motor-config-page',
    data: function () {
      return {
        settings: [],
        headers: [
          { text: 'Setting', value: 'text' },
          { text: 'Value', value: 'display' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        dialog: false,
        dialogDelete: false,
        selectedMotors: [],
        motors: [{title: 'Motor 1'}, {title: 'Motor 2'}, {title: 'Motor 3'}]
      }
    },
    computed: {
      noNodesSelected () {
        return this.selectedMotors.length === 0
      },
      someNodesSelected () {
        return this.selectedMotors.length > 0 && !this.allNodesSelected
      },
      allNodesSelected () {
        return (
          this.selectedMotors.length === this.motors.length
        )
      }
    },
    methods: {
      moveUp (index) {
        this.settings.splice(index - 1, 0, this.settings.splice(index, 1)[0])
        this.updateStore()
      },
      moveDown (index) {
        this.settings.splice(index + 1, 0, this.settings.splice(index, 1)[0])
        this.updateStore()
      },

      updateStore () {
        this.$store.dispatch('setMotorSettingValues', this.settings)
      },

      toggleCompleteSelection () {
        if (this.selectedMotors.length < this.motors.length) {
          this.selectedMotors = this.motors.map((node, index) => index)
        } else {
          this.selectedMotors = []
        }
      }

    },
    beforeMount: function () {
      this.$store.dispatch('initMotorSettingValues')
      this.settings = JSON.parse(JSON.stringify(this.$store.state.Motors.motor_setting_values))
      console.log(this.settings)
    }
  }
</script>