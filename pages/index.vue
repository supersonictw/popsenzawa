<template>
  <div>
    <v-card class="text-center my-10 py-5">
      <v-btn @click="meow">Meow</v-btn>
    </v-card>
    <v-card>
      <v-card-title> Worldwide: {{ leaderboard.global }} </v-card-title>
      <v-list>
        <v-list-item v-for="(count, key) in leaderboard.regions" :key="key">
          {{ key }}: {{ count }}
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import qs from 'query-string'

const SEND_DELAY = parseInt(process.env.sendDelay)

export default {
  name: 'Index',
  data: () => ({
    listener: null,
    accumulator: 0,
    nextToken: '',
    captchaToken: '',
    leaderboard: {
      global: null,
      regions: {},
    },
  }),
  mounted() {
    this.pushPops()
    this.listener = this.$sse.create()
    this.listener.on('message', this.updateLeaderboard)
    if (process.env.NODE_ENV !== 'test') {
      this.listener.connect()
    }
  },
  methods: {
    meow() {
      this.accumulator++
    },
    updateLeaderboard(response) {
      this.leaderboard.global = response.global
      this.leaderboard.regions = response.regions
    },
    async pushPops() {
      if (this.accumulator) {
        const append = this.accumulator
        this.accumulator = 0
        const query = qs.stringify({
          count: append,
          token: this.nextToken,
          captcha_token: this.captchaToken,
        })
        const result = await this.$axios.$post(`/pop?${query}`)
        if ('new_token' in result) {
          this.nextToken = result.new_token
        } else {
          this.accumulator += append
        }
      }
      setTimeout(this.pushPops, SEND_DELAY)
    },
  },
}
</script>
