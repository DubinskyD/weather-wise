<template>
  <div class="card-container">
    <div class="card-controller">
      <span>{{ blockCount }}/{{ maxBlocks }}</span>
      <button
        @click="addDashboardBlock"
        :disabled="isMaxBlocksReached"
        class="card-controller__btn"
      >
        +
      </button>
    </div>
    <div
      v-for="(block, index) in blocks"
      :key="index"
      v-show="block.show"
      class="card"
    >
      <dashboard-block
        :isMinBlocksReached="isMinBlocksReached"
        @delete-block="deleteDashboardBlock(index)"
      />
    </div>
  </div>
</template>

<script>
import DashboardBlock from "@/components/DashboardBlock.vue";

export default {
  name: "MainView",
  components: { DashboardBlock },
  data() {
    return {
      blocks: [{ show: true }],
      maxBlocks: 5,
      minBlocks: 1,
    };
  },
  computed: {
    blockCount() {
      return this.blocks.filter((block) => block.show).length;
    },
    isMaxBlocksReached() {
      return this.blocks.filter((block) => block.show).length >= this.maxBlocks;
    },
    isMinBlocksReached() {
      return (
        this.blocks.filter((block) => block.show).length === this.minBlocks
      );
    },
  },
  mounted() {
    this.$root.$on("confirm-delete", (index) => {
      this.handleDeleteConfirmation(index);
    });
  },
  methods: {
    addDashboardBlock() {
      if (!this.isMaxBlocksReached) {
        const hiddenBlockIndex = this.blocks.findIndex((block) => !block.show);
        if (hiddenBlockIndex !== -1) {
          this.blocks[hiddenBlockIndex].show = true;
        } else {
          this.blocks.push({ show: true });
        }
      }
    },
    deleteDashboardBlock(index) {
      this.$root.$emit("open-modal", { modalType: "delete-block", idx: index });
    },
    handleDeleteConfirmation(index) {
      if (!this.isMinBlocksReached) {
        this.blocks[index].show = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card-controller {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  &__btn {
    width: 30px;
    height: 30px;
    border-radius: 20px;

    border: 1px solid rgb(107, 103, 103);

    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s, filter 0.3s;

    &:hover {
      filter: brightness(120%);
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
