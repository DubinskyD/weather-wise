<template>
  <div class="not-found__wrapper">
    <p class="not-found__text">{{ $t("notFound") }}</p>
  </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
<style lang="scss" scoped>
.not-found {
  &__wrapper {
    display: flex;
    justify-content: center;
  }
  &__text {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
  }
}
</style>
