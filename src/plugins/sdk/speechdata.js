/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2018-12-04 14:13:48
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 10:17:38
 */
import Dtype from './vartype.js';

class SpeechData {
    constructor(data) {
        if (!Array.isArray(data)) {
            throw new Error('Type of DBM.constructor argument must be Array.');
        }

        if (data.length <= 0) {
            throw new Error('DBM.constructor argument must be not empty.');
        }

        for (let item in data) {
            if (Dtype.isObject(item)) {
                throw new Error('Type of DBM.constructor argument.item must be Object.');
            }
        }

        this.idx = -1;
        this.data = Object.assign({}, data);
    }

    current() {
        if (this.idx === -1) {
            this.idx++;
        }
        if (!this.data[this.idx].duration) {
            this.data[this.idx].duration = 2000;
        }
        return this.data[this.idx];
    }

    next() {
        if (this.isTail()) {
            return null;
        }

        return this.data[++this.idx];
    }

    prev() {
        if (this.isHead()) {
            return null;
        }

        return this.data[--this.idx];
    }

    isHead() {
        return this.idx === 0 || this.idx === -1;
    }

    isTail() {
        return (this.data.length - 1) === this.idx;
    }

    offset(idx) {
        if (idx < 0 || idx > this.data.length) {
            return false;
        }

        this.idx = idx;
        return true;
    }

    get(idx) {
        return this.data[idx] ? this.data[idx] : null;
    }
}

export default SpeechData;
