<template>
  <v-card flat>
    <v-card-title>PopSenzawa (popcat-active)</v-card-title>
    <v-card class="overflow-y-auto" width="350" :max-height="height">
      <v-card-text>
        <a
          href="https://github.com/supersonictw/popcat-active"
          rel="noopener noreferrer"
          target="_blank"
        >
          popcat-active
        </a>
        is an opensource project,<br />
        the web client of
        <a
          href="https://github.com/supersonictw/popcat-echo"
          rel="noopener noreferrer"
          target="_blank"
        >
          popcat-echo</a
        >, built by Vue.js 2 and Nuxt.js.
      </v-card-text>
      <v-card-text>
        The project is not related to real `Senzawa`, it's just for fun and
        testing.
        <br />
        The copyright of resources are listed on
        <a
          href="https://github.com/supersonictw/popcat-active/blob/main/COPYING"
          rel="noopener noreferrer"
          target="_blank"
          >COPYING</a
        >.
      </v-card-text>
      <v-card-text> The project NEVER take any profitable. </v-card-text>
    </v-card>
    <v-card-actions class="cyan action-bar">
      <v-spacer />
      <v-btn class="cyan darken-4" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ComponentInformation',
  computed: {
    height() {
      return window.innerHeight - 150
    },
  },
}
</script>

<style scoped>
.action-bar {
  width: 100%;
}
</style>
