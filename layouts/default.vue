<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list v-if="!$store.state.loaded">
        <v-list-item>
          <v-list-item-content>
            <v-progress-circular
              indeterminate
              color="amber darken-3"
            ></v-progress-circular>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else-if="!$store.state.profile.identity">
        <v-list-item nuxt to="/">
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Introduction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt to="/login">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item nuxt to="/">
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Introduction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt to="/user">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-run</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: 'VHS',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('vhs_auth')
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar-title {
  margin: auto 3px;
}
</style>
