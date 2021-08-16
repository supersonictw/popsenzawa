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
import BigNumber from 'bignumber.js'

BigNumber.prototype.add = function (n) {
  Object.assign(this, this.plus(n))
}
BigNumber.prototype.sub = function (n) {
  Object.assign(this, this.minus(n))
}

const MAX_POPS = parseInt(process.env.maxPops)
const SEND_DELAY = parseInt(process.env.sendDelay)

export default {
  name: 'Index',
  data: () => ({
    ready: false,
    recovery: false,
    count: new BigNumber(0),
    bot: false,
    listener: null,
    accumulator: new BigNumber(0),
    delay_accumulator: new BigNumber(0),
    nextToken: '',
    captchaToken: '',
    leaderboard: {
      global: new BigNumber(0),
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
      this.count = new BigNumber(localStorage.getItem('count'))
    }
    if (localStorage.getItem('bot')) {
      this.bot = Boolean(localStorage.getItem('bot'))
    }
    this.listener.connect()
  },
  methods: {
    meow() {
      this.count.add(1)
      this.accumulator.add(1)
      this.delay_accumulator.add(1)
      this.leaderboard.global.add(1)
      if (this.profile.sub in this.leaderboard.regions) {
        this.leaderboard.regions[this.profile.sub].add(1)
      } else {
        this.leaderboard.regions[this.profile.sub] = new BigNumber(1)
      }
      localStorage.setItem('count', this.count.toString())
    },
    updateLeaderboard(response) {
      response = BigJSON.parse(response)
      response.global = new BigNumber(response.global)
      for (const i in response.regions) {
        response.regions[i] = new BigNumber(response.regions[i])
      }
      if (this.delay_accumulator.gt(0)) {
        response.global.add(this.delay_accumulator)
        response.regions[this.profile.sub].add(this.delay_accumulator)
      }
      this.leaderboard.global = response.global
      this.leaderboard.regions = response.regions
    },
    async pushPops() {
      if (
        !this.bot &&
        (this.accumulator.gt(0) || !this.ready || this.recovery)
      ) {
        let append
        if (this.accumulator.gt(MAX_POPS)) {
          append = MAX_POPS
          this.accumulator.sub(MAX_POPS)
        } else {
          append = this.accumulator
          this.accumulator = new BigNumber(0)
        }
        const query = qs.stringify({
          token: this.nextToken,
          count: append.toString(),
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
                this.accumulator.add(append)
              }
              if (response.status === 201) {
                this.recovery = false
              }
            }
            if (response.status === 201) {
              this.delay_accumulator = new BigNumber(0)
            }
            this.nextToken = result.new_token
          } else {
            this.accumulator.add(append)
          }
        } catch (e) {
          this.recovery = true
          this.nextToken = ''
          this.accumulator.add(append)
        }
      }
      setTimeout(this.pushPops, SEND_DELAY)
    },
  },
}
</script>
