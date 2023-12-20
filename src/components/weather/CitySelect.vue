<template>
  <div>
    <input
      type="text"
      v-model="city"
      @input="debouncedSearch"
      :placeholder="$t('inputLabel')"
      class="city__input"
    />
    <ul v-if="showSuggestions" class="city__list">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        @click="selectCity(item)"
        class="city__item"
      >
        {{ item.name }} {{ item.state ? item.state : "" }} {{ item.country }}
      </li>
    </ul>
  </div>
</template>
<script>
import { debounce } from "lodash";

export default {
  name: "CitySelect",
  data() {
    return {
      city: "",
      suggestions: [],
      showSuggestions: false,
      selectedCity: null,
    };
  },
  methods: {
    searchCity() {
      let params = {
        cityName: this.city,
        limit: 5,
        countryCode: "",
        stateCode: "",
      };
      this.$store
        .dispatch("weather/getCoordinates", params)
        .then((response) => {
          this.suggestions = response;
          if (this.suggestions.length) this.showSuggestions = true;
        });
    },
    debouncedSearch: debounce(function () {
      this.searchCity();
    }, 500),

    selectCity(city) {
      this.selectedCity = city;
      this.city = `${city.name}, ${city.country}`;
      this.showSuggestions = false;
      this.$emit("select-city", city);
    },
  },
};
</script>
<style lang="scss" scoped>
.city {
  &__input {
    position: relative;
  }
  &__list {
    position: absolute;
    margin: 0;
    background: white;
    padding: 5px;
    z-index: 10;
  }
  &__item {
    list-style: none;
    text-align: start;
    cursor: pointer;
  }
}
</style>
