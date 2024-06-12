import { TTabs } from "@/types/common";

export const TABS: TTabs = {
  stops: {
    label: "Stops",
    key: "stops",
    path: "/stops",
  },
  lines: {
    label: "Bus Lanes",
    key: "bus-lanes",
    path: "/",
  },
} as const;

export const NOT_SELECTED_BUS_STOP_MESSAGE = "Please select the bus stop first";
export const NOT_SELECTED_BUS_LINE_MESSAGE = "Please select the bus line first";
