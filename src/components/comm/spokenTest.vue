<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-25 16:33:03
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 16:09:56
 -->
<template>
    <div class="spoken-test-wrapper">
        <div class="spoken-test-bg">
            <close class="header-close" @click="$emit('onClose')"></close>
            <div class="spoken-test-main">
                <div class="img-wrapper">
                    <img src="@/images/p_head1.png" alt />
                    <img src="@/images/p_head2.png" alt />
                </div>
                <p class="txt1">佩戴耳机，打分更准确哦~</p>
                <p class="txt2">话筒应略低于嘴巴，距离嘴巴约2-5cm哦~</p>
            </div>
        </div>
        <div class="spoken-test-bottom">
            <p class="step-tip">{{stepTip}}</p>
            <t-countdown-unit ref="countdown" @onEnd="step = 'audio'" v-if="step == 'countdown'"></t-countdown-unit>
            <t-play-unit ref="audio" @click="step = 'audio'" v-if="step == 'ready'"></t-play-unit>
            <t-audio-unit
                ref="audioPlayer"
                :src="audioSrc"
                @onEnd="step='record'"
                v-if="step == 'audio'"
            ></t-audio-unit>
            <t-recorder-unit :progress="recordProgress" v-if="step == 'record'"></t-recorder-unit>
            <t-loading-unit v-if="step == 'loading'"></t-loading-unit>
        </div>
        <pop-tip
            ref="popTip"
            :leftBtnTxt="failBtnTxt"
            @onLeftClick="onPopTipClick"
            @onClose="onPopTipClose"
        >
            <p class="test-score">{{parseInt(testScore)}}</p>
            <p class="test-score-tip">矮油，你读的不太标准哦~</p>
        </pop-tip>
    </div>
</template>
<script>
export default {
    name: "spoken-test",
    inject: ["recorderProxy"],
    data() {
        return {
            seconds: 3,
            countDownActive: false,
            step: "countdown", //countdown ready audio record loading
            audioSrc:
                "https://cdn-resource.ekwing.com/acpf/data/upload/tk/2015/08/19/55d3ee259f72c.mp3",
            testScore: 0,
            recordProgress: 0,
            failCount: 0
        };
    },
    computed: {
        failBtnTxt() {
            return this.failCount > 0 ? "直接答题" : "再读一遍";
        },
        stepTip() {
            switch (this.step) {
                case "countdown":
                    return "倒计时结束后播放声音";
                case "ready":
                    return "点击重新开始";
                case "audio":
                    return "正在播放音频";
                case "record":
                    return "读出刚才播放的声音";
                case "loading":
                    return "正在上传录音";
            }
        }
    },
    mounted() {
        this.recorderProxy.offAll();
        this.recorderProxy.refreshSpeechData([
            {
                text: "Good morning",
                duration: 3000,
                coreType: "sent"
            }
        ]);
        this.recorderProxy.on("onProgress", (duration) => {
            this.recordProgress = parseInt((duration / 3000) * 100);
        });
        this.recorderProxy.on("onStop", () => {
            this.step = "loading";
        });
        this.recorderProxy.on("onResult", (result) => {
            let { score } = result;
            this.testScore = score;
            if (score < 60) {
                this.$refs.popTip.show();
            } else {
                this.$emit("onComplete");
            }
        });
    },
    beforeDestroy() {
        if (this.step === "record") {
            this.recorderProxy.offAll("onResult");
        }
    },
    methods: {
        playAudio() {
            this.$refs.audioPlayer.play();
        },
        record() {
            this.recorderProxy.record();
        },
        onClose() {
            this.$emit("onClose");
        },
        onPopTipClick() {
            if (this.failCount > 0) {
                this.$emit("onComplete");
            } else {
                this.step = "record";
            }
            this.failCount++;
        },
        onPopTipClose() {
            this.step = "record";
            this.failCount++;
        }
    },
    watch: {
        step(newVal) {
            switch (newVal) {
                case "audio":
                    this.$nextTick(() => {
                        this.playAudio();
                    });
                    break;
                case "record":
                    this.record();
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.spoken-test-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 20px;
    .spoken-test-bg {
        height: 460px;
        width: 100%;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 450px 70px;
        border-bottom-right-radius: 450px 70px;
        background: $primaryBlue;
        padding-top: 50px;
        .header-close {
            position: absolute;
            right: 25px;
            top: 16px;
        }
        .spoken-test-main {
            width: 470px;
            height: 310px;
            border-radius: 20px;
            background-color: #a9e2fd;
            margin: 0 auto;
            .img-wrapper {
                padding-top: 45px;
                text-align: center;
                img {
                    margin: 0 10px;
                }
            }
            .txt1,
            .txt2 {
                text-align: center;
            }
            .txt1 {
                margin-top: 24px;
                color: #fff;
                font-size: 20px;
                font-weight: bold;
            }
            .txt2 {
                margin-top: 10px;
                color: #333;
                font-size: 18px;
                color: #333;
            }
        }
    }
    .spoken-test-bottom {
        position: relative;
        text-align: center;
        margin-top: -55px;
        .step-tip {
            position: absolute;
            left: 50%;
            top: 0;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            line-height: 35px;
            width: 180px;
            color: #fff;
            font-size: 16px;
            margin-left: -90px;
            margin-top: -55px;
            &::after {
                content: "";
                position: absolute;
                border-width: 10px;
                border-style: solid;
                border-color: rgba(255, 255, 255, 0.2) transparent transparent
                    transparent;
                bottom: 0;
                left: 50%;
                margin-bottom: -20px;
                margin-left: -10px;
            }
        }
    }
}
</style>
