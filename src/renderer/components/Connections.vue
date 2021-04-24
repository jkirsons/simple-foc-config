<template>
  <v-data-table
    :headers="headers"
    :items="settings"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Connections</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue-grey"
              dark rounded
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Connection
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field
                      v-model="editedItem.motor"
                      label="Motor"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" >
                    <v-text-field
                      v-model="editedItem.connection"
                      label="Connection"
                    ></v-text-field>
                  </v-col>                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'connections-page',
    data: function () {
      return {
        settings: [],
        headers: [
          { text: 'Connection', value: 'connection' },
          { text: 'ID', value: 'id' },
          { text: 'Type', value: 'type' },
          { text: 'Port', value: 'port' },
          { text: 'Speed', value: 'speed' },
          { text: 'Address', value: 'Address' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {
          motor: '',
          id: 0,
          connection: 0
        },
        defaultItem: {
          motor: '',
          id: 0,
          connection: 0
        }
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Connection' : 'Edit Connection'
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

      editItem (item) {
        this.editedIndex = this.settings.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.settings.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.settings.splice(this.editedIndex, 1)
        this.closeDelete()
        this.updateStore()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.settings[this.editedIndex], this.editedItem)
        } else {
          this.settings.push(this.editedItem)
        }
        this.close()
        this.updateStore()
      },

      updateStore () {
        this.$store.dispatch('setConnections', this.settings)
      }

    },
    beforeMount: function () {
      this.$store.dispatch('initConnections')
      this.settings = JSON.parse(JSON.stringify(this.$store.state.Motors.connections))
      console.log(this.settings)
    }
  }
</script>