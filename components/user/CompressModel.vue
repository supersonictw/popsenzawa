<template>
  <v-card>
    <v-card-title>Compress</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="target"
        label="Type the name of new archive"
        append-outer-icon=".zip"
        autofocus
        @keydown.enter="compress"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="grey" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn class="amber darken-3" @click="compress">Compress</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CompressModel',
  props: {
    cwd: {
      type: Array,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    target: '',
  }),
  methods: {
    async compress() {
      if (!(this.target && this.origin)) return
      const targetPath = this.cwd.concat(this.target).join('/')
      const data = new URLSearchParams()
      data.set('origin', this.origin)
      await this.$axios.$post(`zip/${targetPath}.zip`, data)
      this.$emit('success')
    },
  },
}
</script>
