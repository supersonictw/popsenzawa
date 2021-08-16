<template>
  <div>
    <v-btn @click="meow">Meow</v-btn>
    <v-card>
      <div>{{ leaderboard }}</div>
    </v-card>
  </div>
</template>

<script>
import qs from 'query-string'

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
    this.send()
    this.listener = this.$sse.create()
    this.listener.on('messages', this.updateLeaderboard)
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
    async send() {
      const query = qs.stringify({
        count: this.accumulator,
        token: this.nextToken,
        captcha_token: this.captchaToken,
      })
      const result = await this.$axios.$post(`/pop?${query}`)
      if ('next_token' in result) {
        this.nextToken = result.next_token
      }
      setTimeout(this.send, 5000)
    },
  },
}
</script>
