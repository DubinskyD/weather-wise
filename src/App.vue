<template>
  <div id="app">
    <div class="app-header">
      <img
        src="./assets/logo.png"
        alt="WeatherWise"
        height="70px"
        width="70px"
      />
      <lang-select :languages="localeList" />
    </div>

    <nav>
      <router-link to="/">{{ $t("mainTab") }}</router-link>
      |
      <router-link to="/favorites">{{ $t("favoritesTab") }}</router-link>
    </nav>
    <router-view />
    <custom-modal />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomModal from "./components/global/CustomModal.vue";

import LangSelect from "./components/global/LangSelect.vue";
export default {
  components: { LangSelect, CustomModal },
  computed: {
    ...mapGetters({
      localeList: "app/getLocaleList",
    }),
  },
  created() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          console.log("Широта:", position.coords.latitude);
          console.log("Долгота:", position.coords.longitude);

          // Далее можно отправить эти координаты на сервер для определения города
          // или использовать их для других целей в вашем приложении
        },
        function (error) {
          console.error("Ошибка получения геолокации:", error.message);
        },
      );
    } else {
      console.log("Геолокация не поддерживается вашим браузером");
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  max-width: 1300px;
  margin: 0 auto;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ef7860;
    }
  }
}
.app-header {
  display: flex;
  justify-content: space-between;
}
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 30px;
}
.card {
  min-height: 200px;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 10px;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
    -23px 0 20px -23px rgba(0, 0, 0, 0.8), 23px 0 20px -23px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.icon-remove {
  color: rgb(201, 81, 81);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;

  &:hover {
    filter: brightness(120%);
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}
</style>
