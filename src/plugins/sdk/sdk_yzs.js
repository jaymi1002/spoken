/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:37:49
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-22 17:13:55
 */
import SpeechData from './speechdata.js';
import SpeechError from './speecherror.js';
const coreModeMaps = {
    word: 'E',
    para: 'E',
    sent: 'E'
};

const defConf = {
    userId: "guest",
    host: 'edu.hivoice.cn',
    port: '443',
    useFlash: false,
    hostCn: "cn-edu.hivoice.cn",
    portCn: "443",
    mode: 'E',
    audioFormat: 'opus',
    useSelfAudio: false,
    scoreCoefficient: 1.0,
    autoStop: false,
    debug: true
};
class YZS {
    constructor(conf, autoInit) {
        this._conf = {};
        this._hookEvents = {};
        this._ready = false;
        this._coreType = '';
        this._rank = 100;
        this._timeoutId = null;
        this._timeIntevalId = null;

        Object.assign(this._conf, conf, defConf);

        if ('hookEvents' in conf) {
            Object.assign(this._hookEvents, conf.hookEvents);
            delete this._conf.hookEvents;
        }

        if ('data' in conf &&
            conf.data instanceof SpeechData) {
            this.dataReader = conf.data;
            delete this._conf.data;
        }

        if ('coreType' in conf &&
            conf.coreType in coreModeMaps) {
            this._coreType = coreModeMaps[conf.coreType];
            Object.assign(this._conf, { mode: this._coreType });
            delete this._conf.coreType;
        }

        if (autoInit !== false) {
            this.init();
        }
    }

    init() {
        this.recorder = new window.EvalSDK(this._conf);
        this._bindEvents();
    }

    _bindEvents() {
        let recorder = this.recorder,
            _this = this;

        recorder.onReady = function() {
            _this._ready = true;
            if ('onReady' in _this._hookEvents) {
                _this._hookEvents.onReady();
            }
        };

        recorder.onStart = function() {
            let time = 0;
            _this._timeIntevalId = setInterval(() => {
                time += 100;
                if ('onProgress' in _this._hookEvents) {
                    _this._hookEvents.onProgress(time);
                }
            }, 100);
            if ('onStart' in _this._hookEvents) {
                _this._hookEvents.onStart();
            }
        };

        recorder.onStop = function() {
            clearInterval(_this._timeIntevalId);
            if ('onStop' in _this._hookEvents) {
                _this._hookEvents.onStop();
            }
        };

        recorder.onResult = function(result) {
            result.audio = recorder.getSoundUrl();
            if ('onResult' in _this._hookEvents) {
                _this._hookEvents.onResult(result);
            }
        };

        recorder.onError = function(err) {
            if ('onError' in _this._hookEvents) {
                _this._hookEvents.onError(new SpeechError('yzs', err.code));
            }
        };

        recorder.onPlayLocal = function() {
            if ('onPlayLocal' in _this._hookEvents) {
                _this._hookEvents.onPlayLocal();
            }
        };

        recorder.onStopPlayLocal = function() {
            if ('onStopPlayLocal' in _this._hookEvents) {
                _this._hookEvents.onStopPlayLocal();
            }
        };
    }

    record() {
        let data = this.dataReader.current(),
            mode = data.mode ? data.mode : this._conf.mode;
        this.recorder.start(data.text, mode, 'en');
        this._timeoutId = setTimeout(() => {
            this.stop();
        }, data.duration);
    }

    stop() {
        clearTimeout(this._timerId);
        this.recorder.stop();
    }

    playLocal() {
        this.recorder.playLocal();
    }

    stopPlayLocal() {
        this.recorder.stopPlayLocal();
    }
}

export default YZS;
