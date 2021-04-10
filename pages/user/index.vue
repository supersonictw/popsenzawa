<template>
  <div>
    <v-row>
      <v-col>
        <Profile />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list v-if="directory">
          <v-list-item v-show="cwd.length" @click="enter('..')">
            <v-list-item-icon>
              <v-icon>mdi-reply</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>..</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in directory"
            :key="index"
            @click="action(item)"
          >
            <v-list-item-icon>
              <v-icon v-if="item.type">mdi-folder</v-icon>
              <v-icon v-else>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ sizeReadable(item.size) }}
                {{ timeReadable(item.lastModified) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import filesize from 'filesize'

import Profile from '~/components/user/Profile'

export default {
  name: 'Dashboard',
  components: { Profile },
  data: () => ({
    cwd: [],
    directory: [],
  }),
  mounted() {
    this.enter()
  },
  methods: {
    action(item) {
      if (item.type) {
        this.enter(item.name)
      } else {
        this.download(item.name)
      }
    },
    async enter(target) {
      if (target) {
        if (target !== '..') {
          this.cwd.push(target)
        } else {
          this.cwd.pop()
        }
      }
      const targetPath = this.cwd.join('/')
      const result = await this.$axios.$get(`user/${targetPath}`)
      if (!(result.status === 200 && result.data.status)) return
      this.directory = [
        ...result.data.data
          .filter((i) => i.type)
          .sort((a, b) => a.name > b.name),
        ...result.data.data
          .filter((i) => !i.type)
          .sort((a, b) => a.name > b.name),
      ]
    },
    async download(target) {
      const targetPath = this.cwd.concat(target).join('/')
      const result = await this.$axios.$get(`user/${targetPath}`)
      if (!(result.status === 200 && result.data.status)) return
      const blob = new Blob([btoa(result.data.data)], { type: 'octet/stream' })
      const link = document.createElement('a')
      link.download = target
      link.href = window.URL.createObjectURL(blob)
      link.click()
      window.URL.revokeObjectURL(link.href)
    },
    sizeReadable(fileSize) {
      return filesize(fileSize)
    },
    timeReadable(nanoTimestamp) {
      const microTimestamp = nanoTimestamp / 1000000
      if (moment.now() - microTimestamp < 86400000) {
        return moment(microTimestamp).startOf('day').fromNow()
      } else {
        return moment(microTimestamp).format()
      }
    },
  },
}
</script>
