<script setup lang="ts">
import useBus from "@/composables/useBus";
import SubTitle from "@/components/item-list/SubTitle.vue";
import { TAggregatedBusLine } from "@/types/common";

// Initializing bus composable
const bus = useBus();

/**
 * Selects a bus line and updates the state accordingly.
 * 
 * @param {number} index - The index of the selected bus line in the busLines array.
 */
const selectLine = (index: number) => {
  const selectedBusLine = bus.state.busLines[index] as TAggregatedBusLine;
  bus.setSelectedBusLine(selectedBusLine);
  bus.setSelectedBusStop(null);
};
</script>

<template>
  <div class="selection-panel radius element-bg">
    <SubTitle title="Select Bus Lines" />
    <div class="selection-panel-list p-24">
      <button
        v-for="(busLine, index) in bus.state.busLines"
        :key="index"
        class="selection-panel-button radius"
        :class="{ selected: bus.state.selectedBusLine?.line === busLine?.line }"
        @click="selectLine(index)"
      >
        {{ busLine.line }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selection-panel {
  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  &-button {
    padding: 10px 20px;
    cursor: pointer;
    color: $white;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
    background-color: $blue;
    border: 1px solid $blue;
  }

  .selected {
    background-color: $selected-blue;
  }
}
</style>
