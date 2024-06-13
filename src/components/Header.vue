<script lang="ts" setup>
import { ComputedRef, computed } from "vue";
import { useRouter } from "vue-router";
import { TABS } from "@/constants/common";
import { TTab } from "@/types/common";
import useBus from "@/composables/useBus";

const router = useRouter();
const activePath: ComputedRef<string> = computed(() => router.currentRoute.value.path);
const bus = useBus();

const setActiveTab = (tab: TTab) => {
  router.push({ path: tab.path });
  bus.setSelectedBusLine(null);
  bus.setSelectedBusStop(null);
};
</script>

<template>
  <header class="navbar-container radius pl-24 element-bg">
    <div
      class="tab p-20"
      :class="{ active: activePath === TABS.lines.path }"
      @click="setActiveTab(TABS.lines)"
    >
      Bus Lanes
    </div>
    <div
      class="tab p-20"
      :class="{ active: activePath === TABS.stops.path }"
      @click="setActiveTab(TABS.stops)"
    >
      Stops
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
}
.tab {
  font-weight: $font-weight-semibold;
  color: $grey;
  display: flex;
  align-items: center;
  height: 64px;
  cursor: pointer;
}
.tab.active {
  color: $black;
  border-bottom: 3px solid $blue;
}
</style>
