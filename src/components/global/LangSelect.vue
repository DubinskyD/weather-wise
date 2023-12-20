<template>
  <div class="lang__container">
    <select v-model="selectedLanguage" class="lang__select">
      <option
        v-for="(lang, index) in languages"
        :key="index"
        :value="lang.code"
        class="lang__option"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "LangSelect",
  mixins: [],
  props: {
    languages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.$store.getters["app/getLocale"];
      },
      set(value) {
        this.$store
          .dispatch("app/setLocale", value)
          .then((this.$i18n.locale = value));
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.lang {
  &__continer {
  }
  &__select {
  }
  &__option {
  }
}
</style>
