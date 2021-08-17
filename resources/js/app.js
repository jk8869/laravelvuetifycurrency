import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './vuetify';
import App from './components/App'
import Login from "./components/Login";
import Currency from "./components/Currency";
import Volume from "./components/Volume"

Vue.use(VueRouter)
window.axios = require('axios');

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'default',
            component: Volume
        },
        {
            path: '/volume',
            name: 'volume',
            component: Volume
        },
        {
            path: '/currency',
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


const app = new Vue({
    el: '#app',
    components: { App },
    router,
    vuetify,
});
