import en from "./messages/en";
import uk from "./messages/uk";

import Vue from "vue";
import store from "@/store";
import VueI18n from "vue-i18n";

const getLocaleFromCookie = () => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="))
    ?.split("=")[1];
  return cookieValue;
};

const getStoreLocale = store.getters["app/getLocale"];
const getBrowserLocale = () => {
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;

  if (!navigatorLocale) return undefined;

  return navigatorLocale.trim().split("-").shift();
};

const defaultLanguage = getLocaleFromCookie()
  ? getLocaleFromCookie()
  : getStoreLocale
  ? getStoreLocale
  : ["en", "uk"].includes(getBrowserLocale())
  ? getBrowserLocale()
  : "en";

store.dispatch("app/setLocale", defaultLanguage);

const messages = {
  en,
  uk,
};

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: "en",
  messages: messages,
});
export default i18n;
