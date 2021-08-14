<template>
  <v-btn @click="meow">Meow</v-btn>
</template>

<script>
import qs from 'query-string'

export default {
  name: 'Index',
  data: () => ({
    accumulator: 0,
    nextToken: '',
    captchaToken: '',
  }),
  mounted() {
    this.send()
  },
  methods: {
    meow() {
      this.accumulator++
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
