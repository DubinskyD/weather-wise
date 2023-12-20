<template>
  <div
    class="weather-icon"
    @mouseover="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <img
      :src="iconUrl"
      :alt="weather.description"
      :height="dimensions"
      :width="dimensions"
    />
    <div v-if="showTooltip" class="tooltip">{{ weather.description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    dimensions: {
      type: String,
      default: () => "75px",
    },
    weather: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
  computed: {
    iconUrl() {
      return `https://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
    },
  },
};
</script>

<style>
.weather-icon {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  top: -25px;
  left: 50%;
  text-transform: capitalize;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  white-space: nowrap;
}

.weather-icon:hover .tooltip {
  display: block;
}
</style>
