<template>
  <div class="city-card">
    <div class="city-card__header">
      <city-select @select-city="setCity" />
      <div class="city-card__controllers-wrapper">
        <font-awesome-icon
          v-if="!isCityFavorite && city"
          :icon="['far', 'fa-star']"
          class="icon-remove"
          @click="addToFavorite"
        />
        <font-awesome-icon
          v-if="isCityFavorite && city"
          :icon="['fas', 'fa-star']"
          class="icon-remove"
          @click="removeFromFavorite"
        />
        <font-awesome-icon
          v-if="!isMinBlocksReached"
          :icon="['far', 'trash-alt']"
          class="icon-remove"
          @click="deleteDashboardBlock"
        />
      </div>
    </div>
    <!-- <button v-if="city" @click="addToFavorite">Remove from Favorite</button> -->

    <span v-if="error">{{ error }}</span>

    <span v-if="loading">loading....</span>

    <weather-dashboard
      v-if="city && !error && !loading"
      :currentWeather="currentWeather"
      :weatherForecast="weatherForecast"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import CitySelect from "@/components/weather/CitySelect.vue";
import WeatherDashboard from "./weather/WeatherDashboard.vue";

export default {
  name: "DashboardBlock",
  components: { CitySelect, WeatherDashboard },
  props: {
    isMinBlocksReached: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      error: false,
      city: null,
      currentWeather: {},
      weatherForecast: {},
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      favoriteList: "weather/getFavoriteList",
    }),
    isCityFavorite() {
      if (this.city) {
        let check = this.favoriteList.some((item) => {
          if (item !== null) {
            return item.lat === this.city.lat && item.lon === this.city.lon;
          }
        });
        return check;
      } else {
        return false;
      }
    },
    isFavorite() {
      return (
        this.favoriteList.length < 5 &&
        this.city &&
        !this.favoriteList.some(
          (item) => item.lat === this.city.lat && item.lon === this.city.lon,
        )
      );
    },
  },
  methods: {
    deleteDashboardBlock() {
      this.$emit("delete-block");
    },
    addToFavorite() {
      this.favoriteList.length === 5
        ? this.$root.$emit("open-modal", { modalType: "max-favorite" })
        : this.$store.commit("weather/ADD_TO_FAVORITE", this.city);
    },
    removeFromFavorite() {
      this.$store.commit("weather/REMOVE_FROM_FAVORITE", this.city);
    },
    setCity(city) {
      this.city = city;
      this.loading = true;
      this.$store
        .dispatch("weather/getWeather", city)
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
  &__controllers-wrapper {
    gap: 15px;
    display: flex;
    align-items: center;
  }
}
</style>
