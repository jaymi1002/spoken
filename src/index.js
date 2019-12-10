/*
 * @Author: lifangfang
 * @Date:   2018-12-04 13:48:22
 * @Last Modified by:   lifangfang
 * @Last Modified time: 2019-08-22 18:34:43
 */
import Vue from 'vue';
import axios from 'axios';
import './style/index.scss';
import './components.js';
import './directives.js';
import spokenWords from '@/components/spokenWords.vue';
axios.defaults.baseURL = 'https://172.17.5.170:8080';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

function spokenPopBox(data) {
    let instance = new (Vue.extend(spokenWords))({
        el: document.createElement('div')
    });
    instance.data = data;
    instance.$mount();
    instance.show();
}

export default spokenPopBox;
