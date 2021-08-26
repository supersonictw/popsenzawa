<template>
  <v-card flat>
    <v-card-title> Worldwide: {{ leaderboard.global }}</v-card-title>
    <v-card class="overflow-y-auto" width="350" :max-height="height">
      <v-list>
        <v-list-item v-for="(value, key) in leaderboard.regions" :key="key">
          {{ key }}: {{ value }}
        </v-list-item>
      </v-list>
    </v-card>
    <v-card-actions class="red action-bar">
      <v-spacer />
      <v-btn class="amber darken-4" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BigJSON from 'json-bigint'
import BigNumber from 'bignumber.js'

export default {
  name: 'Leaderboard',
  data: () => ({
    leaderboard: {
      global: new BigNumber(0),
      regions: {},
    },
  }),
  computed: {
    height() {
      return window.innerHeight - 150
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'test') return
    this.listener = this.$sse.create()
    this.listener.on('message', this.update)
    this.listener.connect()
  },
  methods: {
    update(response) {
      response = BigJSON.parse(response)
      this.leaderboard.global = response.global
      for (const i in response.regions) {
        response.regions[i] = new BigNumber(response.regions[i])
      }
      this.leaderboard.regions = Object.entries(response.regions)
        .sort(([, a], [, b]) => a.lt(b))
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    },
  },
}
</script>

<style scoped>
.action-bar {
  width: 100%;
}
</style>
