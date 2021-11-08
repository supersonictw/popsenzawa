<template>
  <v-app :style="wrapper" dark>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutDefault',
  computed: {
    wrapper() {
      const num = Math.floor(Math.random() * 8) + 1
      return `background: 100% 100% url('image/background/bg${num}.gif')`
    },
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar-title {
  margin: auto 3px;
}
</style>
