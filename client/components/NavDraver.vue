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
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
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
    return {
      items: [
        {
          icon: 'mdi-login',
          title: 'Giriş Yap',
          to: '/login',
        },
        {
          icon: 'mdi-car-info',
          title: 'Araç Bul',
          to: '/busSearch',
        },
        {
          icon: 'mdi-ticket-confirmation',
          title: 'Bilet Al',
          to: '/tickets',
        },

        {
          icon: 'mdi-account-multiple-plus',
          title: 'Kullanıcı İşlemleri',
          to: '/users',
        },
        {
          icon: 'mdi-source-branch-plus',
          title: 'Güzergah İşlemleri',
          to: '/dest',
        },
        {
          icon: 'mdi-car-2-plus',
          title: 'Araç İşlemleri',
          to: '/bus',
        },
        {
          icon: 'mdi-logout',
          title: 'Çıkış Yap',
          to: '/main',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
