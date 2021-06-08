<template>
  <v-card>
    <v-card-title>Extract</v-card-title>
    <v-card-text>
      The archive "{{ target }}" will be extract to current directory.
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3" @click="extract">Extract</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ExtractModel',
  props: {
    target: {
      type: String,
      required: true,
    },
    cwd: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async extract() {
      if (!this.target) return
      const targetPath = this.cwd.concat(this.target).join('/')
      await this.$axios.$delete(`zip/${targetPath}`)
      this.removing = false
      this.$emit('success')
    },
  },
}
</script>
