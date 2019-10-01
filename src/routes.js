import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Register from "./components/Register.vue";
import Groups from "./components/Groups.vue";
import People from "./components/People.vue";
import GroupEdit from "./components/GroupEdit.vue";
import YourGroups from "./components/YourGroups.vue";
import Base from "./components/Base.vue";

export const routes = [
    { path: "/home", component: Home },
    { path: "/register", component: Register },
    { path: "/chats", component: Groups },
    { path: "/people", component: People },
    { path: "/profile", component: Profile },
    { path: "/login", component: Login },
    { path: "/group/:id", component: GroupEdit },
    { path: "/your-chats", component: YourGroups },
    { path: "/", component: Base },
    { path: '*', redirect: '/login' }
];
