// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import App from "./App.vue";
import { routes } from "./routes";
import VueHead from 'vue-head';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VTooltip from 'v-tooltip';
import moment from 'moment';

Vue.use(VTooltip);
Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueHead);

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    let user = null;
    if (['/login', '/register'].includes(to.path)) {
        if (sessionStorage.getItem("_tAuth")) sessionStorage.removeItem('_tAuth');
        next();
    } else if (to.path == '/') {
        next();
        //base presentation text
    } else if (sessionStorage.getItem("_tAuth")) {
        fetch("http://localhost:3000/api/auth/route-guard", {
            method: "POST",
            body: JSON.stringify({ tokenString: sessionStorage.getItem("_tAuth") }),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json()).then(response => {
            user = response.result._id;
            console.log(user);
            if (user) next();
            else next('/login');
        });
    } else
        next('/login');
});

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});

Vue.mixin({
    methods: {
        async getNewUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        moveUrl: link => {
            window.event.preventDefault();
            window.location.pathname != link ? (window.location = link) : null;
        }
    }
});

Vue.filter('capitalize', value => value.toUpperCase());
Vue.filter('dateFormat', date => moment(date).format('DD. MM. YYYY'));
Vue.filter('dateFromNow', date => moment(date).fromNow());
Vue.filter('capFirst', item => item.split(" ").map(x =>
    x.substr(0, 1).toUpperCase() + x.substr(1, x.length - 1).toLowerCase()
).join(" "));
