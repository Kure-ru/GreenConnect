import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import Feed from "@/views/Feed.vue"
import Profile from "@/views/Profile.vue"

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
        path: '/signup',
        name: "Signup",
        component: Signup,
    },
    {
        path: '/feed',
        name: "Feed",
        component: Feed,
    },
    {
        path: '/profile',
        name: "Profile",
        component: Profile,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

