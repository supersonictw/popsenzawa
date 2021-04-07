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
    await this.$axios.get('authorize')
    await this.$router.push('/')
  },
}
</script>
