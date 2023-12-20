<template>
  <div class="card-container">
    <p v-if="!favoriteList.length">{{ $t("noSavedCity") }}</p>
    <favorite-block
      class="card"
      v-for="(city, idx) in favoriteList"
      :key="idx + city.lon"
      :city="city"
    />
  </div>
</template>
<script>
import FavoriteBlock from "@/components/FavoriteBlock.vue";
import { mapGetters } from "vuex";

export default {
  components: { FavoriteBlock },
  name: "FavoritesView",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      favoriteList: "weather/getFavoriteList",
    }),
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
