/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 11:32:26
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-22 14:18:12
 */
import YZS from './sdk_yzs';
import XS from './sdk_xs';
import SpeechData from './speechdata';

function SDK(engine, conf, autoInit) {
    switch (engine) {
        case 'xs':
            return new XS(conf, autoInit);
        case 'yzs':
        default:
            return new YZS(conf, autoInit);
    }
}

export {
    SDK,
    SpeechData
};
