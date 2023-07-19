import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2121";

createApp(App).use(router).mount("#app");
