import {
  TBusStop,
  TAggregatedBusStop,
  TAggregatedBusLine,
  TSortOrder,
  TItem,
} from "@/types/common";

/**
 * Groups an array of bus stops by line and stops by time.
 * @param busStops Array of bus stops to be grouped.
 * @returns Array of aggregated bus lines.
 */
export function groupBusStopsByLineAndStopsByTime(
  busStops: TBusStop[]
): TAggregatedBusLine[] {
  const linesMap: { [key: number]: TAggregatedBusLine } = {};

  busStops.forEach((entry) => {
    const { line, stop, order, time } = entry;

    // Initialize the line if it does not exist
    if (!linesMap[line]) {
      linesMap[line] = {
        line: line,
        stops: [],
      };
    }

    const lineObj = linesMap[line];

    // Find the stop in the current line
    let stopObj = lineObj.stops.find(
      (s) => s.stop === stop && s.order === order
    );

    // If stop does not exist, create a new one
    if (!stopObj) {
      stopObj = {
        line: line,
        stop: stop,
        order: order,
        times: [],
      };
      lineObj.stops.push(stopObj);
    }

    // Add the time to the stop
    stopObj.times.push(time);
  });

  // Convert the map to an array of TBusLine
  return Object.values(linesMap);
}

// Possible improvement would be here to just create one generic method and pass sorting field param
// and then use that param to sort the array, for now I will just create two methods

/**
 * Sorts an array of bus stops by order and stop name.
 * @param busStops Array of bus stops to be sorted.
 * @param sortOrder Sorting order ('asc' or 'desc').
 * @returns Sorted array of bus stops.
 */
export function sortBusStopsByOrder<T extends TBusStop | TAggregatedBusStop>(
  busStops: T[],
  sortOrder: TSortOrder = "asc"
): T[] {
  if (busStops.length === 0) {
    return [];
  }

  return [...busStops].sort((a, b) => {
    if (sortOrder === "asc") {
      // Sort by order first, then by stop name
      if (a.order !== b.order) {
        return a.order - b.order;
      } else {
        return a.stop.localeCompare(b.stop);
      }
    } else {
      // Sort by order first, then by stop name (descending)
      if (a.order !== b.order) {
        return b.order - a.order;
      } else {
        return b.stop.localeCompare(a.stop);
      }
    }
  });
}

/**
 * Sorts an array of bus stops or aggregated bus stops by stop name.
 * @param busStops Array of bus stops or aggregated bus stops to be sorted.
 * @param sortOrder Sorting order ('asc' or 'desc').
 * @returns Sorted array of items.
 */
export function sortBusStopsByStop<T extends TBusStop | TAggregatedBusStop>(
  busStops: T[],
  sortOrder: TSortOrder = "asc"
): T[] {
  if (busStops.length === 0) {
    return [];
  }

  return [...busStops].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.stop.localeCompare(b.stop);
    } else {
      return b.stop.localeCompare(a.stop);
    }
  });
}

/**
 * Sorts an array of bus times.
 * @param times Array of bus times to be sorted.
 * @param sortOrder Sorting order ('asc' or 'desc').
 * @returns Sorted array of bus times.
 */
export function sortBusTimes(
  times: string[],
  sortOrder: TSortOrder = "asc"
): string[] {
  const convertToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return [...times].sort((a, b) => {
    const timeA = convertToMinutes(a);
    const timeB = convertToMinutes(b);
    return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  });
}

/**
 * Removes redundant bus stops from an array of bus stops.
 * @param busStops Array of bus stops.
 * @returns Array of unique bus stops.
 */
export function removeRedundantStops(busStops: TBusStop[]): TBusStop[] {
  const seenStops = new Set<string>();
  const filteredStops: TBusStop[] = [];

  for (const busStop of busStops) {
    if (!seenStops.has(busStop.stop)) {
      seenStops.add(busStop.stop);
      filteredStops.push(busStop);
    }
  }

  return filteredStops;
}

/**
 * Checks if an item is a bus stop.
 * @param item Item to be checked.
 * @returns True if the item is a bus stop, false otherwise.
 */
export function isBusStop(item: TItem): item is TBusStop {
  return item !== undefined && typeof item !== "string" && "time" in item;
}

/**
 * Checks if an item is an aggregated bus stop.
 * @param item Item to be checked.
 * @returns True if the item is an aggregated bus stop, false otherwise.
 */
export function isAggregatedBusStop(item: TItem): item is TAggregatedBusStop {
  return item !== undefined && typeof item !== "string" && "times" in item;
}

/**
 * Formats a bus stop order number.
 * @param order Bus stop order number.
 * @returns Formatted order number.
 */
export function formatOrder(order: number | undefined): string {
  if (order === undefined) {
    return "00";
  } else if (order === 0) {
    return "0";
  } else {
    return order < 10 ? `0${order}` : order.toString();
  }
}