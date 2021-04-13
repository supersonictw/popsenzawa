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
    this.$router.replace('/')
  },
}
</script>
