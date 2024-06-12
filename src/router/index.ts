import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { TABS } from "@/constants/common";

const routes: Array<RouteRecordRaw> = [
  {
    path: TABS.lines.path,
    name: TABS.lines.label,
    component: () => import("../components/views/BusLinesView.vue"),
  },
  {
    path: TABS.stops.path,
    name: TABS.stops.label,
    component: () => import("../components/views/StopsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add a navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.path !== TABS.stops.path && to.path !== TABS.lines.path) {
    next("/");
  } else {
    next();
  }
});

export default router;
