<script lang="ts" setup>
import SelectionPanel from "@/components/bus-line-selector/SelectionPanel.vue";
import SelectionContainers from "@/components/bus-line-selector/SelectionContainers.vue";
</script>

<template>
  <div class="bus-lines mt-15">
    <SelectionPanel />
    <SelectionContainers />
  </div>
</template>

<style lang="scss" scoped>
.bus-lines {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  gap: 16px;
}
</style>
