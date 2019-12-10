/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:37:59
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-06 19:48:12
 */
import SpeechData from './speechdata';
import errorXsMap from './error_xs';
import SpeechError from './speecherror';
const coreTypeMap = {
    word: 'en.word.score',
    sent: 'en.sent.score',
    para: 'en.pred.score'
};
const defConf = {
    applicationId: 'a105',
    timestamp: '',
    userId: 'guest',
    coreTimeout: 10000,
    // engineLinksAddress: ['trial.cloud.ssapi.cn'], //['api.cloud.ssapi.cn']
    rateScale: 1.0, //0.8-1.5
    symbol: 0, // 0 -> false 1 -> true
    attachAudioUrl: 1, // 0 -> false 1 -> true
    debug: false
};

class XS {
    constructor(conf, autoInit) {
        this._conf = {};
        this._hookEvents = {};
        this._coreType = '';
        this._rank = 100;
        this._timeoutId = null;
        this._ready = false;
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
        if ('coreType' in conf) {
            this._coreType = coreTypeMap[conf.coreType];
            delete this._conf.coreType;
        }

        if (autoInit) {
            this.init();
        }
    }

    init() {
        let { applicationId, userId, coreTimeout } = this._conf;
        let _this = this;
        this.recorder = new window.EngineEvaluat({
            applicationId,
            timestamp: Date.now() + '',
            userId,
            coreTimeout,
            engineConnectTimeOut: () => {
                _this.stop();
            },
            engineFirstInitDone: () => {
                _this._ready = true;
                if ('onReady' in _this._hookEvents) {
                    _this._hookEvents.onReady();
                }
            },
            // micAllowCallback: () => {},
            // micForbidCallback: () => {},
            // micVolumeCallback: () => {},
            engineBackResultDone: (ret) => {
                // clearInterval(_this._timeIntevalId);
                this.audioUrl = JSON.parse(ret).audioUrl;
                if ('onResult' in _this._hookEvents) {
                    _this._hookEvents.onResult(ret);
                }
            },
            // engineBackResultFail: () => {},
            playAudioComplete: function () {
                if ('onStopPlayLocal' in _this._hookEvents) {
                    _this._hookEvents.onStopPlayLocal();
                }
            },
            playAudioError: function () {
                if ('onStopPlayLocal' in _this._hookEvents) {
                    _this._hookEvents.onStopPlayLocal();
                }
            },
            // noNetwork: () => {},
            logAccept: (log) => {
                // console.log(log);
                let logObj = JSON.parse(log);
                if (JSON.parse(log).type === 'error' || errorXsMap[logObj.code]) {
                    _this._throwError(logObj.code);
                }
                if (_this._conf.debug) {
                    console.log(JSON.parse(log));
                }
            }
        });
    }

    _throwError(code) {
        if ('onError' in this._hookEvents) {
            this._hookEvents.onError(new SpeechError('xs', code));
        }
    }

    record() {
        if (!this._ready) {
            return false;
        }
        let { rateScale, symbol, attachAudioUrl } = this._conf,
            data = this.dataReader.current(),
            refText = data.text,
            coreType = data.coreType ? coreTypeMap[data.coreType] : this._coreType;
        this.recorder.startRecord({
            coreType,
            refText,
            rateScale,
            symbol,
            attachAudioUrl,
            evalTime: null
            // evalTime: parseInt(data.duration)
        });
        let time = 0;
        console.log('ll');
        this._timeIntevalId = setInterval(() => {
            time += 100;
            if ('onProgress' in this._hookEvents) {
                this._hookEvents.onProgress(time);
            }
        }, 100);
        this._timeoutId = setTimeout(() => {
            this.stop();
        }, data.duration);

        if ('onStart' in this._hookEvents) {
            this._hookEvents.onStart();
        }
    }

    stop() {
        clearInterval(this._timeIntevalId);
        clearTimeout(this._timeoutId);
        this.recorder.stopRecord();
        if ('onStop' in this._hookEvents) {
            this._hookEvents.onStop();
        }
    }

    playLocal() {
        this.recorder.loadAudio(this.audioUrl);
        this.recorder.playAudio();
        if ('onPlayLocal' in this._hookEvents) {
            this._hookEvents.onPlayLocal();
        }
    }

    stopPlayLocal() {
        this.recorder.stopAudio();
        if ('onStopPlayLocal' in this._hookEvents) {
            this._hookEvents.onStopPlayLocal();
        }
    }

    changeDataReader(data) {
        if (data instanceof SpeechData) {
            this.dataReader = data;
        }
    }
}

export default XS;

/*
engineFirstInitDone: function() {},
micAllowCallback: function() {},
micForbidCallback: function() {},
micVolumeCallback: function(e) {},
logAccept: function(e) {},
engineBackResultDone: function(e) {},
engineBackResultFail: function(e) {},
engineConnectTimeOut: function() {},
engineServerTimeOut: function() {},
playAudioComplete: function(e) {},
playAudioError: function(e) {},
noNetwork: function() {},
noWebsocketAddress: function() {},
JSSDKNotSupport: function() {},
*/
