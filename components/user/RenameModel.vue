<template>
  <v-card>
    <v-card-title>Rename</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="target"
        label="Type..."
        autofocus
        @keydown.enter="rename"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3" @click="rename">Rename</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RenameModel',
  props: {
    origin: {
      type: String,
      required: true,
    },
    cwd: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    target: '',
  }),
  methods: {
    async rename() {
      if (!this.target) return
      const targetPath = this.cwd.concat(this.origin).join('/')
      const data = new URLSearchParams()
      data.set('name', this.target)
      await this.$axios.$patch(`user/${targetPath}`, data)
      this.$emit('success')
    },
  },
}
</script>
