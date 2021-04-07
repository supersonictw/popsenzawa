<template>
  <v-row>
    <v-col class="text-center">
      <p>{{ profile }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    profile: {},
  }),
  async fetch({ $axios }) {
    this.profile = await $axios.get('http://10.123.2.192:8080/profile', {
      withCredentials: true,
    })
  },
  fetchOnServer: false,
}
</script>
