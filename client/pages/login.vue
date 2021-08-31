<template>
  <v-main class="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-card width="600px">
          <div class="login__brand">
            <div class="login__brand__title">Felece Turizm</div>
          </div>
          <v-card-text>
            <v-form v-model="validation" ref="loginForm">
              <v-text-field
                type="text"
                label="Kullanıcı Adı"
                :rules="nameRules"
                required
                maxlength="20"
                counter
                prepend-icon="mdi-account"
                v-model="loginInfo.username"
                clearable
              ></v-text-field>
              <v-text-field
                label="Şifre"
                prepend-icon="mdi-key"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                v-model="loginInfo.password"
                maxlength="12"
                :rules="passRules"
                required
                clearable
                counter
              ></v-text-field>
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
      validation: false,
      show: false,
      loginInfo: { username: '', password: '' },
      nameRules: [
        (v) => !!v || 'Kullanıcı Adı gereklidir !',
        (v) =>
          (v && v.length >= 5) ||
          'Kullanıcı adı 5 karakterden fazla olmalıdır !',
      ],
      passRules: [
        (v) => !!v || 'Şifre gereklidir',
        (v) =>
          (v && v.length >= 8) ||
          'Şifre 8 karakter ile 12 karakter arasında olmalıdır !',
      ],
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      loginAct: 'login',
    }),

    login() {
      if (this.$refs.loginForm.validate()) {
        this.loginAct(this.loginInfo)
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