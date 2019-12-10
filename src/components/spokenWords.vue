<!--
 * @Description: 读记词语
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:45:30
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-28 19:23:02
 -->
<template>
    <popup ref="popup" class="spoken-words" @onHide="$emit('onHide')">
        <pause v-show="isPause" @onContinue="onPauseContinue" @onClose="onPauseClose"></pause>
        <loading
            v-if="resource.length > 0 && step == LOADING"
            :resource="resource"
            @onComplete="onDownloadComplete"
            @onCancel="hide"
        ></loading>
        <spoken-start
            v-if="step == START"
            :title="title"
            :subTitle="subTitle"
            :vipType="vipType"
            :isVip="isVip"
            @onClose="onClose"
            @onStart="onStart"
        >
            <div class="start-main">
                <p class="words-content">
                    <span>共{{wordsNum}}词</span>
                    <i class="split"></i>
                    <span>朗读{{roundTotal}}遍</span>
                </p>
                <score-range  :isVip="isVip" v-model="targetScore"></score-range>
                <mode-select  :isVip="isVip" v-model="mode" class="mt30"></mode-select>
            </div>
        </spoken-start>
        <spoken-test v-if="step == TEST" @onComplete="step = MAIN" @onClose="onClose"></spoken-test>
        <spoken-main
            v-if="step == MAIN"
            ref="spokenMain"
            :title="title"
            :roundNow="roundNow"
            :vipType="vipType"
            :showRoundOverCon="showRoundOverCon"
            :netType="netType"
            @onClose="onClose"
        >
            <s-progress :value="current" :total="wordsNum"></s-progress>
            <div
                class="words-list"
                v-for="(el,index) in wordsList"
                v-if="index == current || (current===wordsList.length&&index===wordsList.length-1)"
            >
                <p class="word">{{el.text}}</p>
                <p class="translate">{{el.word_type}}{{el.translation}}</p>
                <p class="tag">例句</p>
                <p class="sentence">{{el.sentence}}</p>
                <p class="tag">翻译</p>
                <p class="sentence_exp">{{el.sentence_exp}}</p>
                <img class="pic" :src="el.pic" alt />
            </div>
            <template slot="switch">
                <switch-mode
                    class="mb5"
                    v-model="mode"
                    @onTipPop="onModeTipPop"
                    @onTipCancel="onTipCancel"
                ></switch-mode>
                <switch-score v-model="targetScore"></switch-score>
            </template>
            <div slot="bottom">
                <spoken-bottom>
                    <audio-btm
                        v-if="current>-1&&current<wordsList.length"
                        v-show="mode < 2"
                        slot="audio"
                        ref="audioBtmObj"
                        :disabled="audioBtmDisabled"
                        :src="wordsList[current].audio"
                        @onEnd="onAudioBtmEnd"
                    ></audio-btm>
                    <recorder-btm
                        v-if="current>-1&&current<wordsList.length"
                        :progress="recordProgress"
                        slot="recorder"
                        :disabled="recorderBtmDisabled"
                        @click="stopRecord"
                    ></recorder-btm>
                    <playlocal-btm
                        v-if="current>-1&&current<wordsList.length"
                        v-show="mode == 0"
                        ref="playlocalObj"
                        slot="playlocal"
                        :disabled="playlocalBtmDisabled"
                    ></playlocal-btm>
                    <template slot="btnGroup">
                        <btn-btm v-show="nextBtnShow" @click="next">下一题</btn-btm>
                        <btn-btm v-show="completeBtnShow" @click="complete">完成</btn-btm>
                        <pause-btm v-show="pauseBtnShow" @click="pause"></pause-btm>
                    </template>
                </spoken-bottom>
            </div>
        </spoken-main>
        <spoken-review
            v-if="step == 'review'"
            :pageType="REVIEW"
            :quesArr="wordsList"
            @goResult="goResult"
            :reviewType="reviewType"
            @onClose="onClose"
        ></spoken-review>
        <spoken-result
            v-if="step == 'result'"
            :duration="spokenResult.duration"
            :score="spokenResult.score"
            @onClose="onClose"
            @onScoreDetail="onScoreDetail"
            @onDoAgain="onDoAgain"
            @onOverClose="onOverClose"
        >
            <div class="fix vm" style="margin-top:36px;margin-bottom:50px;">
                <div class="l" style="margin-right:24px">
                    <span class="result-key">完成</span>
                    <span class="result-value">{{roundTotal}}遍</span>
                </div>
                <div class="l" style="margin-right:24px">
                    <span class="result-key">读记词语</span>
                    <span class="result-value">{{spokenResult.total}}词</span>
                </div>
                <div class="l" style="margin-right:24px">
                    <span class="result-key">发音纯正</span>
                    <span class="result-value">{{spokenResult.better}}词</span>
                </div>
                <div class="l">
                    <span class="result-key">发音稍差</span>
                    <span class="result-value">{{spokenResult.bad}}词</span>
                </div>
            </div>
        </spoken-result>
        <spoken-detail
            v-if="step == 'detail'"
            :score="spokenResult.score"
            @onClose="onClose"
            @onBack="onBack"
            :reviewType="reviewType"
            :quesArr="wordsList"
            :pageType="DETAIL"
        ></spoken-detail>
    </popup>
