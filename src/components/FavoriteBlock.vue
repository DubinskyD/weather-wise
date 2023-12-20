<template>
  <div class="city-card">
    <div class="city-card__header">
      <p class="city-card__title">{{ city.name }}</p>
      <font-awesome-icon
        :icon="['far', 'trash-alt']"
        class="icon-remove"
        @click="removeFromeFavorite"
      />
    </div>

    <p v-if="error">{{ error }}</p>
    <p v-if="loading">loading....</p>

    <weather-dashboard
      v-else
      :currentWeather="currentWeather"
      :weatherForecast="weatherForecast"
    />
  </div>
</template>
<script>
import WeatherDashboard from "./weather/WeatherDashboard.vue";

export default {
  name: "FavoriteBlock",
  components: { WeatherDashboard },
  props: {
    city: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      currentWeather: {},
      weatherForecast: {},
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      this.loading = true;
      this.$store
        .dispatch("weather/getWeather", this.city)
        .then(([currentWeather, weatherForecast]) => {
          this.currentWeather = currentWeather;
          this.weatherForecast = weatherForecast;
        })
        .catch((error) => {
          console.log(error);
          this.error = "Ошибка при загрузке данных";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeFromeFavorite() {
      this.$store.commit("weather/REMOVE_FROM_FAVORITE", this.city);
    },
  },
};
</script>
<style lang="scss" scoped>
.city-card {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
