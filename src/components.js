/*
 * @Author: lifangfang
 * @Date:   2018-12-04 15:52:41
 * @Last Modified by:   lifangfang
 * @Last Modified time: 2019-06-25 19:09:39
 */

import Vue from 'vue';
import * as commComponents from '@/components/comm';
import * as baseComponents from '@/components/base';
for (let key in commComponents) {
    if (commComponents[key].name) {
        Vue.component(commComponents[key].name, commComponents[key]);
    }
}
for (let key in baseComponents) {
    if (baseComponents[key].name) {
        Vue.component(baseComponents[key].name, baseComponents[key]);
    }
}

Vue.prototype.$popTip = function({ leftBtnTxt, rightBtnTxt, tipTxt, onLeftClick, onRightClick, onClose }) {
    let instance = new (Vue.extend(commComponents.popTip))({
        el: document.createElement('div')
    });
    if (leftBtnTxt) {
        instance.leftBtnTxt = leftBtnTxt;
    }
    if (rightBtnTxt) {
        instance.rightBtnTxt = rightBtnTxt;
    }
    if (tipTxt) {
        instance.tipTxt = tipTxt;
    }
    if (onLeftClick) {
        instance.$once('onLeftClick', onLeftClick);
    }
    if (onRightClick) {
        instance.$once('onRightClick', onRightClick);
    }
    if (onClose) {
        instance.$once('onClose', onClose);
    }
    instance.$mount();
    instance.show();
};

Vue.prototype.$countdown = function({ seconds, onEnd } = {}) {
    let instance = new (Vue.extend(baseComponents.countdown))({
        el: document.createElement('div'),
        propsData: {
            seconds: seconds || 3
        }
    });
    if (onEnd) {
        instance.$once('onEnd', onEnd);
    }
};
