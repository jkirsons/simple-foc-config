<template>
  <div style='font-size: 12px;' v-html="this.$store.state.SerialState.message"></div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        message: this.$store.state.SerialState.message
      }
    }
  }
</script>

