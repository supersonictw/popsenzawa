<template>
  <v-card>
    <v-card-title>New Directory</v-card-title>
    <v-card-text>
      <v-text-field v-model="target" autofocus></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3" @click="mkdir">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NewDirectoryModel',
  props: {
    cwd: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    target: '',
  }),
  methods: {
    async mkdir() {
      if (!this.target) return
      const targetPath = this.cwd.concat(this.target).join('/')
      await this.$axios.$post(`user/${targetPath}`)
      this.$emit('success')
    },
  },
}
</script>
