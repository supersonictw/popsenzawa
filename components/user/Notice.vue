<template>
  <v-snackbar v-model="status">
    {{ text }}
    <template #action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="status = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notice',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    status: true,
  }),
  mounted() {
    setTimeout(() => (this.status = false), 5000)
  },
}
</script>
