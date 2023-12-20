<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <p v-if="modalType === 'delete-block'">
        {{ $t("deleteBlockMessage") }}
      </p>
      <p v-if="modalType === 'max-favorite'">
        {{ $t("addMaxFavorite") }}
      </p>
      <div class="modal-buttons">
        <button v-if="modalType === 'delete-block'" @click="confirmDelete">
          {{ $t("confirm") }}
        </button>
        <button v-if="modalType === 'delete-block'" @click="closeModal">
          {{ $t("cancel") }}
        </button>
        <button v-if="modalType === 'max-favorite'" @click="closeModal">
          {{ $t("Ok") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      idx: null,
      modalType: "",
    };
  },
  mounted() {
    this.$root.$on("open-modal", ({ modalType, idx = null }) => {
      this.showModal = true;
      this.modalType = modalType;
      this.idx = idx;
    });
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.modalType = "";
      this.idx = null;
    },
    confirmDelete() {
      this.$root.$emit("confirm-delete", this.idx);
      this.closeModal();
    },
  },
};
</script>

<style lsng="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  min-width: 250px;

  padding: 20px;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
