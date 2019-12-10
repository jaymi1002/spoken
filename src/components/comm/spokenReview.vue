<template>
<s-frame :title="title" :vipType="vipType" @onClose="$emit('onClose')" :goResult="goResult">
        <div class="spoken-review rel" slot="main">
            <icon-tip></icon-tip>
            <ques-list :pageType="pageType" ref="quesList" :reviewType="reviewType" :quesArr="quesArr"  @onReviewPlay="onReviewPlay" @onReviewPlayOver="onReviewPlayOver"></ques-list>
        </div>
        <div slot="bottom" class="rel hpt100">
            <div class="df abs hpt100 align-center f12 wh">
                注：最终成绩取最高一次段落得分哟~
            </div>
            <div class="df abs hpt100 wpt100 align-center wh vertical-middle">
                 <complete-btn @click="onSubmmit"></complete-btn>
            </div>
        </div>
</s-frame>
</template>
<script>
import recorderProxy from "@/plugins/singletonRecorder.js";
import {DEFAULT, PLAYING, RECORDING, PLAYINGRECORDING} from "@/confs/reviewStatConf";
import {storeRecordData, getBestRecordData, getDuration, storePageData} from "@/plugins/storedDataUtil";
import IS_DEBUG from "@/confs/debugMode";
import spokenWordsResult from "@/json/spokeWordsResult.json";
import qs from "qs";
import {postData, isTeacher, commonData} from "@/confs/questionBasicData";
import {getAns} from "@/plugins/question";
import Vue from "vue";
import {biz, id, key} from "@/plugins/question";
import {REVIEW} from "@/confs/pageType";
import {RECORD_PROGRESS, RECORD_RESULT, RECORD_PLAY_LOCAL, RECORD_STOP_PLAY_LOCAL} from "@/confs/engeenEventType";
export default {
    props: {
        title: String,
        vipType: String,
        noTeacher: Boolean,
        quesArr: Array,
        goResult: Function,
        reviewType: String,
        pageType: String
    },
    data() {
        return {
            reviewStatus: DEFAULT, //重读页和详情页的活动状态，-1是暂停状态，0是播放元音，1是录音，2是播放录音。
            reviewActiveIndex: -1, //重读页和详情页的当前处于活动状态的题目id;-1表示没有处于活动状态的题目
            recordIndex: -1,
            isSubmmiting: false,
            step: REVIEW
        };
    },
    //录音之前注册事件 传入录音数据
    created() {
        storePageData(this.step);
        recorderProxy.offAll();
        let _this = this;
        recorderProxy.on(RECORD_PROGRESS, (duration) => {
            this.setProgress(parseInt(
                (duration / _this.quesArr[_this.reviewActiveIndex].duration) * 100
            ));
        });
        recorderProxy.on(RECORD_RESULT, (ret) => {
            _this.setRecordData(ret);
        });
        recorderProxy.refreshSpeechData(this.quesArr);
    },
    name: "spoken-review",
    methods: {
        // 停止也是走这个接口。
        onReviewPlay(index, btnIndex) {
            if (this.reviewStatus != DEFAULT) {
                this.stop();

                // 如果当前是在录音就停止录音，如果录音的index正好是play的Index就说明要保留分数，否则不保留分数
                if (this.reviewStatus === RECORDING) {
                    if (this.reviewActiveIndex === index) {
                        this.recordIndex = index;
                    } else {
                        this.recordIndex = -1;
                    }
                    recorderProxy.stop();
                }
                // 如果点击的按钮不是活动中的按钮就启动该按钮，否则当前页面处于default状态。
                if (this.reviewStatus !== btnIndex || this.reviewActiveIndex !== index) {
                    this.$refs.quesList.play(index, btnIndex);
                    this.reviewActiveIndex = index;
                    this.reviewStatus = btnIndex;
                    if (this.reviewStatus === RECORDING) {
                        this.startRecordProxy();
                    }
                } else {
                    this.onReviewPlayOver(index, btnIndex);
                }
            } else {
                this.$refs.quesList.play(index, btnIndex);
                this.reviewActiveIndex = index;
                this.reviewStatus = btnIndex;
                if (this.reviewStatus === RECORDING) {
                    this.recordIndex = index;
                    this.startRecordProxy();
                }
            }
        },
        onReviewPlayOver(index, btnIndex) {
            this.reviewStatus = DEFAULT;
            this.reviewActiveIndex = -1;
        },
        onSubmmit() {
            if (this.isSubmmiting) {
                return;
            }
            var spokenResult = {};
            if (IS_DEBUG && 0) {
                spokenResult = spokenWordsResult.data.score;
                // goResult(spokenResult);
                this.$emit("goResult", spokenResult);
            } else {
                let ans = getAns();
                let userAns = {};
                userAns.biz = biz;
                userAns.duration = getDuration();
                userAns.id = id;
                userAns.key = key;
                userAns.pause = 0;
                userAns.ans = ans;
                userAns = JSON.stringify(userAns);
                let commitObj = {};
                let args ;
                if (isTeacher) {
                    args = JSON.stringify({"client": "js"});
                } else {
                    args = JSON.stringify({"client": "js", hwcid: commonData.hwcid, hid: commonData.hid});
                }
                commitObj = {userAns, args, try: isTeacher};
                this.isSubmmiting = true;
                Vue.prototype.$axios({
                    method: "post",
                    url: postData.as_url,
                    data: qs.stringify(commitObj),
                    responseType: "json"
                })
                    .then(({ data: result }) => {
                        if (result.status === "0") {
                            console.log("存储记录的结果成功");
                            spokenResult = result.data.score;
                            this.$emit("goResult", spokenResult);
                        } else {
                            console.log("存储记录的结果失败");
                        }
                        this.isSubmmiting = false;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isSubmmiting = false;
                    });
            }
        },
        stop() {
            if (this.reviewActiveIndex === -1) {
                this.reviewActiveIndex = 0;
            }
            if (this.reviewStatus === DEFAULT) {
                this.reviewStatus = PLAYING;
            }
            this.$refs.quesList.stop(this.reviewActiveIndex, this.reviewStatus);
        },
        setProgress(pro) {
            this.$refs.quesList.setProgress(this.reviewActiveIndex, pro);
        },
        setRecordData(ret) {
            if (this.recordIndex === -1) {
                return;
            }
            this.$refs.quesList.stop(this.recordIndex, RECORDING);
            storeRecordData(-1, this.recordIndex, ret);
            this.$refs.quesList.setRecordData(this.recordIndex, ret);
        },
        startRecordProxy() {
            recorderProxy.record(this.reviewActiveIndex);
        }
    }
};
</script>
<style lang="scss">
    .df{
        display: flex;
    }
    .abs{
        position: absolute;
    }
    .rel{
        position: relative;
    }
    .hpt100{
        height: 100%;
    }
    .wpt100{
        width: 100%;
    }

    .align-center{
        align-items: center;
        // vertical-align: middle;
    }
    .vertical-middle{
        justify-content: center;
    }
    .spoken-review {
        padding: 20px;
        max-height: 410px;
    }
</style>
