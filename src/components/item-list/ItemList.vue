<!-- Reusable component used for displaying a list of bus stops, bus times, or aggregated bus stops. 
The list can be sorted in ascending or descending order by clicking on the sort icon. 
The list items are clickable and trigger a selection callback when clicked. -->

<script lang="ts" setup>
import { PropType, computed, defineProps, ref } from "vue";
import { TBusStop, TSortOrder, TAggregatedBusStop } from "@/types/common";
import {
  sortBusStopsByOrder,
  sortBusStopsByStop,
  sortBusTimes,
  isBusStop,
  isAggregatedBusStop,
  formatOrder,
} from "@/utils/common";
import caretsIcon from "@/assets/icons/carets.svg";
import SubTitle from "@/components/item-list/SubTitle.vue";
import ListHeader from "@/components/item-list/ListHeader.vue";

const props = defineProps({
  selectedHeader: {
    type: String,
    required: false,
    default: "",
  },
  header: {
    type: String,
    required: true,
  },
  itemList: {
    type: Array as PropType<(string | TBusStop | TAggregatedBusStop)[]>,
    required: true,
  },
  selectionCallback: {
    type: Function,
    required: true,
    default: () => ({}),
  },
  listType: {
    type: String,
    required: true,
  },
});

let sortDirection = ref<TSortOrder>("asc");

const changeSortDirection = () => {
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
};

const icon = {
  src: caretsIcon,
  title: "sort",
  alt: "sort",
  callback: changeSortDirection,
};

const isAggregatedStopsList = computed(
  () => props.listType === "aggregatedBusStops"
);
const isStopsList = computed(() => props.listType === "busStops");

/**
 * Computed property to sort the item list based on the type of list.
 * @returns {(TBusStop | TAggregatedBusStop | string)[]} The sorted item list.
 */
const sortedItemList = computed(
  (): (TBusStop | TAggregatedBusStop | string)[] => {
    if (isAggregatedStopsList.value) {
      // Ensure that the props.itemList is of type TAggregatedBusStop[]
      const typedItemList = props.itemList as TAggregatedBusStop[];
      return sortBusStopsByOrder(typedItemList, sortDirection.value);
    } else if (isStopsList.value) {
      // Ensure that the props.itemList is of type TBusStop[]
      const typedItemList = props.itemList as TBusStop[];
      return sortBusStopsByStop(typedItemList, sortDirection.value);
    } else {
      // Ensure that the props.itemList is of type string[]
      const typedItemList = props.itemList as string[];
      return sortBusTimes(typedItemList, sortDirection.value);
    }
  }
);
/**
 * Item selection handler. Currently only possible for TAggregatedBusStop items.
 * @param item - The item to select.
 */
const selectItem = (item: string | TAggregatedBusStop | TBusStop) => {
  if (isAggregatedStopsList.value) {
    props.selectionCallback(item);
  }
};
</script>

<template>
  <div class="item-list radius">
    <SubTitle
      v-if="props.selectedHeader"
      :title="props.selectedHeader"
    />
    <ListHeader
      :title="props.header"
      :icon="icon"
    />
    <ul class="list-group">
      <li
        v-for="(item, index) in sortedItemList"
        :key="index"
        class="list-group-item pl-24"
        @click="selectItem(item)"
      >
        <!-- Display item depending on its type -->
        <span v-if="isBusStop(item) || isAggregatedBusStop(item)">{{ item.stop }} {{ formatOrder(item.order) }}</span>
        <span v-else>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  .list-group {
    flex: 1;
    overflow-y: auto;
    &-item {
      border-bottom: 1px solid $grey-light;
      font-size: $font-size-small;
      display: flex;
      flex: 1;
      align-items: center;
      cursor: pointer;
      height: 56px;
    }
    &-item:hover {
      background-color: $grey-u-light;
    }
  }
}
</style>
