<template>
  <v-app :style="wrapper" dark>
    <v-main>
      <v-container id="container">
        <pop />
        <div class="board-btn-row">
          <v-btn size="x-large" color="black" class="mx-1" rounded @click="info = true">
            <v-icon size="x-large">mdi-information</v-icon>
          </v-btn>
          <v-btn size="x-large" color="black" class="mx-1" rounded @click="board = true">
            <v-icon size="x-large">mdi-earth</v-icon>
          </v-btn>
        </div>
        <v-overlay v-model="info" class="align-center justify-center">
          <information @close="info = false" />
        </v-overlay>
        <v-overlay v-model="board" class="align-center justify-center">
          <leaderboard @close="board = false" />
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';

import Pop from './components/Pop.vue'
import Leaderboard from './components/Leaderboard.vue'
import Information from './components/Information.vue'

const info = ref(false);
const board = ref(false);

const wrapper = computed(() => {
  const num = Math.floor(Math.random() * 8) + 1
  return `background: 100% 100% url('image/background/bg${num}.gif')`
});
</script>

<style lang="scss" scoped>
.v-app-bar-title {
  margin: auto 3px;
}

#container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.board-btn-row {
  width: 100%;
  position: fixed;
  bottom: 30px;
}
</style>
