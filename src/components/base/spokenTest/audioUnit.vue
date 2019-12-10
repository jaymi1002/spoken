<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-29 15:48:57
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 11:04:24
 -->
<template>
    <i class="audio-unit iconfont"></i>
</template>
<script>
import AudioPlayer from "@/plugins/AudioPlayer";
export default {
    name: "t-audio-unit",
    props: {
        src: String
    },
    data() {
        return {
            audioPlayer: null
        };
    },
    created() {
        let _this = this;
        this.audioPlayer = new AudioPlayer({
            src: _this.src,
            hookEvents: {
                onEnd() {
                    _this.$emit("onEnd");
                },
                onError() {
                    _this.$emit("onError");
                }
            }
        });
    },
    beforeDestroy() {
        this.stop();
    },
    methods: {
        play() {
            this.audioPlayer.play();
        },
        stop() {
            this.audioPlayer.pause();
        }
    }
};
</script>
<style lang="scss">
.audio-unit {
    display: inline-block;
    width: 110px;
    height: 110px;
    background: #79cd22;
    border: 10px solid #e4efd9;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    &::after {
        content: "\e68c";
        color: #fff;
        font-size: 72px;
        line-height: 110px;
        animation: audio-playing 300ms linear infinite;
    }
    &::before {
        content: "";
        display: inline-block;
        width: 130px;
        height: 130px;
        border: 4px solid #fff;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        margin-left: -14px;
        margin-top: -14px;
        animation: audio-wave 1000ms linear infinite;
    }
}
@keyframes audio-playing {
    0% {
        content: "\e68c";
    }
    33% {
        content: "\e68d";
    }
    66% {
        content: "\e68e";
    }
    100% {
        content: "\e68c";
    }
}
@keyframes audio-wave {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.15);
        opacity: 0;
    }
}
</style>
