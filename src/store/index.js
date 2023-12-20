import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

/**
 * Vuex modules
 */
import AppModule from "./modules/app.module";
import WeatherModule from "./modules/weather.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: AppModule,
    weather: WeatherModule,
  },
  plugins: [
    createPersistedState({
      key: "weather_app",
      paths: ["app", "weather"],
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, data) => localStorage.setItem(key, data),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }),
  ],
});
