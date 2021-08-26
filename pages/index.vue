<template>
  <v-container>
    <pop />
    <div class="board-btn-row">
      <v-btn x-large rounded @click="board = true">
        <v-icon x-large>mdi-earth</v-icon>
      </v-btn>
    </div>
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

export default {
  name: 'Index',
  components: { Leaderboard, Pop },
  data: () => ({
    board: false,
  }),
}
</script>

<style lang="scss" scoped>
.board-btn-row {
  width: 100%;
  position: fixed;
  bottom: 30px;
}
</style>
