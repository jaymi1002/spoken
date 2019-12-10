<!--
 * @Description: 仿示例读句子
 * @Autor: lifangfang
 * @Date: 2019-11-07 16:32:27
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-12-02 16:59:43
 -->
<template>
    <popup ref="popup" class="imitate-simple">
        <pause v-show="isPause" @onContinue="onPauseContinue" @onClose="onPauseClose"></pause>
        <loading
            v-if="resource.length > 0 && step == 'loading'"
            :resource="resource"
            @onComplete="onDownloadComplete"
            @onCancel="hide"
        ></loading>
        <spoken-start
            v-if="step == 'start'"
            :title="title"
            :subTitle="subTitle"
            :vipType="vipType"
            @onClose="onClose"
            @onStart="onStart"
        >
            <div class="start-main">
                <p class="content">
                    <span>共{{sentCount}}句</span>
                </p>
                <score-range v-model="targetScore"></score-range>
                <mode-select v-model="mode" class="mt30"></mode-select>
            </div>
        </spoken-start>
        <spoken-test v-if="step == 'test'" @onComplete="step = 'main'" @onClose="onClose"></spoken-test>
        <spoken-main v-if="step == 'main'" ref="spokenMain">
            <s-progress :value="current" :total="sentCount"></s-progress>
            <div class="imitate-content">
                <p class="ques-title">
                    <img src="@/images/horn.png" alt />
                    <span>{{quesTitle.title}}</span>
                </p>
                <template v-if="quesList.length > 0">
                    <div class="ques-list" v-for="(el,index) in quesList" v-if="current == index">
                        <p class="sent">{{el.orders}}.{{el.ask[0].content}}</p>
                        <div class="input" id="imitateInput" v-if="!showAnswer"></div>
                        <div class="word-list" v-if="!showAnswer">
                            <span
                                class="word-item"
                                v-for="(item,index) in el.items"
                                @click="wordChoose(item,$event)"
                            >{{item.content[0].content}}</span>
                        </div>
                        <p class="answer" v-if="showAnswer">{{el.analyz.real}}</p>
                    </div>
                </template>
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
                <spoken-bottom v-show="showAnswer" v-if="quesList.length > 0">
                    <audio-btm
                        v-show="mode < 2"
                        slot="audio"
                        ref="audioBtmObj"
                        :disabled="audioBtmDisabled"
                        :src="quesList[current].audio"
                        :startMs="parseInt(quesList[current].analyz.starts)"
                        :endMs="parseInt(quesList[current].analyz.starts) + parseInt(quesList[current].analyz.duration)"
                        @onEnd="onAudioBtmEnd"
                    ></audio-btm>
                    <recorder-btm
                        :progress="recordProgress"
                        slot="recorder"
                        :disabled="recorderBtmDisabled"
                        @click="stopRecord"
                    ></recorder-btm>
                    <playlocal-btm
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
    </popup>
