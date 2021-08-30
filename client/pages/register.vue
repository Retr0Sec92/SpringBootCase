<template>
  <div class="main"></div>
</template>

<script>
export default {
  layout: 'landing',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background-image: url('../static/article.jpg'),
    radial-gradient(rgb(110, 110, 110), rgb(37, 37, 37));
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-attachment: fixed;
}
</style>