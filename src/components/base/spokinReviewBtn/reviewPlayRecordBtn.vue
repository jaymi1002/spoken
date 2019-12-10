<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:01
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 19:25:58
 -->
<template>
    <div class="review-playrecord-btn iconfont" :src="src" :class="audioBtmClasses" @click="$emit('click',btnIndex)">
        <s-ring :progress="progress" :ringWidth="8" class="audio-circle" :stroke="'rgba(0,156,226)'"></s-ring>
    </div>
</template>
<script>
import AudioPlayer from "@/plugins/AudioPlayer";
import {http2s} from "@/plugins/tools";
export default {
    name: "review-playrecord-btn",
    props: {
        src: String,
        disabled: false,
        startMs: Number,
        endMs: Number,
        btnIndex: Number
    },
    data() {
        return {
            audioPlayer: null,
            progress: 0,
            actived: false,
            isLoading: false,
            isPlaying: false,
            config: {}
        };
    },
    created() {
        let _this = this;
        this.config = {
            src: _this.src_https,
            hookEvents: {
                onPlay() {
                    _this.isLoading = true;
                },
                onProgress({ currentTime, duration }) {
                    if (!_this.isLoading) {
                        return;
                    }
                    _this.progress = parseInt(
                        (currentTime / duration) * 100
                    );
                },
                onEnd() {
                    _this.$emit("onEnd");
                    _this.progress = 0;
                    _this.actived = false;
                },
                onError() {
                    _this.$emit("onError");
                    _this.progress = 0;
                    _this.actived = false;
                },
                onPause() {
                    _this.actived = false;
                }
            }
        };
        // this.audioPlayer = new AudioPlayer(config);
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
            if (this.isPlaying) {
                return "active";
            }
            if (this.isLoading) {
                return "loading";
            }
            return "default";
        },
        src_https() {
            return http2s(this.src);
        }
    },
    methods: {
        play() {
            if (this.disabled || this.actived) {
                return false;
            }
            let queue = new window.createjs.LoadQueue(false);
            let _this = this;
            this.actived = true;
            this.isLoading = true;
            queue.loadFile({src: this.src_https, type: window.createjs.AbstractLoader.SOUND});
            queue.on("complete", () => {
                if (_this.actived) {
                    if (!_this.audioPlayer) {
                        _this.audioPlayer = new AudioPlayer(_this.config);
                    }
                }
                _this.audioPlayer.setSrc(this.src_https);
                _this.isPlaying = true;
                _this.audioPlayer.play({
                    intStartMs: _this.startMs,
                    intEndMs: _this.endMs
                });
            });

        },
        stop() {
            this.progress = 0;
            this.actived = false;
            this.audioPlayer && this.audioPlayer.pause();
        }
    },
    watch: {
        actived(newVal) {
            if (!newVal) {
                this.isPlaying = false;
                this.isLoading = false;
            }
        }
    }
};
</script>
<style lang="scss">
.review-playrecord-btn {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: white;
    position: relative;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    &.disabled {
        opacity: 0.5;
    }
    &::after {
        font-size: 28px;
        color: #009CE2;
    }
    &.default,
    &.disabled {
        &::after {
            content: "\e6b4";
            font-size: 12px;
        }
    }
    &.loading {
        &::after {
            content: "\e6b6";
            font-size: 12px;
        }
        animation: rotating 1s linear infinite;
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
