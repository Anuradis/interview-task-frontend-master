<script lang="ts" setup>
import useBus from "@/composables/useBus";
import ItemList from "@/components/item-list/ItemList.vue";
import { formatOrder } from "@/utils/common";
import { computed } from "vue";
import { NOT_SELECTED_BUS_STOP_MESSAGE } from "@/constants/common";

// Initializing bus composable
const bus = useBus();

/**
 * Computed property to check if a bus stop is selected.
 * @returns {boolean} - True if a bus stop is selected, otherwise false.
 */
const isStopSelected = computed(() => bus.state.selectedBusStop !== null);

/**
 * Computed property for the selected header.
 * @returns {string} - The header to display for the selected bus stop.
 */
const selectedHeader = computed(() => {
  const stop = bus.state.selectedBusStop;
  return stop ? `Bus Stop: ${stop.stop} ${formatOrder(stop.order)}` : "";
});
</script>

<template>
  <div
    class="container element-bg radius"
    :class="{ 'background-dashed-border': !isStopSelected }"
  >
    <div
      v-if="!isStopSelected"
      class="not-selected"
    >
      {{ NOT_SELECTED_BUS_STOP_MESSAGE }}
    </div>
    <!-- <-- Bus Stop Container -->
    <div
      v-else
      class="item-list"
    >
      <ItemList
        list-type="aggregatedBusTimes"
        :selected-header="selectedHeader"
        :header="'Times'"
        :item-list="[...bus.state.selectedBusStop?.times] || []"
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
}

.item-list {
  display: flex;
  flex: 1; /* Take up available space */
  overflow: hidden; /* Enable vertical scrolling */
  padding-right: 1px;
  padding-bottom: 2px;
}
</style>
