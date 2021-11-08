<template>
  <v-container id="container">
    <pop />
    <div class="board-btn-row">
      <v-btn x-large rounded @click="info = true">
        <v-icon x-large>mdi-information</v-icon>
      </v-btn>
      <v-btn x-large rounded @click="board = true">
        <v-icon x-large>mdi-earth</v-icon>
      </v-btn>
    </div>
    <v-overlay v-model="info">
      <information @close="info = false" />
    </v-overlay>
    <v-overlay v-model="board">
      <keep-alive>
        <leaderboard @close="board = false" />
      </keep-alive>
    </v-overlay>
  </v-container>
</template>

<script>
import Pop from '~/components/Pop'
import Leaderboard from '~/components/Leaderboard'
import Information from '~/components/Information'

export default {
  name: 'PageIndex',
  components: { Information, Leaderboard, Pop },
  data: () => ({
    info: false,
    board: false,
  }),
}
</script>

<style lang="scss" scoped>
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
