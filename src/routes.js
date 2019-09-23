import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Register from "./components/Register.vue";
import Groups from "./components/Groups.vue";
import People from "./components/People.vue";
import GroupEdit from "./components/GroupEdit.vue";

export const routes = [
    { path: "/home", component: Home },
    { path: "/register", component: Register },
    { path: "/groups", component: Groups },
    { path: "/people", component: People },
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: "/group/:id", component: GroupEdit },
    { path: '*', redirect: '/login' }
];
