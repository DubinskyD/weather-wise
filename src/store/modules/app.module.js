let state = {
  locale: "en",
  localeList: [
    {
      code: "uk",
      name: "Українська",
    },
    {
      code: "en",
      name: "English",
    },
  ],
};

const mutations = {
  SET_LOCALE(state, locale) {
    window.document.cookie =
      encodeURIComponent("locale") + "=" + encodeURIComponent(locale);
    state.locale = locale;
  },
};

const actions = {
  setLocale({ commit }, locale) {
    commit("SET_LOCALE", locale);
  },
};

const getters = {
  getLocale: (state) => state.locale,
  getLocaleList: (state) => state.localeList,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
