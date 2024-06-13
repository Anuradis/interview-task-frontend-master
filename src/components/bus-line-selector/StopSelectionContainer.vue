<script lang="ts" setup>
import useBus from "@/composables/useBus";
import ItemList from "@/components/item-list/ItemList.vue";
import { ComputedRef, computed } from "vue";
import { NOT_SELECTED_BUS_LINE_MESSAGE } from "@/constants/common";

// Initialize the bus composable
const bus = useBus();

/**
 * Computed property to check if a bus line is selected.
 * @returns {boolean} - True if a bus line is selected, false otherwise.
 */
const isLineSelected: ComputedRef<boolean> = computed(() => bus.state.selectedBusLine !== null);
</script>

<template>
  <div
    class="container element-bg radius"
    :class="{ 'background-dashed-border': !isLineSelected }"
  >
    <div
      v-if="!isLineSelected"
      class="not-selected"
    >
      {{ NOT_SELECTED_BUS_LINE_MESSAGE }}
    </div>
    <!-- Bus Line Container -->
    <div
      v-else
      class="item-list"
    >
      <ItemList
        list-type="aggregatedBusStops"
        :selected-header="`Bus Line: ${bus.state.selectedBusLine?.line}`"
        header="Bus Stops"
        :item-list="bus.selectedBusLineStops.value"
        :selection-callback="bus.setSelectedBusStop"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex: 1;
  overflow: hidden; /* Hide overflowing content */
}

.background-dashed-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%239A9DA4FF' stroke-width='4' stroke-dasharray='24%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}
.not-selected {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: $grey-dark;
}

.item-list {
  display: flex;
  flex: 1; /* Take up available space */
  overflow: hidden; /* Enable vertical scrolling */
  padding-right: 1px;
  padding-bottom: 2px;
}
</style>
