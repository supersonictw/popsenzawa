import Vue from 'vue'
import VueSSE from 'vue-sse'

export default function (context) {
  Vue.use(VueSSE, {
    url: context.env.popApiHost + '/leaderboard',
    polyfill: true,
    format: 'plain',
  })
}
