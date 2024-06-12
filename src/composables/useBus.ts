import {
  TBusState,
  TBusStop,
  TAggregatedBusStop,
  TAggregatedBusLine,
} from "@/types/common";
import { reactive, readonly } from "vue";
import BusService from "@/services/BusService";
import {
  groupBusStopsByLineAndStopsByTime,
  removeRedundantStops,
} from "@/utils/common";

const state = reactive<TBusState>({
  selectedBusLine: null,
  selectedBusStop: null,
  searchedBusStop: null,
  busStops: [],
  busLines: [],
  loading: false,
});

/**
 * Composable function for managing bus-related state and operations.
 * @returns {Object} - Object containing state, setters, and methods for bus-related operations.
 */
export default function useBus() {
  // Setters are used to update the state
  const setSelectedBusLine = (busLine: TAggregatedBusLine | null) => {
    state.selectedBusLine = busLine;
  };

  const setSelectedBusStop = (busStop: TAggregatedBusStop | null) => {
    state.selectedBusStop = busStop;
  };

  const setSearchedBusStop = (busStop: TBusStop) => {
    state.searchedBusStop = busStop;
  };

  const setBusStops = (busStops: TBusStop[]) => {
    state.busStops = busStops;
  };

  const setBusLines = (busLines: TAggregatedBusLine[]) => {
    state.busLines = busLines;
  };

  const setLoading = (loading: boolean) => {
    state.loading = loading;
  };

  /**
   * Load bus stops from the API and group them by line
   */
  const loadBusStops = async () => {
    try {
      setLoading(true);
      const busStops = await BusService.fetchBusStops();
      const uniqueBusStops = removeRedundantStops(busStops);

      setBusStops(uniqueBusStops);
      const busLines = groupBusStopsByLineAndStopsByTime(busStops);
      setBusLines(busLines);
    } catch (error) {
      // Simple error handling due to the fact that there are plenty of other things to be done in that recruitment task
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    // State readonly prevents mutating state value directly
    state: readonly(state),
    // Setters
    setSelectedBusLine,
    setSelectedBusStop,
    setSearchedBusStop,
    setBusStops,
    setLoading,
    setBusLines,
    // Methods
    loadBusStops,
  };
}
