import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue"
import Feed from "@/views/Feed.vue"

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
    },
    {
        path: '/feed',
        name: "Feed",
        component: Feed,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

