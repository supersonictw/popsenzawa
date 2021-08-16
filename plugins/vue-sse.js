import Vue from 'vue'
import VueSSE from 'vue-sse'

export default function (context) {
  Vue.use(VueSSE, {
    url: context.env.popApiHost + '/leaderboard?stream=messages',
    polyfill: true,
    format: 'plain',
  })
}
