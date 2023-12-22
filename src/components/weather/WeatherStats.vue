<template>
  <div class="stats">
    <div class="stats__header">
      <weather-icon :weather="weather" />
      <span class="stats__time">{{ dateTime }}</span>
    </div>
    <div class="stats__wrapper">
      <span class="stats__param">{{ $t("temperature") }}:</span>
      <span class="stats__label"
        >{{ Math.round(kelvinToCelsius(weatherStats.temp)) }} &deg;C</span
      >
    </div>
    <div class="stats__wrapper">
      <span class="stats__param">{{ $t("feelsLike") }}:</span>
      <span class="stats__label"
        >{{ Math.round(kelvinToCelsius(weatherStats.feels_like)) }} &deg;C</span
      >
    </div>

    <div class="stats__wrapper">
      <span class="stats__param">{{ $t("humidity") }}:</span>
      <span class="stats__label">{{ weatherStats.humidity }} %</span>
    </div>
    <div class="stats__wrapper">
      <span class="stats__param">{{ $t("pressure") }}:</span>
      <span class="stats__label">{{ weatherStats.pressure }} hPa</span>
    </div>
  </div>
</template>
<script>
import WeatherIcon from "./WeatherIcon.vue";
export default {
  name: "WeatherStats",
  components: { WeatherIcon },
  mixins: [],
  props: {
    dateTime: {
      type: String,
      default: () => "",
    },
    weatherStats: {
      require: true,
      type: Object,
    },
    weather: {
      require: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    kelvinToCelsius(k) {
      return k - 273.15;
    },
  },
};
</script>
<style lang="scss" scoped>
.stats {
  padding: 10px;
  border: 1px solid rgb(188, 188, 188);
  width: 205px;
  border-radius: 10px;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
    1px 1px 5px rgba(255, 255, 255, 1);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__time {
    font-weight: 500;
  }
  &__title {
    text-align: start;
    font-weight: 600;
    margin: 0;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
