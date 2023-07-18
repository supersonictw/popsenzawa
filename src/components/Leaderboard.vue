<template>
  <v-card color="red-darken-2" flat>
    <v-card-title> Worldwide: {{ global }}</v-card-title>
    <v-card class="overflow-y-auto" width="350" :max-height="height" flat>
      <v-list bg-color="black">
        <v-list-item v-for="(value, key) in regions" :key="key">
          {{ getRegionFlag(key) }} {{ key }}: {{ value }}
        </v-list-item>
      </v-list>
    </v-card>
    <v-card-actions>
      <v-spacer />
      <v-btn color="amber-darken-4" variant="flat" @click="$emit('close')">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

import getFlag from 'country-code-to-flag-emoji';

import {
  clientBaseUrl as echoClientBaseUrl
} from '../clients/echo';

const global = ref(0);
const regions = ref({});

const height = computed(() => {
  return window.innerHeight - 150
})

function getRegionFlag(regionCode) {
  if (regionCode === "Unknown") {
    return "❓";
  } else {
    return getFlag(regionCode);
  }
}

function onMessage(response) {
  const { data: dataText } = response;
  const dataJson = JSON.parse(dataText);
  global.value = dataJson.global;
  regions.value = Object.entries(dataJson.regions)
    .sort(([, a], [, b]) => (a.lt(b) ? 1 : -1))
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
}

onMounted(() => {
  const eventSourceUrl = `${echoClientBaseUrl}/leaderboard`;
  const eventSource = new EventSource(eventSourceUrl)
  eventSource.addEventListener("message", onMessage);

  onBeforeUnmount(() => {
    eventSource.removeEventListener("message", onMessage);
    eventSource.close();
  });
});
</script>

<style scoped>
.action-bar {
  width: 100%;
}
</style>
