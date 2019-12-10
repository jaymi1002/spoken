/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:27:00
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-23 11:16:56
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// import '@/index.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