</template>
<script>
import recorderProxy from "@/plugins/singletonRecorder.js";
import { shuffle } from "@/helpers/array-comm";
import qs from "qs";
export default {
    name: "imitate-simple",
    props: {
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
    data() {
        return {
            spokenData: null,
            step: "loading", // loading start test main review result detail
            mode: 0, // 0 纠错 1 领读 2 速度
            targetScore: 70, //目标分数
            title: "仿示例读句子", //题型名称
            vipType: "vip", //vip类型

            current: 0,
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

            wordCurrentKey: 1,
            showAnswer: false
        };
    },
    created() {
        let _this = this;
        this.$axios({
            method: "post",
            url: "/proxy",
            data: qs.stringify({
                url: "https://acpf.ekwing.com/wapi/getbaseworktimucontent",
                method: "POST",
                data: JSON.stringify({ keys: _this.data.keys })
            }),
            responseType: "json"
        })
            .then(({ data: spokenWords }) => {
                _this.spokenData = spokenWords.data[0];
            })
            .catch(err => {
                console.log(err);
            });
    },
    computed: {
        resource() {
            if (!this.spokenData) {
                return [];
            }
            let ret = [];
            for (let idKey in this.spokenData.ques_item.data.question) {
                ret.push(this.spokenData.ques_item.data.question[idKey].audio);
            }
            return ret;
        },
        subTitle() {
            if (!this.spokenData) {
                return "";
            }
            let {
                jiaocai_name,
                grade_name,
                unit_name
                // keshi_name,
                // unit_prefix
            } = this.spokenData.jiaocai;
            return [
                jiaocai_name,
                grade_name,
                // unit_prefix,
                unit_name
                // keshi_name
            ].join(" ");
        },
        sentCount() {
            if (!this.spokenData) {
                return 0;
            }
            return this.spokenData.ques_item.relation[0].length;
        },
        quesTitle() {
            if (!this.spokenData) {
                return {};
            }
            return {
                audio: this.spokenData.ques_item.data.title[0].other[0].content,
                title: this.spokenData.ques_item.data.title[0].text
            };
        },
        quesList() {
            if (!this.spokenData) {
                return [];
            }
            let list = [];
            this.spokenData.ques_item.relation[0].forEach(el => {
                let question = this.spokenData.ques_item.data.question[el];
                shuffle(question.items);
                list.push(question);
            });

            return list;
        },
        spokenList() {
            if (this.quesList.length === 0) {
                return [];
            }
            let spokenList = [];
            this.quesList.forEach(el => {
                spokenList.push({
                    text: el.analyz.real,
                    duration: parseInt(el.analyz.duration),
                    coreType: "sent"
                });
            });
            return spokenList;
        }
    },
    mounted() {
        let _this = this;
        // setTimeout(() => {
        //     this.$countdown({
        //         onEnd() {
        //             _this.mainStart();
        //         }
        //     });
        // }, 1000);
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
        complete() {},
        wordChoose(item, e) {
            if (parseInt(item.key) === this.wordCurrentKey) {
                this.wordCurrentKey++;
                console.log(e);
                document.getElementById("imitateInput").appendChild(e.target);
            }
        },
        //录音之前注册事件 传入录音数据
        mainStart() {
            recorderProxy.offAll();
            recorderProxy.on("onProgress", duration => {
                this.recordProgress = parseInt(
                    (duration / this.spokenList[this.current].duration) * 100
                );
            });
            recorderProxy.on("onResult", ret => {
                this.recordProgress = 0;
                this.onRecordEnd(ret);
            });
            recorderProxy.on("onPlayLocal", () => {
                this.onPlaylocal();
            });
            recorderProxy.on("onStopPlayLocal", () => {
                this.onStopPlaylocal();
            });
            // recorderProxy.refreshSpeechData(this.spokenList);
            recorderProxy.init(
                {
                    coreType: "sent"
                },
                this.spokenList
            );
            // switch (this.mode) {
            //     case 0:
            //     case 1:
            //         this.audioBtmDisabled = false;
            //         break;
            //     case 2:
            //         this.recorderBtmDisabled = false;
            //         break;
            // }
        },
        //手动停止录音
        stopRecord() {
            recorderProxy.stop();
        },
        //底部流程暂停
        spokenBtmPause() {
            if (this.step !== "main") {
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
            if (this.step !== "main") {
                return false;
            }
            if (!this.recorderBtmDisabled) {
                recorderProxy.record();
            }
            if (!this.audioBtmDisabled) {
                this.$refs.audioBtmObj.play();
            }
            if (!this.playlocalBtmDisabled) {
                recorderProxy.playLocal();
            }
        },
        onDownloadComplete() {
            this.step = "start";
        },
        onStart() {
            this.step = "test";
        },
        onPauseContinue() {},
        onPauseClose() {},
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
                        this.completeBtnShow = true;
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
                        this.completeBtnShow = true;
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
                this.completeBtnShow = true;
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
        }
    },
    watch: {
        step(newVal) {
            let _this = this;
            switch (newVal) {
                case "main":
                    this.$countdown({
                        onEnd() {
                            _this.mainStart();
                        }
                    });
                    break;
                default:
                    break;
            }
        },
        current(newVal) {
            this.wordCurrentKey = 1;
            this.showAnswer = false;
            if (newVal >= this.spokenList.length) {
                return false;
            }
            this.failTarCount = 0;
            recorderProxy.next();
            this.nextBtnShow = false;
        },
        isPause(newVal) {
            if (newVal) {
                this.spokenBtmPause();
            } else {
                this.spokenBtmContinue();
            }
        },
        mode(newVal, oldVal) {
            if (this.step !== "main") {
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
                recorderProxy.record();
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
        },
        wordCurrentKey(newVal) {
            if (newVal > this.quesList[this.current].items.length) {
                this.showAnswer = true;
                switch (this.mode) {
                    case 0:
                    case 1:
                        this.audioBtmDisabled = false;
                        break;
                    case 2:
                        this.recorderBtmDisabled = false;
                        break;
                }
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.imitate-simple {
    .start-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        .content {
            margin: 45px 0 70px 0;
            font-size: 28px;
        }
    }
    .imitate-content {
        .ques-title {
            margin-top: 10px;
            & > img {
                width: 22px;
                height: 22px;
            }
            & > * {
                vertical-align: middle;
                font-size: 16px;
                color: #666;
                margin-right: 5px;
            }
        }

        .ques-list {
            margin-top: 40px;
            .sent {
                color: #333;
                font-size: 18px;
            }
            .input {
                margin-top: 20px;
                border-bottom: 1px solid $primaryBlue;
                height: 30px;
                padding: 5px 0;
            }

            .word-list {
                margin-top: 10px;
            }
            .word-item {
                padding: 5px 10px;
                background-color: #d6f2ff;
                color: #333;
                font-size: 18px;
                border-radius: 999px;
                margin-right: 10px;
                line-height: 28px;
                cursor: default;
            }
            .answer {
                margin-top: 30px;
                color: #999;
                font-size: 22px;
            }
        }
    }
}
</style>