</template>
<script>
import recorderProxy from "@/plugins/singletonRecorder.js";
import spokenWords from "@/json/spokenWords.json";
import qs from "qs";
import {
    setOriRecordData,
    storeRecordData,
    updateDuration,
    seStoredData,
    storePageData
} from "@/plugins/storedDataUtil";
import {
    reviewType_word,
    reviewType_sent,
    reviewType_para
} from "@/confs/reviewType";
import IS_DEBUG from "@/confs/debugMode";
<<<<<<< .mine
import { START, TEST, MAIN, REVIEW, RESULT, DETAIL } from "@/confs/pageType";
||||||| .r17692
import {START, TEST, MAIN, REVIEW, RESULT, DETAIL} from "@/confs/pageType";
=======
import {START, TEST, MAIN, REVIEW, RESULT, DETAIL, LOADING} from "@/confs/pageType";
>>>>>>> .r17764
import timeManage from "@/plugins/TimerUtil.js";
<<<<<<< .mine
import {
    initBasicData,
    isTeacher,
    logData,
    getData,
    postData,
    roundTotal,
    getRecord
} from "@/confs/questionBasicData";
import {
    biz,
    id,
    key,
    jiaocai,
    quesItems,
    initQuestionData,
    getAns
} from "@/plugins/question";
import {
    RECORD_PROGRESS,
    RECORD_RESULT,
    RECORD_PLAY_LOCAL,
    RECORD_STOP_PLAY_LOCAL
} from "@/confs/engeenEventType";
||||||| .r17692
import {initBasicData, isTeacher, logData, getData, postData, roundTotal, getRecord} from "@/confs/questionBasicData";
import { biz, id, key, jiaocai, quesItems, initQuestionData, getAns} from "@/plugins/question";
import {RECORD_PROGRESS, RECORD_RESULT, RECORD_PLAY_LOCAL, RECORD_STOP_PLAY_LOCAL} from "@/confs/engeenEventType";
=======
import {initBasicData, isTeacher, logData, getData, postData, roundTotal, getRecord, isVip} from "@/confs/questionBasicData";
import { biz, id, key, jiaocai, quesItems, initQuestionData, getAns} from "@/plugins/question";
import {RECORD_PROGRESS, RECORD_RESULT, RECORD_PLAY_LOCAL, RECORD_STOP_PLAY_LOCAL} from "@/confs/engeenEventType";
>>>>>>> .r17764
export default {
    name: "spoken-words",
    props: {
        biz: String,
        engeen: String,
        data: {
            type: Object, //{keys,vip_type,userId}
            default() {
                return null;
            }
        }
    },
    provide() {
        return {
            recorderProxy: recorderProxy
        };
    },
    created() {
        initBasicData(this.data);
        let _this = this;
        this.$axios({
            method: "post",
            url: getData.as_url,
            data: qs.stringify(getData.data),
            responseType: "json"
        })
            .then(({ data: spokenWords }) => {
                try {
                    _this.spokenData = spokenWords.data[0];
                } catch (e) {
                    throw new Error("返回数据格式不对，请再次确认");
                }
                initQuestionData(spokenWords.data, _this.biz, _this.engeen);
                _this.roundTotal = roundTotal;
                this.storedRecordData = setOriRecordData(
                    _this.roundTotal,
                    _this.wordsNum
                );
            })
<<<<<<< .mine
            ["catch"](err => {
||||||| .r17692
            ["catch"]((err) => {
=======
            .catch((err) => {
>>>>>>> .r17764
                console.log(err);
            });
        _this.spokenData = spokenWords.data[0];
    },
    destroyed() {
        timeManage.destroy();
    },
    mounted() {
        this.storedRecordData = setOriRecordData(
            this.roundTotal,
            this.wordsNum
        );
    },
    data() {
        return {
            spokenData: null,
            step: LOADING, // loading start test main review result detail
            mode: IS_DEBUG ? 2 : 0, // 0 纠错 1 领读 2 速度
            targetScore: 70, //目标分数
            title: "读记词语", //题型名称
            vipType: "vip", //vip类型
            isVip: isVip,
            current: -1, //当前词的索引
            currentScore: 0, //当前词分数

            failTarCount: 0, //纠错模式 分数没有达到目标分数次数

            audioBtmDisabled: true,
            recorderBtmDisabled: true,
            playlocalBtmDisabled: true,

            recordProgress: 0,
            nextBtnShow: false,
            completeBtnShow: false,
            pauseBtnShow: true,

            isPause: false,
            recordIngore: 0,
            playLocalIngore: 0,
            roundTotal: 1, //总遍数
            roundNow: 0, //当前遍数
            storedRecordData: [], //存储起来的录音数据
            reviewType: reviewType_word,
            spokenResult: {},
<<<<<<< .mine
            ...{ START, TEST, MAIN, REVIEW, RESULT, DETAIL },
||||||| .r17692
            ...{START, TEST, MAIN, REVIEW, RESULT, DETAIL},
=======
            ...{START, TEST, MAIN, REVIEW, RESULT, DETAIL, LOADING},
>>>>>>> .r17764
            recordResult: null, //返回的答题记录
            showRoundOverCon: false, //切换到下一遍时显示的浮层
            netType: 0,
            netStartTime: 0
        };
    },
    computed: {
        resource() {
            if (!this.spokenData) {
                return [];
            }
            let ret = [];
            this.spokenData.ques_item.forEach(el => {
                ret.push(el.audio);
                ret.push(el.pic);
            });
            return ret;
        },
        wordsNum() {
            if (!this.spokenData) {
                return 0;
            }
            return this.spokenData.ques_item.length;
        },
        subTitle() {
            if (!this.spokenData) {
                return "";
            }
            let {
                jiaocai_name,
                grade_name,
                unit_name,
                keshi_name,
                unit_prefix
            } = this.spokenData.jiaocai;
            return [
                jiaocai_name,
                grade_name,
                unit_prefix,
                unit_name,
                keshi_name
            ].join(" ");
        },

        wordsList() {
            if (!this.spokenData) {
                return [];
            }
            return this.spokenData.ques_item;
        },
        spokenList() {
            if (!this.spokenData) {
                return [];
            }
            return this.spokenData.ques_item.map(el => ({
                text: el.text,
                duration: parseInt(el.duration),
                coreType: el.text.split(" ").length > 1 ? "sent" : "word"
            }));
        }
    },
    methods: {
        show() {
            this.$refs.popup.show();
        },
        hide() {
            this.$refs.popup.hide();
        },
        next() {
            this.current++;
        },
        pause() {
            this.isPause = true;
        },
        complete() {
            this.step = REVIEW;
            storePageData(this.step);
        },
        roundOver() {
            if (this.roundNow === this.roundTotal - 1) {
                this.completeBtnShow = true;
            } else {
                let _this = this;
                this.showRoundOverCon = true;
                _this.roundNow++;
                setTimeout(() => {
                    _this.current = 0;
                    _this.showRoundOverCon = false;
                }, 2000);
            }
        },
        //录音之前注册事件 传入录音数据
        mainStart() {
            timeManage.onUpdate(this.updateHandle);
            recorderProxy.offAll();
            recorderProxy.on(RECORD_PROGRESS, duration => {
                this.recordProgress = parseInt(
                    (duration / this.spokenList[this.current].duration) * 100
                );
            });
            recorderProxy.on(RECORD_RESULT, ret => {
                this.recordProgress = 0;
                this.onRecordEnd(ret);
            });
            recorderProxy.on(RECORD_PLAY_LOCAL, () => {
                this.onPlaylocal();
            });
            recorderProxy.on(RECORD_STOP_PLAY_LOCAL, () => {
                this.onStopPlaylocal();
            });
            recorderProxy.refreshSpeechData(this.spokenList);
        },
        //手动停止录音
        stopRecord() {
            recorderProxy.stop();
        },
        //底部流程暂停
        spokenBtmPause() {
            if (this.step !== MAIN) {
                return false;
            }
            if (!this.recorderBtmDisabled) {
                this.recordIngore++;
                this.stopRecord();
            }
            if (!this.audioBtmDisabled) {
                this.$refs.audioBtmObj.stop();
            }
            if (!this.playlocalBtmDisabled) {
                this.playLocalIngore++;
                recorderProxy.stopPlayLocal();
            }
        },
        //底部流程继续
        spokenBtmContinue() {
            if (this.step !== MAIN) {
                return false;
            }
            if (!this.recorderBtmDisabled) {
                this.netStartTime = new Date();
                recorderProxy.record(this.current);
            }
            if (!this.audioBtmDisabled) {
                this.$refs.audioBtmObj.play();
            }
            if (!this.playlocalBtmDisabled) {
                recorderProxy.playLocal();
            }
        },
        //X close 按钮
        onClose() {
            this.spokenBtmPause();
            let _this = this;
            this.$popTip({
                tipTxt: "确定要关闭吗？",
                leftBtnTxt: "确定",
                rightBtnTxt: "取消",
                onLeftClick() {
                    _this.hide();
                },
                onRightClick() {
                    _this.spokenBtmContinue();
                },
                onClose() {
                    _this.spokenBtmContinue();
                }
            });
        },
        //下载完成
        onDownloadComplete() {
            this.step = START;
        },
        //开始页 点击开始
        onStart() {
            if (IS_DEBUG) {
                // this.onSubmmit();
                // this.step = REVIEW;
                this.step = RESULT;
            } else {
                this.step = TEST;
            }
        },
        //做题主页面 点击X关闭
        onMainClose() {
            this.spokenBtmPause();
            let _this = this;
            this.$popTip({
                tipTxt: "确定要关闭吗？",
                leftBtnTxt: "确定",
                rightBtnTxt: "取消",
                onLeftClick() {
                    _this.hide();
                },
                onRightClick() {
                    _this.spokenBtmContinue();
                },
                onClose() {
                    _this.spokenBtmContinue();
                }
            });
        },
        //音频组件准备完毕
        onAudioBtmReady() {
            this.$refs.audioBtmObj.play();
        },
        //音频播放完成
        onAudioBtmEnd() {
            this.audioBtmDisabled = true;
            this.recorderBtmDisabled = false;
        },
        //录音结束
        onRecordEnd(ret) {
            storeRecordData(this.roundNow, this.current, ret);
            if (this.recordIngore > 0) {
                this.recordIngore--;
                return false;
            }
            this.currentScore = ret.score;
            this.recorderBtmDisabled = true;
            switch (this.mode) {
                case 1:
                    this.$nextTick(() => {
                        this.$refs.spokenMain.changeTeaStatus(
                            "score",
                            parseInt(this.currentScore)
                        );
                    });
                    if (this.current === this.spokenList.length - 1) {
                        this.roundOver();
                    } else {
                        this.nextBtnShow = true;
                    }
                    break;
                case 2:
                    this.$nextTick(() => {
                        this.$refs.spokenMain.changeTeaStatus(
                            "score",
                            parseInt(this.currentScore)
                        );
                    });
                    if (this.current === this.spokenList.length - 1) {
                        this.roundOver();
                    } else {
                        setTimeout(() => {
                            this.next();
                        }, 1000);
                    }
                    break;
                case 0:
                default:
                    this.playlocalBtmDisabled = false;
                    recorderProxy.playLocal();
                    this.$refs.playlocalObj.load();
                    break;
            }
        },
        //播放录音开始回调
        onPlaylocal() {
            this.$refs.playlocalObj.play();
        },
        //播放录音停止回调
        onStopPlaylocal() {
            if (this.playLocalIngore > 0) {
                this.playLocalIngore--;
                return false;
            }
            this.$refs.playlocalObj.stop();
            this.playlocalBtmDisabled = true;

            this.$nextTick(() => {
                this.$refs.spokenMain.changeTeaStatus(
                    "score",
                    parseInt(this.currentScore)
                );
            });
            if (this.currentScore < this.targetScore && this.failTarCount < 1) {
                setTimeout(() => {
                    this.audioBtmDisabled = false;
                    this.failTarCount++;
                }, 1000);
                return false;
            }

            if (this.current === this.spokenList.length - 1) {
                this.roundOver();
            } else {
                this.nextBtnShow = true;
            }
        },

        //暂停 之后继续
        onPauseContinue() {
            this.isPause = false;
        },
        onPauseClose() {
            this.onClose();
        },

        //切换模式弹窗弹出
        onModeTipPop() {
            this.spokenBtmPause();
        },
        //切换模式弹窗关闭
        onTipCancel() {
            this.spokenBtmContinue();
        },
        onBack() {
            this.step = RESULT;
        },
        onScoreDetail() {
            this.step = DETAIL;
        },
        onDoAgain() {
            this.current = -1;
            this.currentScore = 0;

            this.failTarCount = 0;

            this.audioBtmDisabled = true;
            this.recorderBtmDisabled = true;
            this.playlocalBtmDisabled = true;

            this.recordProgress = 0;
            this.nextBtnShow = false;
            this.completeBtnShow = false;
            this.pauseBtnShow = true;

            this.isPause = false;
            this.recordIngore = 0;
            this.playLocalIngore = 0;
            this.roundNow = 0;
            this.storedRecordData = [];
            this.reviewType = reviewType_word;
            this.spokenResult = {};
            setOriRecordData(this.roundTotal, this.wordsNum);
            this.step = MAIN;
        },
        onOverClose() {
            this.onClose();
        },
        goResult(data) {
            this.spokenResult = data;
            this.step = RESULT;
        },
        updateHandle() {
            if (!this.isPause && (this.step === MAIN || this.step === REVIEW)) {
                updateDuration();
            }
        },
        ajaxGetRecord() {
            if (isTeacher) {
                this.recorderError();
                return;
            }
            let _this = this;
            this.$axios({
                method: "post",
                url: getRecord.as_url,
                data: qs.stringify(getRecord.data),
                responseType: "json"
            })
                .then(({ data: recorderData }) => {
                    console.log(recorderData);
                    if (recorderData.status !== "0") {
                        _this.recorderError();
                    } else {
                        let recordObj = {};
                        if (
                            recorderData.data &&
                            typeof recorderData.data.data === typeof ""
                        ) {
                            recordObj = JSON.parse(recorderData.data.data);
                            // 说明是js的答题记录
                            if (recordObj.script === "js") {
                                // seStoredData(recordObj);
                                _this.recordResult = recordObj;
                            }
                        } else {
                            _this.recorderError();
                        }
                    }
                })
<<<<<<< .mine
                ["catch"](err => {
||||||| .r17692
                ["catch"]((err) => {
=======
                .catch((err) => {
>>>>>>> .r17764
                    console.log(err);
                });
        },
        recorderError() {
            console.log("没有可读取的记录");
        },
        keepRecorder() {
            this.mainStart();
            seStoredData(this.recordResult);
            if (this.recordResult.view === REVIEW) {
                this.step = REVIEW;
                return;
            }
            this.roundNow = this.recordResult.roundNow;
            this.current = this.recordResult.currentQuesIndex + 1;
            this.spokenBtmContinue();
            this.recordResult = null;
        }
    },
    watch: {
        step(newVal) {
            let _this = this;
            switch (newVal) {
                case MAIN:
                    this.ajaxGetRecord();
                    this.$countdown({
                        onEnd() {
                            if (_this.recordResult) {
                                this.$popTip({
                                    tipTxt:
                                        "上次答题没有完成哦~<br>要不要从上次的位置继续？",
                                    leftBtnTxt: "从头再来",
                                    rightBtnTxt: "继续答题",
                                    onLeftClick() {
                                        _this.spokenBtmContinue();
                                        _this.mainStart();
                                        _this.current = 0;
                                        _this.recordResult = null;
                                    },
                                    onRightClick() {
                                        _this.keepRecorder();
                                    },
                                    onClose() {
                                        _this.keepRecorder();
                                    }
                                });
                            } else {
                                _this.mainStart();
                                _this.current = 0;
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
        },
        current(newVal) {
            if (this.step !== MAIN) {
                return;
            }
            if (this.isPause) {
                return;
            }
            if (newVal >= this.spokenList.length) {
                this.roundOver();

                return false;
            }
            this.failTarCount = 0;
            recorderProxy.offset(newVal);
            switch (this.mode) {
                case 0:
                case 1:
                    this.audioBtmDisabled = false;
                    break;
                case 2:
                    this.recorderBtmDisabled = false;
                    break;
            }
            this.nextBtnShow = false;
        },
        isPause(newVal) {
            if (this.current >= this.spokenList.length) {
                this.roundOver();
                return false;
            }
            if (newVal) {
                this.spokenBtmPause();
            } else {
                this.spokenBtmContinue();
            }
        },
        mode(newVal, oldVal) {
            if (this.step !== MAIN) {
                return false;
            }
            this.recorderBtmDisabled = true;
            this.audioBtmDisabled = true;
            this.playlocalBtmDisabled = true;
            setTimeout(() => {
                switch (newVal) {
                    case 0:
                    case 1:
                        this.audioBtmDisabled = false;
                        break;
                    case 2:
                        this.recorderBtmDisabled = false;
                        break;
                }
            }, 1000);
        },
        audioBtmDisabled(newVal) {
            if (!newVal) {
                this.$refs.spokenMain.changeTeaStatus("audio");
                this.$nextTick(() => {
                    this.$refs.audioBtmObj.play();
                });
            } else {
                this.$refs.spokenMain.changeTeaStatus("default");
            }
        },
        recorderBtmDisabled(newVal) {
            if (!newVal) {
                this.$refs.spokenMain.changeTeaStatus("record");
                this.netStartTime = new Date();
                recorderProxy.record(this.current);
            } else {
                this.$refs.spokenMain.changeTeaStatus("default");
            }
        },
        playlocalBtmDisabled(newVal) {
            if (!newVal) {
                recorderProxy.playLocal();
            } else {
                // recorderProxy.stopRecord();
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.spoken-words {
    .start-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        .words-content {
            margin: 45px 0 70px 0;
            font-size: 28px;
            .split {
                display: inline-block;
                width: 3px;
                height: 20px;
                border-radius: 3px;
                background: #ddd;
                margin: 0 8px;
            }
        }
    }
    .words-list {
        color: #666;
        margin-top: 40px;
        position: relative;
        .word {
            font-size: 30px;
        }
        .translate,
        .sentence,
        .sentence_exp {
            margin-top: 10px;
            font-size: 18px;
        }
        .translate {
            margin-top: 30px;
        }
        .tag {
            border-radius: 999px;
            width: 42px;
            background: #6ed2ff;
            color: #fff;
            line-height: 1.5;
            text-align: center;
            margin: 10px 0;
        }
        .pic {
            position: absolute;
            right: 50px;
            top: 0;
            width: 200px;
        }
    }
    .result-key {
        font-size: 18px;
        color: #333;
        margin-right: 14px;
    }
    .result-value {
        font-size: 22px;
        color: #29b8f9;
    }
}
</style>
