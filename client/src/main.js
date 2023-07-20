import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiLeafLine, IoClose } from "oh-vue-icons/icons";


addIcons(RiLeafLine);
addIcons(IoClose);

import "./assets/main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2121";

const app = createApp(App)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount("#app");