<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:27:00
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-22 18:30:33
 -->
<template>
    <div>
        <a href="javascript:;" @click="record">record</a>
        <br />
        <a href="javascript:;" @click="stop">stop</a>
        <br />
        <a href="javascript:;" @click="playLocal">playLocal</a>
        <br />
        <a href="javascript:;" @click="stopPlayLocal">stopplaylocal</a>
        <br />
        <a href="javascript:;" @click="playAudio">playAudio</a>
        <br />
        <a href="javascript:;" @click="pauseAudio">pauseAudio</a>
        <br />
    </div>
</template>
<script>
import { SpeechData, SDK } from "@/plugins/sdk";
import AudioPlayer from "@/plugins/AudioPlayer";

export default {
    created() {
        let speechData = new SpeechData([
            {
                text: "hello",
                duration: 2000
            }
        ]);
        this.recorder = SDK(
            "xs",
            {
                coreType: "word",
                data: speechData,
                hookEvents: {
                    onReady() {
                        console.log("ready");
                    },
                    onStart() {
                        console.log("start");
                    },
                    onProgress(duration) {
                        console.log(duration);
                    },
                    onStop() {
                        console.log("stop");
                    },
                    onResult(result) {
                        console.log(result);
                    },
                    onError(err) {
                        console.log(err);
                    },
                    onPlayLocal() {
                        console.log("playlocal");
                    },
                    onStopPlayLocal() {
                        console.log("stopplaylocal");
                    }
                }
            },
            true
        );
        this.audio = new AudioPlayer({
            src:
                "https://cdn-resource.ekwing.com/acpf/data/upload/tk/2015/08/05/55c1b3146e0f5.mp3",
            intStartMs: 49000,
            // intEndMs: 5000,
            hookEvents: {
                onPlay() {
                    console.log("play");
                },
                onPause() {
                    console.log("pause");
                },
                onEnd() {
                    console.log("end");
                },
                onProgress({ currentTime, duration }) {
                    console.log(currentTime, duration);
                },
                onError(err) {
                    console.log(err);
                }
            }
        });
    },
    methods: {
        record() {
            this.recorder.record();
        },
        stop() {
            this.recorder.stop();
        },
        playLocal() {
            this.recorder.playLocal();
        },
        stopPlayLocal() {
            this.recorder.stopPlayLocal();
        },
        playAudio() {
            this.audio.play();
        },
        pauseAudio() {
            this.audio.pause();
        }
    }
};
</script>
