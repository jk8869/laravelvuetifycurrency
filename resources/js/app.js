import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './vuetify';
import App from './components/App'
import Login from "./components/Login";
import Currency from "./components/Currency";

Vue.use(VueRouter)
window.axios = require('axios');

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'currency',
            component: Currency
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.fullPath !== "/login") {
        if (!window.Laravel.isLoggedin) {
            router.push({ name: 'login' })
        }
    }
    next();
})

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    vuetify,
});
