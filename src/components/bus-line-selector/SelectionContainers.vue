<script setup lang="ts">
import StopSelectionContainer from "@/components/bus-line-selector/StopSelectionContainer.vue";
import TimeSelectionContainer from "@/components/bus-line-selector/TimeSelectionContainer.vue";
</script>

<template>
  <div class="selection-containers">
    <!-- Defined components into two separate as it's easier to debug and maintain than trying to achive reusability here -->
    <StopSelectionContainer />
    <TimeSelectionContainer />
  </div>
</template>

<style lang="scss" scoped>
.selection-containers {
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 16px;
}
</style>
