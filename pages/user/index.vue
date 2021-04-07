<template>
  <div>
    <v-row>
      <v-col>
        <Profile />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>File Name</v-list-item-title>
              <v-list-item-subtitle>Description</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Profile from '~/components/user/Profile'

export default {
  components: { Profile },
}
</script>
