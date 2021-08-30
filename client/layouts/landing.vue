<template>
  <v-app>
    <v-overlay :value="getOverlayStatus"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
    <v-main>
      <router-view>
        <nuxt />
      </router-view> </v-main
  ></v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      getOverlayStatus: 'getOverlayStatus',
    }),
  },
}
</script>

<style lang="scss" scoped>
</style>