/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:27:00
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-22 12:00:26
 */
import Vue from "vue";
import Router from "vue-router";
import index from "../page/index";
Vue.use(Router);

export default new Router({
    routes: [{
        path: "/",
        component: index
    }]
});
