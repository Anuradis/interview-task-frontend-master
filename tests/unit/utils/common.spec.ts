// Note more unit tests can be added here, just a presentation of how to write unit tests
import { describe, it, expect } from "vitest";
import {
  groupBusStopsByLineAndStopsByTime,
  sortBusStopsByOrder,
  sortBusTimes,
  removeRedundantStops,
  isBusStop,
  isAggregatedBusStop,
  formatOrder,
  sortBusStopsByStop,
} from "@/utils/common";
import {
  TBusStop,
  TAggregatedBusStop,
  TAggregatedBusLine,
} from "@/types/common";

const busStops: TBusStop[] = [
  { line: 1, stop: "A", order: 1, time: "10:00" },
  { line: 1, stop: "A", order: 1, time: "11:00" },
  { line: 1, stop: "B", order: 2, time: "12:00" },
  { line: 2, stop: "A", order: 1, time: "10:00" },
  { line: 2, stop: "B", order: 2, time: "11:00" },
  { line: 2, stop: "C", order: 3, time: "12:00" },
  { line: 3, stop: "A", order: 1, time: "08:00" },
  { line: 3, stop: "A", order: 1, time: "09:00" },
  { line: 3, stop: "B", order: 2, time: "10:00" },
];

describe("groupBusStopsByLineAndStopsByTime", () => {
  it("groups bus stops by line and stop time", () => {
    const expected: TAggregatedBusLine[] = [
      {
        line: 1,
        stops: [
          { line: 1, stop: "A", order: 1, times: ["10:00", "11:00"] },
          { line: 1, stop: "B", order: 2, times: ["12:00"] },
        ],
      },
      {
        line: 2,
        stops: [
          { line: 2, stop: "A", order: 1, times: ["10:00"] },
          { line: 2, stop: "B", order: 2, times: ["11:00"] },
          { line: 2, stop: "C", order: 3, times: ["12:00"] },
        ],
      },
      {
        line: 3,
        stops: [
          { line: 3, stop: "A", order: 1, times: ["08:00", "09:00"] },
          { line: 3, stop: "B", order: 2, times: ["10:00"] },
        ],
      },
    ];

    expect(groupBusStopsByLineAndStopsByTime(busStops)).toEqual(expected);
  });

  it("handles empty input", () => {
    const result = groupBusStopsByLineAndStopsByTime([]);
    expect(result).toEqual([]);
  });

  it("handles stops with no times", () => {
    const busStopsWithNoTimes = [{ line: 1, stop: "A", order: 1, time: "" }];
    const expected = [
      {
        line: 1,
        stops: [{ line: 1, stop: "A", order: 1, times: [""] }],
      },
    ];

    const result = groupBusStopsByLineAndStopsByTime(busStopsWithNoTimes);
    expect(result).toEqual(expected);
  });
});

