<template>
  <div :class="activeStatus">
    <Notice v-show="notice" :text="notice" />
    <div id="interactive">
      <v-row>
        <v-col>
          <Profile />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="active = 1">
            <v-icon left>mdi-folder-plus</v-icon>
            New Directory
          </v-btn>
          <v-btn @click="active = 2">
            <v-icon left>mdi-file-plus</v-icon>
            New File
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-list v-if="directory.length">
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
              <v-list-item-action @click="remove(item.name)">
                <v-icon>mdi-delete</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart-broken</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>( Empty )</v-list-item-title>
                <v-list-item-subtitle>
                  There is no file/directory found in your space.
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <div id="model">
      <NewDirectoryModel
        v-if="active === 1"
        :cwd="cwd"
        @success="action"
        @cancel="active = 0"
      />
      <NewFileModel
        v-else-if="active === 2"
        :cwd="cwd"
        @success="action"
        @cancel="active = 0"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import filesize from 'filesize'

import Profile from '~/components/user/Profile'
import NewDirectoryModel from '~/components/user/NewDirectoryModel'
import NewFileModel from '~/components/user/NewFileModel'
import Notice from '~/components/user/Notice'

export default {
  name: 'Dashboard',
  components: {
    Profile,
    NewDirectoryModel,
    NewFileModel,
    Notice,
  },
  data: () => ({
    cwd: [],
    directory: [],
    removing: false,
    active: 0,
    notice: '',
  }),
  head: {
    title: 'Dashboard',
  },
  computed: {
    activeStatus() {
      return this.active ? 'active' : ''
    },
  },
  mounted() {
    this.$axios
      .get('profile')
      .then(() => this.enter())
      .catch(() => {
        this.notice = 'Authentication failed'
        if (this.$auth.$state.loggedIn) {
          this.$auth.logout()
        }
        this.$router.push('/')
      })
  },
  methods: {
    action(item) {
      if (!item) {
        this.active = 0
        this.enter()
        return
      }
      if (item.type) {
        this.enter(item.name)
      } else {
        this.download(item.name)
      }
    },
    async enter(target) {
      if (this.removing) return
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
      if (this.removing) return
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
    async remove(target) {
      this.removing = true
      const targetPath = this.cwd.concat(target).join('/')
      await this.$axios.$delete(`user/${targetPath}`)
      this.removing = false
      await this.enter()
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

<style>
.active #interactive {
  opacity: 0.3;
  filter: blur(3px);
}

.active #model {
  position: absolute;
  top: 50px;
  left: 300px;
  right: 300px;
}

@media screen and (max-width: 1200px) {
  .active #model {
    left: 100px;
    right: 100px;
  }
}

@media screen and (max-width: 600px) {
  .active #model {
    left: 50px;
    right: 50px;
  }
}
</style>
