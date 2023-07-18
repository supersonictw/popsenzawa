<template>
  <v-card color="cyan-darken-2" class="text-white" flat>
    <v-card-title>
      PopSenzawa (popsenzawa-active)
    </v-card-title>
    <v-card class="overflow-y-auto" width="350" :max-height="height" color="black" flat>
      <v-card-text>
        <a href="https://github.com/supersonictw/popsenzawa-active" rel="noopener noreferrer" target="_blank"
          class="text-cyan text-decoration-none">
          popsenzawa-active
        </a>
        is an opensource project,<br />
        the web client of
        <a href="https://github.com/supersonictw/popsenzawa-echo" rel="noopener noreferrer" target="_blank"
          class="text-cyan text-decoration-none">
          popsenzawa-echo
        </a>
        , built by Vue.js 3 and Vite.
      </v-card-text>
      <v-card-text>
        The project is not related to real `Senzawa`, it's just for fun and
        testing.
        <br />
        The copyright of resources are listed on
        <a href="https://github.com/supersonictw/popsenzawa-active/blob/main/COPYING" rel="noopener noreferrer"
          target="_blank" class="text-cyan text-decoration-none">
          COPYING
        </a>.
      </v-card-text>
      <v-card-text>
        The project NEVER take any profitable.
      </v-card-text>
    </v-card>
    <v-card-actions>
      <v-spacer />
      <v-btn color="cyan-darken-4" variant="flat" @click="$emit('close')">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const height = computed(() =>
  window.innerHeight - 150
)
</script>

<style scoped>
.action-bar {
  width: 100%;
}
</style>
