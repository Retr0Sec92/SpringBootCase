<template>
  <v-app-bar app fixed clipped-left dark color="white">
    <div class="toolbar">
      <v-toolbar-title class="toolbar__title">Medicalstok</v-toolbar-title>
    </div>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

.toolbar {
  margin: 0 auto;

  &__title {
    font-size: 30px;
    font-family: 'Oswald', serif;
    color: #014983;
  }
}
</style>