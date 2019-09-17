import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

export const routes = [
    { path: "/home", component: Home },
    { path: "/login", component: Login },
    { path: '*', redirect: '/login' }
];
