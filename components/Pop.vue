<template>
  <v-card class="text-center">
    <v-img
      class="meow-btn"
      alt="Meow"
      width="100%"
      height="100%"
      :src="buttonImage"
      @mousedown="meow"
      @mouseup="release"
    />
    <h1>{{ count }}</h1>
  </v-card>
</template>

<script>
import qs from 'query-string'
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
  name: 'Pop',
  data: () => ({
    ready: false,
    recovery: false,
    bot: false,
    nextToken: '',
    captchaToken: '',
    count: new BigNumber(0),
    accumulator: new BigNumber(0),
    pressing: false,
  }),
  computed: {
    buttonImage() {
      return this.pressing ? './button/pressed.png' : './button/release.png'
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'test') return
    this.push()
    if (localStorage.getItem('bot')) {
      this.bot = Boolean(localStorage.getItem('bot'))
    }
    if (localStorage.getItem('count')) {
      this.count = new BigNumber(localStorage.getItem('count'))
    }
    window.addEventListener('keydown', this.meow)
    window.addEventListener('keyup', this.release)
  },
  beforeDestroy() {
    window.addEventListener('keydown', this.meow)
    window.addEventListener('keyup', this.release)
  },
  methods: {
    meow() {
      this.pressing = true
      this.count.add(1)
      this.accumulator.add(1)
      localStorage.setItem('count', this.count.toString())
    },
    release() {
      this.pressing = false
    },
    getAppend() {
      let append
      if (this.accumulator.gt(MAX_POPS)) {
        append = MAX_POPS
        this.accumulator.sub(MAX_POPS)
      } else {
        append = this.accumulator
        this.accumulator = new BigNumber(0)
      }
      return append
    },
    unpackResult(response, append) {
      const result = response.data
      if ('new_token' in result) {
        this.nextToken = result.new_token
      }
      if (response.status === 200 || !('new_token' in result)) {
        this.accumulator.add(append)
      }
    },
    async post(append) {
      const query = qs.stringify({
        token: this.nextToken,
        count: append.toString(),
        captcha_token: this.captchaToken,
      })
      try {
        const response = await this.$axios.post(`/pop?${query}`)
        if (response.status === 200) {
          if (!this.ready) {
            this.ready = true
          }
          if (this.recovery && append.eq(0)) {
            this.recovery = false
          }
          this.unpackResult(response, append)
        } else if (response.status === 201) {
          if (this.recovery) {
            this.recovery = false
          }
          this.unpackResult(response, append)
        }
      } catch (e) {
        this.recovery = true
        this.nextToken = ''
        this.accumulator.add(append)
      }
    },
    async push() {
      if (
        !this.bot &&
        (this.accumulator.gt(0) || !this.ready || this.recovery)
      ) {
        await this.post(this.getAppend())
      }
      setTimeout(this.push, SEND_DELAY)
    },
  },
}
</script>

<style scoped>
.meow-btn {
  cursor: pointer !important;
}
</style>
