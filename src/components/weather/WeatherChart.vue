<template>
  <div class="chart-container">
    <canvas ref="weatherChartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "WeatherChart",
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      weatherChart: null,
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.weatherChartCanvas.getContext("2d");

      if (this.weatherChart) {
        this.weatherChart.destroy();
      }

      this.weatherChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: `${this.$t("temperature")} (°F)`,
              data: this.data,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointRadius: 5,
              pointHoverRadius: 8,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: `${this.$t("temperature")} (°F)`,
              },
              beginAtZero: true,
            },
            x: {
              title: {
                display: true,
                text: this.$t("period"),
              },
            },
          },
          responsive: true,
        },
      });
    },
  },
  watch: {
    labels() {
      this.renderChart();
    },
    data() {
      this.renderChart();
    },
  },
  destroyed() {
    if (this.weatherChart) {
      this.weatherChart.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
}

canvas {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
