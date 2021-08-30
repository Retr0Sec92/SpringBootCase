<template>
  <div class="main">
    <v-container class="main_container">
      <v-row>
        <v-col
          ><v-card width="700px">
            <v-card-title>Tedarikçi Bilgileri</v-card-title>
            <v-card-subtitle>Tedarikçi Bilgileri</v-card-subtitle>
          </v-card>
          <v-card width="700px">
            <v-container>
              <v-card-text>
                <v-text-field label="Şirket Adı" readonly v-model="name">
                </v-text-field>
                <v-text-field label="Şirket Tipi" readonly></v-text-field>
                <v-divider></v-divider>
              </v-card-text>
            </v-container>
          </v-card>
        </v-col>
        <v-col>
          <v-img max-width="300px" :src="require('~/static/doc.png')"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Mertcan',
    }
  },
  mounted() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
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

  &__container {
  }
}
</style>