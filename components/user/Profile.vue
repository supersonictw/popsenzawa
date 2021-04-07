<template>
  <v-card>
    <v-card-title>
      <v-avatar>
        <img :src="profile.picture" :alt="profile.name" />
      </v-avatar>
      <v-card-title>
        {{ profile.name }}
      </v-card-title>
    </v-card-title>
    <v-card-subtitle>
      {{ profile.email }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$auth.$state.user
    },
  },
}
</script>
