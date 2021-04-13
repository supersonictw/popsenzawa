<template>
  <v-card>
    <v-card-title>
      <v-avatar>
        <img :src="picture" :alt="name" />
      </v-avatar>
      <v-card-title>
        {{ name }}
      </v-card-title>
    </v-card-title>
    <v-card-subtitle>
      {{ email }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: '',
    picture: '',
    email: '',
  }),
  mounted() {
    const profile = this.$store.state.profile
    if (profile) {
      Object.keys(profile).forEach((i) => {
        this[i] = profile[i]
      })
    } else {
      this.$router.replace('/')
    }
  },
}
</script>
