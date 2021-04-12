<template>
  <v-card>
    <v-card-title>New File</v-card-title>
    <v-card-text>
      <v-file-input />
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
  name: 'NewFileModel',
  props: {
    cwd: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async upload(filename) {
      if (!filename) return
      const targetPath = this.cwd.concat(filename).join('/')
      const data = new FormData()
      data.append('file', '')
      await this.$axios.$put(`user/${targetPath}`, data)
      this.$emit('success')
    },
  },
}
</script>
