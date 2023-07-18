<template>
  <v-card color="red-darken-2" flat>
    <v-card-title> Worldwide: {{ globalSum }}</v-card-title>
    <v-card class="overflow-y-auto" width="350" :max-height="height" flat>
      <v-list bg-color="black">
        <v-list-item v-for="(value, key) in regionMapSorted" :key="key">
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

const globalSum = ref(0);
const regionMap = ref({});

const regionMapSorted = computed(() => Object.entries(regionMap.value)
  .sort(([, a], [, b]) => (a < b ? 1 : -1))
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
);

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

  const {
    type: messageType,
    pops: messagePops,
  } = dataJson;

  switch (messageType) {
    case "init_pop": {
      const {
        global_sum: initGlobalSum,
        region_map: initRegionMap,
      } = messagePops;

      globalSum.value = initGlobalSum;
      regionMap.value = initRegionMap;

      break;
    }
    case "next_pop": {
      const {
        region_code: regionCode,
        count_append: countAppend,
      } = messagePops;

      globalSum.value += countAppend;

      if (regionCode in regionMap.value) {
        regionMap.value[regionCode] += countAppend;
      } else {
        regionMap.value[regionCode] = countAppend;
      }

      break;
    }
  }
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
