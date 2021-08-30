<template>
  <div class="hero">
    <h1 class="hero__brand">Medicalstok</h1>
    <h2 class="hero__desc" v-if="user_info">
      Medicalstok'a hoş geldiniz , {{ user_info.name }}
      {{ user_info.title }}
    </h2>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(['user_info']),
  },

  methods: {},
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