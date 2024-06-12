import { mergeConfig, defineConfig } from "vitest/config";
import vueConfig from "./vue.config";
import path from "path";

export default mergeConfig(
  defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
    },
  }),
  {
    ...vueConfig.configureWebpack,
  }
);
