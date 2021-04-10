<template>
  <v-row>
    <v-col class="text-center">
      <v-btn x-large @click="login">
        <v-icon left> mdi-google </v-icon>
        Authorize with Google
      </v-btn>
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
