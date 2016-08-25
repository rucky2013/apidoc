import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './vuex/store';
import routerMap from './router';

import 'css/style.scss';

Vue.use(VueRouter);

let router = new VueRouter({
    hashbang: false
});

let app = Vue.extend({
  store
});
routerMap(router);

router.start(app, "#app");
