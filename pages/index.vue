<template>
  <div>
    <v-card class="text-center my-10 py-5">
      <v-card-text>{{ count }}</v-card-text>
      <v-btn @click="meow">Meow</v-btn>
    </v-card>
    <v-card>
      <v-card-title> Worldwide: {{ leaderboard.global }} </v-card-title>
      <v-list>
        <v-list-item v-for="(value, key) in leaderboard.regions" :key="key">
          {{ key }}: {{ value }}
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import qs from 'query-string'
import { decode } from 'js-base64'
import BigJSON from 'json-bigint'

const SEND_DELAY = parseInt(process.env.sendDelay)

export default {
  name: 'Index',
  data: () => ({
    ready: false,
    recovery: false,
    count: 0,
    bot: false,
    listener: null,
    accumulator: 0,
    nextToken: '',
    captchaToken: '',
    leaderboard: {
      global: null,
      regions: {},
    },
    profile: {
      sub: '',
    },
  }),
  mounted() {
    if (process.env.NODE_ENV === 'test') return
    this.pushPops()
    this.listener = this.$sse.create()
    this.listener.on('message', this.updateLeaderboard)
    if (localStorage.getItem('count')) {
      this.count = parseInt(localStorage.getItem('count'))
    }
    if (localStorage.getItem('bot')) {
      this.bot = Boolean(localStorage.getItem('bot'))
    }
    this.listener.connect()
  },
  methods: {
    meow() {
      this.count++
      this.accumulator++
      this.leaderboard.global++
      if (this.profile.sub in this.leaderboard.regions) {
        this.leaderboard.regions[this.profile.sub]++
      } else {
        this.leaderboard.regions[this.profile.sub] = 1
      }
      localStorage.setItem('count', this.count)
    },
    updateLeaderboard(response) {
      response = BigJSON.parse(response)
      this.leaderboard.global = response.global
      this.leaderboard.regions = response.regions
    },
    async pushPops() {
      if (!this.bot && (this.accumulator || !this.ready || this.recovery)) {
        const append = this.accumulator
        this.accumulator = 0
        const query = qs.stringify({
          count: append,
          token: this.nextToken,
          captcha_token: this.captchaToken,
        })
        try {
          const response = await this.$axios.post(`/pop?${query}`)
          const result = response.data
          if ('new_token' in result) {
            if (!this.ready) {
              this.ready = true
              this.profile = BigJSON.parse(
                decode(result.new_token.split('.')[1])
              )
            }
            if (this.recovery) {
              if (response.status === 200) {
                this.accumulator += append
              }
              if (response.status === 201) {
                this.recovery = false
              }
            }
            this.nextToken = result.new_token
          } else {
            this.accumulator += append
          }
        } catch (e) {
          this.recovery = true
          this.nextToken = ''
          this.accumulator += append
        }
      }
      setTimeout(this.pushPops, SEND_DELAY)
    },
  },
}
</script>
