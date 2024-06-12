<script setup>
import Header from "./components/Header.vue";
import useBus from "./composables/useBus";
import LoadingSpinner from "./components/LoadingSpinner.vue";

//Initialize the bus composable
const bus = useBus();

//Load the bus lines and stops
bus.loadBusStops();
</script>

<template>
  <div class="time-table-container">
    <h1 class="title">
      Timetable
    </h1>
    <Header />
    <main class="main-view">
      <router-view v-if="!bus.state.loading" />
      <LoadingSpinner :visible="bus.state.loading" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.time-table-container {
  background-color: $bg-color;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .title {
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    margin-bottom: 24px;
  }
  .main-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
