<template>
  <v-main class="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-card width="600px">
          <div class="login__brand">
            <div class="login__brand__title">Felece Turizm</div>
          </div>
          <v-card-text>
            <v-form ref="registerForm">
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
              <v-btn color="primary" block class="mb-5 mt-5" @click="login"
                >Giriş Yap</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  layout: 'landing',
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
      show: false,
      newUser: {
        username: undefined,
        name: undefined,
        gender: undefined,
        password: undefined,
        mail: undefined,
      },
      genderList: ['ERKEK', 'KADIN'],
    }
  },

  computed: {},

  methods: {
    ...mapActions({
      register: 'register',
    }),

    login() {
      if (this.$refs.registerForm.validate()) {
        this.register(this.newUser)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Roboto+Condensed:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

.login {
  height: 100%;
  background-image: url('../static/article.jpg'),
    radial-gradient(rgb(110, 110, 110), rgb(37, 37, 37));
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-attachment: fixed;

  &__brand {
    display: flex;
    background-color: $blue;
    height: 8em;
    text-align: center;
    justify-content: center;
    align-items: center;

    &__title {
      color: aliceblue;
      font-family: 'Oswald', serif;
      font-size: 3em;
    }
  }
}

.link {
  text-decoration: none;
  color: $blue;
}
</style>