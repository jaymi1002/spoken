/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-30 15:15:03
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 14:36:22
 */
import { SDK, SpeechData } from '@/plugins/sdk';
let hooks = {
    onReady: [],
    onStart: [],
    onStop: [],
    onResult: [],
    onProgress: [],
    onError: [],
    onPlayLocal: [],
    onStopPlayLocal: []
};
let recorder = null;
let engine = 'yzs';
let conf = {};
let recoderProxy = {
    _bindHooks() {
        let hookEvents = {};
        for (let key in hooks) {
            hookEvents[key] = function () {
                hooks[key].forEach((el) => {
                    el(...arguments);
                });
            };
        }
        return hookEvents;
    },
    on(hook, fn) {
        if (!hooks[hook].some((el) => el === fn)) {
            hooks[hook].push(fn);
            return true;
        }
        return false;
    },
    off(hook, fn) {
        let tarIdx = 0;
        if (hooks[hook].some((el, index) => {
            if (el === fn) {
                tarIdx = index;
                return true;
            }
            return false;
        })) {
            hooks[hook].splice(tarIdx, 1);
            return true;
        }
        return false;
    },
    offAll(hook) {
        if (hook) {
            hooks[hook] = [];
            return;
        }
        for (let key in hooks) {
            hooks[key] = [];
        }
    },
    refreshSpeechData(spokenList) {
        conf.data = new SpeechData(spokenList);
        conf.data.idx = 0;
        recorder.changeDataReader(conf.data);
    },
    next() {
        conf.data.next();
    },
    prev() {
        conf.data.prev();
    },
    isHead() {
        return conf.data.isHead();
    },
    isTail() {
        return conf.data.isTail();
    },
    offset(idx) {
        return conf.data.offset(idx);
    },
    record(idx) {
        if (idx !== undefined && this.offset(idx)) {
            recorder.record(idx);
        } else {
            recorder.record();
        }
    },
    stop() {
        recorder.stop();
    },
    playLocal() {
        recorder.playLocal();
    },
    stopPlayLocal() {
        recorder.stopPlayLocal();
    },
    init({ coreType, userId }, spokenList) {
        recorder = null;
        conf = {
            coreType
        };
        if (userId) {
            conf.userId = userId;
        }
        conf.data = new SpeechData(spokenList);
        conf.hookEvents = this._bindHooks();
        recorder = SDK(engine, conf, true);
    },
    refresh() {
        recorder = null;
        recorder = SDK(engine, conf, true);
    }
};

export default recoderProxy;
