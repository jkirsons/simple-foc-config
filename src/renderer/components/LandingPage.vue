<template>
  <v-container>
    <v-sheet
      min-height="70vh"
      rounded="lg"
    >
      <system-information></system-information>
      <!--  -->
    </v-sheet>
  </v-container>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation }
  }
</script>