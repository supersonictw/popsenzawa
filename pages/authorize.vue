<template>
  <v-row>
    <v-col class="text-center">
      <v-btn>Redirecting...</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Authorize',
  head: {
    title: 'Authorize',
  },
  mounted() {
    if (location.hash.length <= 1) return
    const hashValue = location.hash.substring(1)
    const params = new URLSearchParams(hashValue)
    const accessToken = params.get('access_token')
    localStorage.setItem('vhs_auth', accessToken)
    this.$router.replace('/')
  },
}
</script>
