<template>
  <v-row>
    <v-col class="text-center">
      <v-btn @click="login">Authorize with Google</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    name: 'Login',
    login() {
      this.$auth.loginWith('google')
    },
  },
}
</script>
