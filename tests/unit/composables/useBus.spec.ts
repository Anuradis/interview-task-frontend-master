import { describe, it, expect } from "vitest";
import useBus from "@/composables/useBus";
import {
  TAggregatedBusStop,
  TAggregatedBusLine,
  TBusStop,
} from "@/types/common";

describe("useBus", () => {
  it("initializes with correct initial state", () => {
    const bus = useBus();
    expect(bus.state.selectedBusLine).toBeNull();
    expect(bus.state.selectedBusStop).toBeNull();
    expect(bus.state.searchedBusStop).toBeNull();
    expect(bus.state.busStops).toEqual([]);
    expect(bus.state.busLines).toEqual([]);
    expect(bus.state.loading).toBe(false);
  });

  it("sets selected bus line correctly", () => {
    const { setSelectedBusLine, state } = useBus();
    const selectedBusLine: TAggregatedBusLine = { line: 1, stops: [] };
    setSelectedBusLine(selectedBusLine);
    expect(state.selectedBusLine).toStrictEqual(selectedBusLine);
  });

  it("sets selected bus stop correctly", () => {
    const { setSelectedBusStop, state } = useBus();
    const selectedBusStop: TAggregatedBusStop = {
      line: 1,
      stop: "A",
      order: 1,
      times: [],
    };
    setSelectedBusStop(selectedBusStop);
    expect(state.selectedBusStop).toStrictEqual(selectedBusStop);
  });

  it("sets searched bus stop correctly", () => {
    const { setSearchedBusStop, state } = useBus();
    const searchedBusStop: TBusStop = {
      line: 1,
      stop: "A",
      order: 1,
      time: "10:00",
    };
    setSearchedBusStop(searchedBusStop);
    expect(state.searchedBusStop).toStrictEqual(searchedBusStop);
  });

  it("sets bus stops correctly", () => {
    const { setBusStops, state } = useBus();
    const busStops: TBusStop[] = [
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
    ];
    setBusStops(busStops);
    expect(state.busStops).toEqual(busStops);
  });

  it("sets bus lines correctly", () => {
    const { setBusLines, state } = useBus();
    const busLines: TAggregatedBusLine[] = [
      { line: 1, stops: [] },
      { line: 2, stops: [] },
    ];
    setBusLines(busLines);
    expect(state.busLines).toEqual(busLines);
  });

  it("sets loading state correctly", () => {
    const { setLoading, state } = useBus();
    setLoading(true);
    expect(state.loading).toBe(true);
    setLoading(false);
    expect(state.loading).toBe(false);
  });
});
