<template>
  <div>
    <v-card>
      <v-navigation-drawer
        width="400"
        permanent
        app
        clipped
        dark
        expand-on-hover
        color="#014983"
      >
        <v-list v-if="user_info">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ user_info.name }} {{ user_info.surname }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user_info.email }}</v-list-item-subtitle>
              <v-list-item-subtitle
                >+90{{ user_info.phone }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="menus" nav dense>
          <v-list-item
            :color="item.color"
            v-for="item in menus"
            :key="item.id"
            :to="item.url"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.menu_description }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(['user_info', 'menus']),
  },
}
</script>

<style lang="scss" scoped>
</style>