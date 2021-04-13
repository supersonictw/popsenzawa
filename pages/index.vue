<template>
  <v-row justify="center" align="center">
    <Notice v-show="notice" :text="notice" />
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline">Virtual Host System</v-card-title>
        <v-card-text>
          <p>
            Virtual Host System(VHS) is the websites hosting system for
            education.
          </p>
          <p>
            Project information:
            <a
              href="https://github.com/supersonictw?tab=projects&q=vhs"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Project"
            >
              GitHub
            </a>
          </p>
          <p>
            Frontend Source:
            <a
              href="https://github.com/supersonictw/virtual_host-client"
              target="_blank"
              rel="noopener noreferrer"
              title="Repository"
            >
              Repository
            </a>
          </p>
          <p>
            Backend Source:
            <a
              href="https://github.com/supersonictw/virtual_host-server"
              target="_blank"
              rel="noopener noreferrer"
              title="Repository"
            >
              Repository
            </a>
          </p>
          <p>
            The project is inspired by
            <a
              href="https://www.nkust.edu.tw"
              target="_blank"
              rel="noopener noreferrer"
              title="NKUST"
            >
              National Kaohsiung University of Science and Technology
            </a>
            .
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="!$store.state.profile.identity"
            color="primary"
            nuxt
            to="/login"
          >
            Continue
          </v-btn>
          <v-btn v-else color="primary" nuxt to="/user"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Notice from '~/components/user/Notice'

export default {
  name: 'Introduction',
  components: {
    Logo,
    Notice,
  },
  data: () => ({
    notice: '',
  }),
  head: {
    title: 'Introduction',
  },
  mounted() {
    const accessToken = localStorage.getItem('vhs_auth')
    if (!accessToken) {
      this.$router.push('/')
      return
    }
    this.$axios.setHeader('Authorization', `Bearer ${accessToken}`)
    this.$axios
      .get('profile')
      .then((resp) => {
        this.$store.commit('setProfile', resp.data.data)
      })
      .catch(() => {
        localStorage.removeItem('vhs_auth')
        this.notice = 'Authentication failed'
        if (this.$store.state.profile.identity) {
          this.$auth.logout()
        }
      })
  },
}
</script>
