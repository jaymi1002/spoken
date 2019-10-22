/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2018-12-04 16:31:01
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-22 16:40:28
 */
import errYzsMap from './error_yzs.js';
import errXsMap from './error_xs.js';
class SpeechError extends Error {
    constructor(engine, code) {
        super();
        this.name = 'SpeechError';
        this.code = code;
        this.engine = engine;
        switch (engine) {
            case 'xs':
                this.message = errXsMap[code];
                break;
            case 'yzs':
            default:
                this.message = errYzsMap[code];
                break;
        }
        if (!this.message) {
            this.message = "unknow";
        }
        let err = new Error(JSON.stringify({
            engine: this.engine,
            code: this.code,
            message: this.message
        }));
        this.stack = err.stack;
    }
}

export default SpeechError;
