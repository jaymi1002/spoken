<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:01
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 19:25:58
 -->
<template>
    <div class="audio-btm iconfont" :class="audioBtmClasses">
        <s-ring :progress="progress" :ringWidth="8" class="audio-circle"></s-ring>
    </div>
</template>
<script>
import AudioPlayer from "@/plugins/AudioPlayer";
export default {
    name: "audio-btm",
    props: {
        src: String,
        disabled: false,
        startMs: Number,
        endMs: Number
    },
    data() {
        return {
            audioPlayer: null,
            progress: 0,
            playing: false
        };
    },
    created() {
        let _this = this,
            config = {
                src: _this.src || "https://cdn-resource.ekwing.com/acpf/data/upload/tk/2017/02/23/614b5be016d457cb02c9dc1fbace1da5.mp3",
                hookEvents: {
                    onPlay() {
                        _this.playing = true;
                    },
                    onProgress({ currentTime, duration }) {
                        _this.progress = parseInt(
                            (currentTime / duration) * 100
                        );
                    },
                    onEnd() {
                        _this.$emit("onEnd");
                        _this.progress = 0;
                        _this.playing = false;
                    },
                    onError() {
                        _this.$emit("onError");
                        _this.progress = 0;
                        _this.playing = false;
                    },
                    onPause() {
                        _this.playing = false;
                    }
                }
            };
        this.audioPlayer = new AudioPlayer(config);
    },
    mounted() {
        this.$nextTick(() => {
            this.$emit("onReady");
        });
    },
    beforeDestroy() {
        this.stop();
    },
    computed: {
        audioBtmClasses() {
            if (this.disabled) {
                return "disabled";
            }
            if (this.playing) {
                return "active";
            }
            return "default";
        }
    },
    methods: {
        play() {
            if (this.disabled || this.playing) {
                return false;
            }
            this.audioPlayer.play({
                intStartMs: this.startMs,
                intEndMs: this.endMs
            });
        },
        stop() {
            this.audioPlayer.pause();
        }
    },
    watch: {
        src(newVal) {
            this.audioPlayer.setSrc(newVal);
        }
    }
};
</script>
<style lang="scss">
.audio-btm {
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
        font-size: 28px;
        color: #fff;
    }
    &.default,
    &.disabled {
        &::after {
            content: "\e68e";
        }
    }
    &.active {
        &::after {
            content: "\e68e";
            animation: audio-playing 300ms linear infinite;
        }
    }
    .audio-circle {
        position: absolute;
        width: 90%;
        height: 90%;
        margin-left: 5%;
        margin-top: 5%;
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
</style>
