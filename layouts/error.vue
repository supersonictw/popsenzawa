<template>
  <v-app dark>
    <v-card class="my-15 mx-9">
      <v-card-title> PopSenzawa (popcat-active) </v-card-title>
      <v-card-subtitle>> Client Error</v-card-subtitle>
      <v-card-text>
        Message:
        <span v-if="error.statusCode === 404">
          &quot;{{ pageNotFound }}&quot;
        </span>
        <span v-else> &quot;{{ otherError }}&quot; </span>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary" @click="retry">Retry</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'LayoutError',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    retry() {
      location.reload()
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
