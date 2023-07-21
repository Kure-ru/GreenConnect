import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from 'aos'
import 'aos/dist/aos.css'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiLeafLine, IoClose, CoHamburgerMenu } from "oh-vue-icons/icons";


addIcons(RiLeafLine);
addIcons(IoClose);
addIcons(CoHamburgerMenu);

import "./assets/main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2121";

const app = createApp(App)
AOS.init();
app.use(router)
app.component('v-icon', OhVueIcon)

app.mount("#app");