describe("sortBusStopsByOrder", () => {
  it("sorts bus stops in ascending order", () => {
    const stops: TBusStop[] = [
      { line: 1, stop: "C", order: 3, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
    ];

    const sortedBusStops = sortBusStopsByOrder<TBusStop>(stops, "asc");
    expect(sortedBusStops.map((stop) => stop.stop)).toEqual(["A", "B", "C"]);
  });

  it("sorts bus stops in descending order", () => {
    const stops: TBusStop[] = [
      { line: 1, stop: "C", order: 3, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
    ];

    const sortedBusStops = sortBusStopsByOrder<TBusStop>(stops, "desc");
    expect(sortedBusStops.map((stop) => stop.stop)).toEqual(["C", "B", "A"]);
  });

  it("handles an empty array", () => {
    const sortedBusStops = sortBusStopsByOrder<TBusStop>([], "asc");
    expect(sortedBusStops).toEqual([]);
  });

  it("sorts stops with the same order by stop name", () => {
    const stops: TBusStop[] = [
      { line: 1, stop: "C", order: 1, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 1, time: "11:00" },
    ];

    const sortedBusStops = sortBusStopsByOrder<TBusStop>(stops, "asc");
    expect(sortedBusStops.map((stop) => stop.stop)).toEqual(["A", "B", "C"]);
  });

  it("sorts aggregated bus stops in ascending order", () => {
    const stops: TAggregatedBusStop[] = [
      { line: 1, stop: "C", order: 3, times: ["12:00"] },
      { line: 1, stop: "A", order: 1, times: ["10:00"] },
      { line: 1, stop: "B", order: 2, times: ["11:00"] },
    ];

    const sortedAggregatedBusStops = sortBusStopsByOrder<TAggregatedBusStop>(
      stops,
      "asc"
    );
    expect(sortedAggregatedBusStops.map((stop) => stop.stop)).toEqual([
      "A",
      "B",
      "C",
    ]);
  });

  it("sorts aggregated bus stops in descending order", () => {
    const stops: TAggregatedBusStop[] = [
      { line: 1, stop: "C", order: 3, times: ["12:00"] },
      { line: 1, stop: "A", order: 1, times: ["10:00"] },
      { line: 1, stop: "B", order: 2, times: ["11:00"] },
    ];

    const sortedAggregatedBusStops = sortBusStopsByOrder<TAggregatedBusStop>(
      stops,
      "desc"
    );
    expect(sortedAggregatedBusStops.map((stop) => stop.stop)).toEqual([
      "C",
      "B",
      "A",
    ]);
  });
});

describe("sortBusStopsByStop", () => {
  it("sorts bus stops by stop name in ascending order", () => {
    const stops = [
      { line: 1, stop: "C", order: 3, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
    ];

    const sortedStops = sortBusStopsByStop(stops, "asc");
    expect(sortedStops.map((stop) => stop.stop)).toEqual(["A", "B", "C"]);
  });

  it("sorts bus stops by stop name in descending order", () => {
    const stops = [
      { line: 1, stop: "C", order: 3, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
    ];

    const sortedStops = sortBusStopsByStop(stops, "desc");
    expect(sortedStops.map((stop) => stop.stop)).toEqual(["C", "B", "A"]);
  });

  it("handles an empty array", () => {
    const sortedStops = sortBusStopsByStop([], "asc");
    expect(sortedStops).toEqual([]);
  });

  it("sorts stops with the same name by order", () => {
    const stops = [
      { line: 1, stop: "C", order: 1, time: "12:00" },
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 1, time: "11:00" },
    ];

    const sortedStops = sortBusStopsByStop(stops, "asc");
    expect(sortedStops.map((stop) => stop.stop)).toEqual(["A", "B", "C"]);
  });
});

describe("sortBusTimes", () => {
  it("sorts bus times in ascending order by default", () => {
    const times = ["12:00", "00:00", "10:00", "11:00"];
    const sortedTimes = sortBusTimes(times);
    expect(sortedTimes).toEqual(["00:00", "10:00", "11:00", "12:00"]);
  });

  it("sorts bus times in ascending order explicitly", () => {
    const times = ["12:00", "00:00", "10:00", "11:00"];
    const sortedTimes = sortBusTimes(times, "asc");
    expect(sortedTimes).toEqual(["00:00", "10:00", "11:00", "12:00"]);
  });

  it("sorts bus times in descending order", () => {
    const times = ["12:00", "00:00", "10:00", "11:00"];
    const sortedTimes = sortBusTimes(times, "desc");
    expect(sortedTimes).toEqual(["12:00", "11:00", "10:00", "00:00"]);
  });

  it("handles an empty array", () => {
    const times: string[] = [];
    const sortedTimes = sortBusTimes(times);
    expect(sortedTimes).toEqual([]);
  });

  it("handles times around midnight correctly", () => {
    const times = ["23:59", "00:00", "12:00", "11:00"];
    const sortedTimes = sortBusTimes(times);
    expect(sortedTimes).toEqual(["00:00", "11:00", "12:00", "23:59"]);
  });
});

describe("removeRedundantStops", () => {
  it("removes redundant stops", () => {
    const stops: TBusStop[] = [
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
      { line: 1, stop: "A", order: 1, time: "12:00" },
    ];

    const filteredStops = removeRedundantStops(stops);
    expect(filteredStops.map((stop) => stop.stop)).toEqual(["A", "B"]);
  });

  it("keeps the first occurrence of each stop", () => {
    const stops: TBusStop[] = [
      { line: 1, stop: "A", order: 1, time: "10:00" },
      { line: 1, stop: "B", order: 2, time: "11:00" },
      { line: 1, stop: "A", order: 1, time: "12:00" },
    ];

    const filteredStops = removeRedundantStops(stops);
    expect(filteredStops[0].time).toBe("10:00");
  });

  it("handles an empty array", () => {
    const filteredStops = removeRedundantStops([]);
    expect(filteredStops).toEqual([]);
  });
});

describe("isBusStop", () => {
  it("checks if an item is a bus stop", () => {
    const busStop: TBusStop = { line: 1, stop: "A", order: 1, time: "10:00" };

    expect(isBusStop(busStop)).toBe(true);
  });

  it("handles string input", () => {
    const str = "A bus stop";
    expect(isBusStop(str)).toBe(false);
  });
});

describe("isAggregatedBusStop", () => {
  it("checks if an item is an aggregated bus stop", () => {
    const aggregatedBusStop: TAggregatedBusStop = {
      line: 1,
      stop: "A",
      order: 1,
      times: ["10:00"],
    };
    const notAggregatedBusStop = {
      line: 1,
      stop: "A",
      order: 1,
      time: "10:00",
    };

    expect(isAggregatedBusStop(aggregatedBusStop)).toBe(true);
    expect(isAggregatedBusStop(notAggregatedBusStop)).toBe(false);
  });

  describe("formatOrder", () => {
    it("formats single-digit order numbers with leading zero", () => {
      expect(formatOrder(5)).toBe("05");
    });

    it("does not modify double-digit order numbers", () => {
      expect(formatOrder(15)).toBe("15");
    });

    it("returns '00' for undefined order", () => {
      expect(formatOrder(undefined)).toBe("00");
    });

    it("returns '0' for order number 0", () => {
      expect(formatOrder(0)).toBe("0");
    });
  });
});