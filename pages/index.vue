<template>
  <div>
    <pop />
    <leaderboard />
  </div>
</template>

<script>
import Pop from '~/components/Pop'
import Leaderboard from '~/components/Leaderboard'

export default {
  name: 'Index',
  components: { Leaderboard, Pop },
}
</script>
