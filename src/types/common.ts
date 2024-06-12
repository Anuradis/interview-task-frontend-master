export type TBusState = {
  selectedBusLine: TAggregatedBusLine | null;
  selectedBusStop: TAggregatedBusStop | null;
  searchedBusStop: TBusStop | null;
  busStops: TBusStop[];
  busLines: TAggregatedBusLine[];
  loading: boolean;
};

export type BaseBusStop = {
  line: number;
  stop: string;
  order: number;
};

export type TBusStop = BaseBusStop & {
  time: string;
};

export type TAggregatedBusStop = BaseBusStop & {
  times: string[];
};

export type TAggregatedBusLine = {
  line: number;
  stops: TAggregatedBusStop[];
};

export type TItem = TBusStop | TAggregatedBusStop | string;

export type TItemTypes = {
  busStops: TItemListType;
  aggregatedBusStops: TItemListType;
  busTimes: TItemListType;
};

export type TItemListType =
  | "busStops"
  | "aggregatedBusStops"
  | "aggregatedBusTimes";

export type TTabs = {
  stops: TTab;
  lines: TTab;
};

export type TTab = {
  label: string;
  key: string;
  path: string;
};

export type TSortOrder = "asc" | "desc";
