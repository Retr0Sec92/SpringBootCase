<template>
  <v-app>
    <v-overlay :value="getOverlayStatus"
      ><v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay>
    <nav-bar />
    <nav-draver />
    <v-main>
      <router-view>
        <nuxt />
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import NavDraver from '../components/NavDraver.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: { NavBar, NavDraver },
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      getOverlayStatus: 'getOverlayStatus',
    }),
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
</style>