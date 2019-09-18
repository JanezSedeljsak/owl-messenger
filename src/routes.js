import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Register from "./components/Register.vue";

export const routes = [
    { path: "/home", component: Home },
    { path: "/register", component: Register },
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: '*', redirect: '/login' }
];
