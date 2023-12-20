/* eslint-disable no-empty-pattern */
import WeatherServices from "../../services/api/weather.services";

let state = {
  favoriteList: [],
};

const mutations = {
  ADD_TO_FAVORITE(state, city) {
    state.favoriteList.push(city);
  },
  REMOVE_FROM_FAVORITE(state, city) {
    state.favoriteList.forEach((item, index) => {
      if (item.lat === city.lat && item.lon === city.lon) {
        state.favoriteList.splice(index, 1);
      }
    });
  },
};

const actions = {
  getCoordinates({}, params) {
    return new Promise((resolve, reject) => {
      WeatherServices.get("getCoordinates", params)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  },
  getWeather({ dispatch, rootGetters }, city) {
    const lang = rootGetters["app/getLocale"];
    const getCurrentWeatherPromise = dispatch("getCurrentWeather", {
      city,
      lang,
    });
    const getWeatherForecastPromise = dispatch("getWeatherForecast", {
      city,
      lang,
    });

    return Promise.all([getCurrentWeatherPromise, getWeatherForecastPromise]);
  },
  getCurrentWeather({}, { city, lang }) {
    return new Promise((resolve, reject) => {
      let params = { lat: city.lat, lon: city.lon, lang: lang };
      WeatherServices.get("getCurentWeather", params)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  },
  getWeatherForecast({}, { city, lang }) {
    return new Promise((resolve, reject) => {
      let params = { lat: city.lat, lon: city.lon, lang: lang };
      WeatherServices.get("getWeatherForecast", params)
        .then((response) => {
          return resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  },
};

const getters = {
  getFavoriteList: (state) => state.favoriteList,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
