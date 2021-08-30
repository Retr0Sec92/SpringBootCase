<template>
  <div>
    <div class="navbar">
      <div class="navbar__banner">Felece Turizm</div>
    </div>
    <div class="hero">
      <h1 class="hero__brand">Felece Turizm</h1>
      <h2 class="hero__desc">Ulaşımın doğru adresi</h2>
      <div class="hero__buttons">
        <div class="hero__buttons__button">
          <NuxtLink class="link" to="/registersup">Kayıt Ol</NuxtLink>
        </div>
        <div class="hero__buttons__enter">
          <NuxtLink class="link" to="/login">Giriş Yap</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'landing',
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Playfair+Display:ital@1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Roboto+Condensed:wght@300&display=swap');

.navbar {
  background-color: $blue;
  position: sticky;
  box-shadow: 0 10px 30px 20px rgba(0, 0, 0, 0.5);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5em;
  width: 100%;
  z-index: 1000;

  &__banner {
    color: azure;
    font-size: 30px;
    font-family: 'Oswald', serif;
  }
}
.hero {
  margin: 0 auto;
  text-align: center;
  justify-self: center;
  padding: 17em 0;
  background-image: url('../static/hero.jpg'),
    radial-gradient(rgb(110, 110, 110), rgb(37, 37, 37));
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-attachment: fixed;

  &__brand {
    color: azure;
    font-family: 'Oswald', serif;
    font-size: 7em;
    text-shadow: 5px 5px 10px $blue;

    @include tablet {
      font-size: 3em;
    }
  }

  &__desc {
    color: azure;
    font-family: 'Dancing Script', cursive;
    font-size: 40px;
    margin-bottom: 1em;
    text-shadow: 5px 5px 10px $green;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    font-family: 'Roboto Condensed', sans-serif;
    width: 80%;
    margin: auto;
    justify-content: center;

    &__button {
      box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
      background-color: $blue;
      padding: 1em 3em;
      margin: 0 1em 1em 1em;
      border-radius: 0.5em;
      transition: transform 250ms ease-in-out,
        background-color 250ms ease-in-out, opacity 250ms linear;

      & > a {
        text-decoration: none;
        color: azure;
      }

      &:hover {
        transform: scale(1.1);
        background-color: $blue_hover;
      }
    }

    &__link {
      text-decoration: none;
    }

    &__enter {
      background-color: $green;
      box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);
      padding: 1em 3em;
      margin: 0 1em 1em 1em;
      border-radius: 0.5em;
      transition: transform 250ms ease-in-out,
        background-color 250ms ease-in-out, opacity 250ms linear;

      & > a {
        text-decoration: none;
        color: azure;
      }

      &:hover {
        transform: scale(1.1);
        background-color: $green_hover;
      }
    }
  }
}

.link {
  text-decoration: none;
  color: white;
}
</style>