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
        <v-list v-if="!get_user_info.isLoggedIn">
          <v-list-item to="/login" router exact>
            <v-list-item-action>
              <v-icon>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Giriş Yap</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="!get_user_info.isAdmin">
          <v-list-item to="/search" router exact>
            <v-list-item-action>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Bilet Al</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isUser">
          <v-list-item to="/mytickets" router exact>
            <v-list-item-action>
              <v-icon>mdi-ticket-confirmation</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Biletlerim</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isAdmin">
          <v-list-item to="/users" router exact>
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Kullanıcı İşlemleri</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isAdmin">
          <v-list-item to="/dest" router exact>
            <v-list-item-action>
              <v-icon>mdi-source-branch-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Güzergah İşleleri</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isAdmin">
          <v-list-item to="/bus" router exact>
            <v-list-item-action>
              <v-icon>mdi-car-2-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Araç İşlemleri</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isAdmin">
          <v-list-item to="/tickets" router exact>
            <v-list-item-action>
              <v-icon>mdi-ticket-confirmation</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Tüm Biletler</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="get_user_info.isLoggedIn">
          <v-list-item to="/login" router exact>
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Çıkış Yap</v-list-item-title>
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
    return {}
  },

  computed: {
    ...mapGetters({
      get_user_info: 'getUserInfo',
    }),
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
</style>
