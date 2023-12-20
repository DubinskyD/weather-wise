import ApiClient from "@/libs/http-client";
const API_KEY = process.env.VUE_APP_API_KEY;

const WeatherServices = {
  endpoints(route, params) {
    const url = {
      getCoordinates: `geo/1.0/direct?q=${params.cityName},${params.stateCode},${params.countryCode}&limit=${params.limit}&appid=${API_KEY}`,
      getCurentWeather: `data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&lang=${params.lang}`,
      getWeatherForecast: `data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&lang=${params.lang}`,
    };
    return url[route];
  },

  get(url, param) {
    return ApiClient.get(this.endpoints(url, param));
  },
  post(url, params = {}, data, config = {}) {
    return ApiClient.post(this.endpoints(url, params), data, config);
  },
  delete(url, params = {}, data, config = {}) {
    return ApiClient.delete(this.endpoints(url, params), data, config);
  },
};

export default WeatherServices;
