/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 17:48:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 19:37:55
 */
class AudioPlayer {
    constructor({ src, hookEvents } = {}) {
        if (!src) {
            throw new Error('src must be string');
        }
        this.objAudio = new Audio(src);
        this.objAudio.preload = 'preload';
        this.intStartMs = 0;
        this.intEndMs = 0;
        this.hookEvents = hookEvents || {};
        this._bindEvents();
    }
    setSrc(src) {
        this.objAudio.src = src;
        this.objAudio.preload = 'preload';
    }
    getSrc() {
        return this.objAudio.src;
    }

    play({ intStartMs, intEndMs } = {}) {
        if (intStartMs) {
            this.intStartMs = intStartMs;
        } else {
            this.intStartMs = 0;
        }

        if (intEndMs) {
            this.intEndMs = intEndMs;
        } else {
            this.intEndMs = 0;
        }
        var errorName = "";

        //检测是否是IE11设置时间导致error   原因: 必须等到音频加载完毕之后才可以设置时间
        try {
            this.objAudio.currentTime = this.intStartMs;
        } catch (e) {
            var errorType = "InvalidStateError".toLocaleLowerCase();
            if ("name" in e) {
                errorName = e.name;
            } else if (e.toString().toLocaleLowerCase() === errorType) {
                errorName = errorType;
            }

            if (errorName.toLocaleLowerCase() === errorType) {
                this.objAudio.addEventListener("loadedmetadata", () => {
                    this.objAudio.currentTime = parseFloat(this.intStartMs / 1000);
                    this.objAudio.play();
                });
            }
        }
        //非IE
        if (errorName === "") {
            this.objAudio.currentTime = parseFloat(this.intStartMs / 1000);
            this.objAudio.play();
        }
    }

    pause() {
        this.objAudio.pause();
    }

    setVolume(vol) {
        try {
            this.objAudio.volume = vol;
            return true;
        } catch (err) {
            return false;
        }

    }

    getCurrentTime() {
        return this.objAudio.currentTime;
    }

    getDuration() {
        return this.objAudio.duration;
    }

    _bindEvents() {
        this.objAudio.addEventListener('play', () => {
            if ('onPlay' in this.hookEvents) {
                this.hookEvents.onPlay();
            }
        });

        this.objAudio.addEventListener('pause', () => {
            if (this.intEndMs && this.objAudio.currentTime * 1000 >= this.intEndMs) {
                if ('onEnd' in this.hookEvents) {
                    this.hookEvents.onEnd();
                }
                return false;
            }
            if ('onPause' in this.hookEvents) {
                this.hookEvents.onPause();
            }
        });
        this.objAudio.addEventListener('ended', () => {
            if ('onEnd' in this.hookEvents) {
                this.hookEvents.onEnd();
            }
        });
        this.objAudio.addEventListener('error', (err) => {
            if ('onError' in this.hookEvents) {
                this.hookEvents.onError(err);
            }
        });
        this.objAudio.addEventListener('timeupdate', () => {
            if (this.intEndMs && this.getCurrentTime() * 1000 >= this.intEndMs) {
                this.pause();
            } else {
                let duration = 0;
                if (this.intStartMs && this.intEndMs) {
                    duration = this.intEndMs - this.intStartMs;
                } else if (this.intStartMs) {
                    duration = this.getDuration() * 1000 - this.intStartMs;
                } else if (this.intEndMs) {
                    duration = this.intEndMs;
                } else {
                    duration = this.getDuration() * 1000;
                }
                if ('onProgress' in this.hookEvents) {
                    this.hookEvents.onProgress({
                        currentTime: this.intStartMs ? (this.getCurrentTime() * 1000 - this.intStartMs) : this.getCurrentTime() * 1000,
                        duration: duration
                    });
                }
            }
        });
    }
}
export default AudioPlayer;
