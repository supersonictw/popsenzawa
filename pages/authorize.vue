<template>
  <v-row>
    <v-col class="text-center">
      <v-btn>Redirecting...</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async mounted() {
    if (location.hash.length <= 1) return
    const hashValue = location.hash.substring(1)
    const params = new URLSearchParams(hashValue)
    const accessToken = params.get('access_token')
    if (accessToken) {
      await this.$axios.get(`authorize/${accessToken}`)
    }
    this.$router.push('/')
  },
}
</script>
