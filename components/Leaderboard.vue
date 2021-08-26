<template>
  <v-card>
    <v-card-title> Worldwide: {{ leaderboard.global }}</v-card-title>
    <v-list>
      <v-list-item v-for="(value, key) in leaderboard.regions" :key="key">
        {{ key }}: {{ value }}
      </v-list-item>
    </v-list>
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
