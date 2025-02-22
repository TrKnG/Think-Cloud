import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { projectAuth } from "./firebase/config";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
});
