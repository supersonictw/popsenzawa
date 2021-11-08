<template>
  <v-app dark>
    <v-card>
      <v-card-title v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </v-card-title>
      <v-card-title v-else>
        {{ otherError }}
      </v-card-title>
      <v-card-actions>
        <v-btn class="primary" nuxt to="/"> Home page </v-btn>
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
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
