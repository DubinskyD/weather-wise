<template>
  <div class="dashboard">
    <div class="dashboard__stats">
      <div class="dashboard__current">
        <p class="dashboard__title">{{ $t("current") }}</p>
        <weather-stats
          :weatherStats="currentWeather.main"
          :weather="currentWeather.weather[0]"
        />
      </div>
      <div class="dashboard__forecast">
        <div class="dashboard__forecast-header">
          <p class="dashboard__title">{{ $t("forecast") }}</p>
          <select v-model="forecastType" class="dashboard__forecast-select">
            <option
              v-for="(type, idx) in forecastTypes"
              :key="type + idx"
              :value="type.id"
            >
              {{ type.label }}
            </option>
          </select>
        </div>

        <div v-if="!forecastType" class="dashboard__forecast-wrapper">
          <weather-stats
            v-for="(hour, index) in next24Hours"
            :key="index"
            :dateTime="hour.dt_txt"
            :weatherStats="hour.main"
            :weather="hour.weather[0]"
          />
        </div>

        <div v-else-if="forecastType" class="dashboard__forecast-wrapper">
          <weather-stats
            v-for="(day, index) in dailyInfo"
            :key="index"
            :dateTime="day.dt_txt"
            :weatherStats="day.main"
            :weather="day.weather[0]"
          />
        </div>
      </div>
    </div>

    <weather-chart :labels="chartLabels" :data="chartData" />
  </div>
</template>
<script>
import WeatherStats from "@/components/weather/WeatherStats.vue";
import WeatherChart from "@/components/weather/WeatherChart.vue";

export default {
  name: "WeatherDashboard",
  components: { WeatherStats, WeatherChart },
  props: {
    weatherForecast: {
      type: Object,
      require: true,
    },
    currentWeather: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      forecastType: 0,
    };
  },
  computed: {
    forecastTypes() {
      return [
        { id: 0, label: this.$t("next24") },
        { id: 1, label: this.$t("next5d") },
      ];
    },
    chartData() {
      if (this.forecastType === "Next 24h") {
        return this.next24Hours.map((item) => item.main.temp);
      } else {
        return this.dailyInfo.map((item) => item.main.temp);
      }
    },
    chartLabels() {
      if (this.forecastType === "Next 24h") {
        return this.next24Hours.map((item) => item.dt_txt);
      } else {
        return this.dailyInfo.map((item) => item.dt_txt);
      }
    },
    next24Hours() {
      return this.weatherForecast.list.slice(0, 8).map((item) => ({
        dt: item.dt,
        dt_txt: item.dt_txt.split(" ")[1].slice(0, 5),
        main: item.main,
        weather: item.weather,
      }));
    },
    dailyInfo() {
      // Формируем данные по дням
      const dailyMap = {};
      this.weatherForecast.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyMap[date]) {
          dailyMap[date] = {
            dt_txt: date,
            main: { humidity: [], feels_like: [], temp: [], pressure: [] },
            weather: item.weather.slice(0, 1),
          };
        }

        // Накапливаем значения для среднего значения по дням
        dailyMap[date].main.humidity.push(item.main.humidity);
        dailyMap[date].main.feels_like.push(item.main.feels_like);
        dailyMap[date].main.temp.push(item.main.temp);
        dailyMap[date].main.pressure.push(item.main.pressure);
      });

      // Вычисляем средние значения по дням
      const dailyInfoValues = Object.values(dailyMap).map((value) => ({
        ...value,
        main: {
          humidity: Math.round(
            value.main.humidity.reduce((a, b) => a + b, 0) /
              value.main.humidity.length,
          ),
          feels_like: Math.round(
            value.main.feels_like.reduce((a, b) => a + b, 0) /
              value.main.feels_like.length,
          ),
          temp: Math.round(
            value.main.temp.reduce((a, b) => a + b, 0) / value.main.temp.length,
          ),
          pressure: Math.round(
            value.main.pressure.reduce((a, b) => a + b, 0) /
              value.main.pressure.length,
          ),
        },
      }));
      return dailyInfoValues.slice(0, 5);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__stats {
    display: flex;
    gap: 10px;
    @media (max-width: 790px) {
      flex-direction: column;
    }
    @media (max-width: 535px) {
      align-items: center;
    }
  }
  &__forecast {
    flex-grow: 1;
    @media (max-width: 535px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  &__title {
    font-weight: 600;
    @media (max-width: 790px) {
      text-align: start;
    }
    @media (max-width: 535px) {
      text-align: center;
    }
  }
  &__forecast-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 225px;
  }
  &__forecast-wrapper {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    @media (max-width: 535px) {
      justify-content: center;
    }
  }
}
</style>
