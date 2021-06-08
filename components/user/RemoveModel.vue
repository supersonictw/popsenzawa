<template>
  <v-card>
    <v-card-title>Remove</v-card-title>
    <v-card-text>
      "{{ target }}" will be removed and deleted forever.
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3" @click="rename">Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RemoveModel',
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
    async rename() {
      if (!this.target) return
      const targetPath = this.cwd.concat(this.target).join('/')
      await this.$axios.$delete(`user/${targetPath}`)
      this.removing = false
      this.$emit('success')
    },
  },
}
</script>
