<script setup lang="ts">
import { computed, ref } from "vue";
import ItemList from "@/components/item-list/ItemList.vue";
import useBus from "@/composables/useBus";
import searchIcon from "@/assets/icons/search-blue.svg";
import searchIconInactive from "@/assets/icons/search-grey.svg";
/**
 * Computes a filtered list of bus stops based on the search value.
 * @returns {TBusStop[]} The filtered list of bus stops.
 */
const filteredBusStopList = computed(() => {
  return bus.state.busStops.filter((searchedStop) =>
    searchedStop.stop.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Initializing bus composable
const bus = useBus();

// Todo: search should be on debounce, to avoid multiple calls, and improve performance (Do if time permits)
let search = ref("");
let isSearchFocused = ref(false);

const currentSearchIcon = computed(() =>
  isSearchFocused.value ? searchIcon : searchIconInactive
);
</script>

<template>
  <div class="stops-view element-bg radius mt-15">
    <!-- // Todo move serach component to its own component -->
    <div class="search-component mt-2">
      <input
        v-model.trim="search"
        type="text"
        class="search-input ml-2"
        placeholder="Search..."
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
      >
      <img
        class="search-icon"
        :alt="'search-icon'"
        :title="'search-icon'"
        :src="currentSearchIcon"
      >
    </div>
    <ItemList
      list-type="busStops"
      header="Bus Stops"
      :item-list="filteredBusStopList"
    />
  </div>
</template>

<style lang="scss" scoped>
.stops-view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  .search-component {
    position: relative;
    padding: 8px;
    .search-input {
      width: 288px;
      padding: 12px 16px 12px 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: $font-size-small;
    }
    .search-input:focus {
      outline: none;
      border: 1px solid $blue;
    }
    .search-icon {
      position: relative;
      right: 30px;
      top: 4px;
    }
  }
}
</style>
