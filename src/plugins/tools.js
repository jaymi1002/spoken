/*
 * @Author: Wang Yateng
 * @Date:   2018-10-16 16:40:31
 * @Last Modified by:   lifangfang
 * @Last Modified time: 2019-01-15 18:31:13
 */
function getUrlParm(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(decodeURI(r[2]));
    }
    return null;
}

function formatTime(seconds) {
    if (Number(seconds) === 0) {
        return '0秒';
    }
    let day = parseInt(seconds / 60 / 60 / 24);
    let hour = parseInt(seconds / 60 / 60 % 24);
    let minutes = parseInt(seconds / 60 % 60);
    let sec = parseInt(seconds % 60);
    let dayFlag = false;
    let hourFlag = false;
    // let minutesFlag = false;
    // let secFlag = false;
    dayFlag = day !== 0;
    hourFlag = hour !== 0;
    // minutesFlag = minutes !== 0;
    // secFlag = sec !== 0;

    function getDayRes() {
        return dayFlag ? (day >= 10 ? day + '天' : '0' + day + '天') : '';
    }

    function getHourRes() {
        return hourFlag ? (hour >= 10 ? hour + '时' : '0' + hour + '时') : '';
    }

    function getMinRes() {
        return minutes >= 10 ? minutes + '分' : '0' + minutes + '分';
    }

    function getSecRes() {
        return sec >= 10 ? sec + '秒' : '0' + sec + '秒';
    }
    return getDayRes() + getHourRes() + getMinRes() + getSecRes();
}

function transform(el, attr, val) {
    if (!el.transform) {
        el.transform = {};
    }
    if (val === undefined) {
        return el.transform[attr];
    }
    el.transform[attr] = val;
    let str = '';
    // 此处要注意必须要在原由的基础上遍历
    for (let s in el.transform) {
        switch (s) {
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
            case 'skewX':
            case 'skewY':
                str += s + '(' + el.transform[s] + 'deg) ';
                break;
            case 'scale':
            case 'scaleX':
            case 'scaleY':
                str += s + '(' + el.transform[s] + ') ';
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                str += s + '(' + el.transform[s] + 'px) ';
                break;
        }
    }
    el.style.WebkitTransform = el.style.transform = str;
}

function css(el, attr, val) {
    let transformAttr = ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY', 'translateX', 'translateY', 'translateZ'];
    for (let i = 0; i < transformAttr.length; i++) {
        if (attr === transformAttr[i]) {
            return transform(el, attr, val);
        }
    }
    if (val === undefined) {
        val = getComputedStyle(el)[attr];
        val = parseFloat(val);
        return val;
    }
    if (attr === 'opacity') {
        el.style[attr] = val;
    } else {
        el.style[attr] = val + 'px';
    }
}

function trim(val) {
    return val.replace(/(^\s*)|(\s*$)/g, '');
}

// 中英文字数计算
function strlen(str, maxSize) {
    if (!maxSize) {
        maxSize = 0;
    }
    var len = 0,
        overSite = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }

        if (len <= maxSize && maxSize !== 0) {
            overSite++;
        }
    }

    overSite = len < maxSize ? 0 : overSite;
    return {
        len,
        overSite
    };
}
// 获取字符串长度，中文算2个
function strlenNew(str, ignoreSpace) {
    if (!str) {
        return 0;
    }
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let word = str.charAt(i);
        len += getCharLength(word, ignoreSpace);
    }
    return len;
}
// 字符串截取，中文算2个
function getStrSite(str, maxLen, ignoreSpace) {
    let len = 0;
    let site = 0;
    for (let i = 0; i < str.length; i++) {
        let word = str.charAt(i);
        len += getCharLength(word, ignoreSpace);
        site++;
        if (len > maxLen) {
            return site - 1;
        }
    }
}
// 获取字符串长度，中文算2个
function getCharLength(char, ignoreSpace) {
    let c = char.charCodeAt(0);
    let word = char.charAt(0);
    if (/\s/.test(word) && ignoreSpace) {
        return 0;
    } else if ((c >= 1 && c <= 126) || (c >= 65376 && c <= 65439)) {
        return 1;
    }
    return 2;
}
function http2s(strUrl) {
    var isHttp = /^http:.*/i;
    var isHttps = /^https:.*/i;

    var replaceMaps = [
        [/http:\/\/edu.hivoice.cn:9088\/(.*)\/(.*)/, 'https://edu$2.hivoice.cn/$1/$2'],
        ['http://download.cloud.chivox.com:8002/', 'https://download.cloud.chivox.com/'],
        ['http://records.17kouyu.com', 'https://records.17kouyu.com']
    ];

    //主域是https但是加载的音频资源是http
    if (isHttps.test(location.href) &&
        isHttp.test(strUrl)) {
        for (var i = 0, l = replaceMaps.length; i < l; i++) {
            strUrl = strUrl.replace(replaceMaps[i][0], replaceMaps[i][1]);
        }
    }

    return strUrl;
}
// 向js页面发送请求
function toJS(type, dataJson) {
    if (window.asToJs) {
        window.asToJs(type, dataJson);
    }
}

export {
    getUrlParm,
    formatTime,
    css,
    trim,
    strlen,
    strlenNew,
    getStrSite,
    http2s
};
