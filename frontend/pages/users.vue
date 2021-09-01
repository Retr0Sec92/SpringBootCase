<template>
  <div>
    <v-dialog v-model="dialog" @keydown.esc="dialog = !dialog" width="600px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Kullanıcı Ekleme</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="userForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    counter
                    clearable
                    maxlength="20"
                    v-model="newUser.username"
                    :rules="usernameRule"
                    label="Kullanıcı Adı"
                  ></v-text-field>
                  <v-text-field
                    counter
                    clearable
                    maxlength="50"
                    v-model="newUser.name"
                    :rules="nameRule"
                    label="İsim - Soyisim"
                  ></v-text-field>
                  <v-text-field
                    counter
                    clearable
                    maxlength="12"
                    v-model="newUser.password"
                    :rules="passwordRule"
                    label="Şifre"
                  ></v-text-field>
                  <v-text-field
                    counter
                    clearable
                    maxlength="100"
                    v-model="newUser.mail"
                    :rules="mailRule"
                    label="E-Mail"
                  ></v-text-field>
                  <v-select
                    attach
                    chips
                    :items="genderList"
                    v-model="newUser.gender"
                    label="Cinsiyet"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveNewUser" block color="primary">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="roleDelDialog"
      @keydown.esc="roleDelDialog = !roleDelDialog"
      width="600px"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Kullanıcıdan Rol Çıkarma</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="roleForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    attach
                    chips
                    item-text="name"
                    :items="selectedRole"
                    v-model="selectedUserAndRole.name"
                    label="Rol Adı"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="delRoleFromUser" block color="primary">Çıkar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="roleAddDialog"
      @keydown.esc="roleAddDialog = !roleAddDialog"
      width="600px"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Kullanıcıya Rol Atama</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="roleForm">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    attach
                    chips
                    item-text="name"
                    :items="role_list"
                    v-model="selectedUserAndRole.name"
                    label="Rol Adı"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addRoleToUser" block color="primary">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Kullanıcı İşlemleri</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-btn color="primary" @click="dialog = !dialog"> Kullanıcı Ekle </v-btn>
      <v-data-table
        :headers="headers"
        :items="user_list"
        :busSearch="busSearch"
        light
        class="elevation-1 mt-5"
        item-key="id"
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': 'Sayfa Başına Kullanıcı',
        }"
      >
        <template v-slot:[`item.deleteUser`]="{ item }">
          <v-icon right @click="deleteUser(item)"> mdi-account-minus </v-icon>
        </template>
        <template v-slot:[`item.roles`]="{ item }">
          {{ formatRoles(item.roles) }}
        </template>
        <template v-slot:[`item.addRole`]="{ item }">
          <v-icon right @click="addRoleOpenDialog(item)">
            mdi-book-plus
          </v-icon>
        </template>
        <template v-slot:[`item.deleteRole`]="{ item }">
          <v-icon right @click="deleteRoleOpenDialog(item)">
            mdi-book-minus
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error">
            Kullanıcı Bulunmamaktadır !
          </v-alert>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      usernameRule: [
        (v) => !!v || 'Kullanıcı adı zorunludur !',
        (v) =>
          (v && v.length >= 5) ||
          'Kullanıcı adı minimum 5 karakter olmalıdır !',
      ],
      passwordRule: [
        (v) => !!v || 'Şifre zorunludur !',
        (v) =>
          (v && v.length >= 8) ||
          'Şifre 8 karakter ile 12 karakter arasında olmalıdır !',
      ],
      mailRule: [(v) => !!v || 'E-Mail zorunludur !'],
      nameRule: [(v) => !!v || 'İsim - Soyisim zorunludur !'],
      selectedUserAndRole: {
        username: undefined,
        name: undefined,
      },
      roleAddDialog: false,
      roleDelDialog: false,
      selectedRole: [],
      newUser: {
        username: '',
        name: '',
        gender: '',
        password: '',
        mail: '',
      },
      genderList: ['ERKEK', 'KADIN'],
      busSearch: '',
      dialog: false,
      headers: [
        {
          text: 'Kullanıcı Adı',
          value: 'username',
          class: 'primary--text title',
        },
        {
          text: 'İsim',
          value: 'name',
          class: 'primary--text title',
        },
        {
          text: 'Mail',
          value: 'mail',
          class: 'primary--text title',
        },
        {
          text: 'Cinsiyet',
          value: 'gender',
          class: 'primary--text title',
        },
        {
          text: 'Roller',
          value: 'roles',
          class: 'primary--text title',
        },
        {
          text: 'Kullanıcı Sil',
          value: 'deleteUser',
          sortable: false,
          class: 'primary--text title',
        },
        {
          text: 'Rol Ekle',
          value: 'addRole',
          sortable: false,
          class: 'primary--text title',
        },
        {
          text: 'Rol Sil',
          value: 'deleteRole',
          sortable: false,
          class: 'primary--text title',
        },
      ],
    }
  },

  beforeMount() {
    this.getUsers()
  },

  computed: {
    ...mapGetters({
      user_list: 'getUsersList',
      role_list: 'getAllRoles',
    }),
  },

  methods: {
    ...mapActions({
      getUsers: 'get_users',
      removeUser: 'remove_user',
      saveUser: 'save_user',
      getAllRoles: 'get_all_roles',
      setRoleToUser: 'set_role_to_user',
      removeRoleFromUser: 'del_role_from_user',
    }),

    saveNewUser() {
      if (this.$refs.userForm.validate()) {
        this.saveUser(this.newUser)
      }
    },

    deleteUser(item) {
      this.removeUser(item.id)
    },

    addRoleOpenDialog(item) {
      this.getAllRoles()
      this.selectedUserAndRole.username = item.username
      this.roleAddDialog = !this.roleAddDialog
    },

    deleteRoleOpenDialog(item) {
      this.selectedUserAndRole.username = item.username
      this.selectedRole = item.roles
      this.roleDelDialog = !this.roleDelDialog
    },

    addRoleToUser() {
      if (
        this.selectedUserAndRole.name != null &&
        this.selectedUserAndRole.username != null
      ) {
        this.setRoleToUser(this.selectedUserAndRole)
        this.selectedUserAndRole.username = undefined
        this.selectedUserAndRole.name = undefined
        this.roleAddDialog = !this.roleAddDialog
      }
    },

    formatRoles(item) {
      return item
        .map((element) => {
          return element.name
        })
        .join(' , ')
    },

    delRoleFromUser() {
      if (
        this.selectedUserAndRole.name != null &&
        this.selectedUserAndRole.username != null
      ) {
        this.removeRoleFromUser(this.selectedUserAndRole)
        this.selectedUserAndRole.username = undefined
        this.selectedUserAndRole.name = undefined
        this.roleDelDialog = !this.roleDelDialog
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Playfair+Display:ital@1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Roboto+Condensed:wght@300&display=swap');

.hero {
  margin: 0 auto;
  text-align: center;
  height: 100%;
  padding: 17em 0;
  background: radial-gradient(
    rgb(255, 255, 255) 0%,
    rgb(255, 255, 255) 40%,
    rgb(216, 216, 216) 70%,
    rgb(141, 141, 141) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-attachment: fixed;

  &__brand {
    color: $blue;
    font-family: 'Oswald', serif;
    font-size: 7em;
    text-shadow: 5px 5px 10px rgb(88, 88, 88);
  }

  &__desc {
    color: $green;
    font-family: 'Oswald', cursive;
    font-size: 40px;
    margin-bottom: 1em;
    text-shadow: 5px 5px 10px rgb(88, 88, 88);
  }
}
</style>
