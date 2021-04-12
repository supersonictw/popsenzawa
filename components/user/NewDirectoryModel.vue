<template>
  <v-card>
    <v-card-title>New Directory</v-card-title>
    <v-card-text>
      <v-text-field></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NewDirectoryModel',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  methods: {
    async mkdir(target) {
      if (this.removing) return
      const targetPath = this.cwd.concat(target).join('/')
      await this.$axios.$post(`user/${targetPath}`)
      this.$emit('success')
    },
  },
}
</script>
