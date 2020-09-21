import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Tree from "../src/components/Tree/index";

createApp(App)
  .use(store)
  .use(Tree)
  .mount("#app");
