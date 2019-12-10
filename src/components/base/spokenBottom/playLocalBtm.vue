<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:43
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 16:27:17
 -->
<template>
    <div class="play-local iconfont" :class="playlocalBtmClasses"></div>
</template>
<script>
import AudioPlayer from "@/plugins/AudioPlayer";
export default {
    name: "playlocal-btm",
    props: {
        src: String,
        disabled: Boolean
    },
    data() {
        return {
            audioPlayer: null,
            playing: false
        };
    },
    created() {
        let _this = this;
        if (this.src) {
            this.audioPlayer = new AudioPlayer({
                src: _this.src,
                hookEvents: {
                    onPlay() {
                        _this.playing = true;
                    },
                    onError() {
                        _this.playing = false;
                    }
                }
            });
        }
    },
    computed: {
        playlocalBtmClasses() {
            if (this.disabled) {
                return "disabled";
            }
            if (this.playing) {
                return "active";
            }
            if (this.loading) {
                return "loading";
            }
            return "default";
        }
    },
    methods: {
        load() {
            this.loading = true;
        },
        play() {
            if (this.src) {
                this.audioPlayer.play();
            } else {
                this.playing = true;
            }
            this.loading = false;
        },
        stop() {
            if (this.src) {
                this.audioPlayer.pause();
            } else {
                this.playing = false;
            }
        }
    }
};
</script>
<style lang="scss">
.play-local {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #009ce2;
    position: relative;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    &.disabled {
        opacity: 0.5;
    }
    &::after {
        font-size: 16px;
        color: #fff;
    }
    &.active {
        &::after {
            content: "\e615";
        }
    }
    &.loading {
        &::after {
            content: "\e6b6";
            font-size: 24px;
        }
        animation: rotating 1s linear infinite;
    }
    &.default,
    &.disabled {
        &::after {
            content: "\e6b4";
            margin-left: 2px;
        }
    }
}
@keyframes rotating {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>
