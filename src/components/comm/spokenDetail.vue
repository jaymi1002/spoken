<template>
<detail-frame :score="score" :vipType="vipType" @onClose="$emit('onClose')">
        <div class="spoken-detail rel" slot="main">
                <ques-list ref="quesList"  :pageType="pageType" :reviewType="reviewType" :quesArr="quesArr"  @onReviewPlay="onReviewPlay" @onReviewPlayOver="onReviewPlayOver"></ques-list>
        </div>
        <div slot="bottom" class="rel hpt100">
            <div class="df abs hpt100 wpt100 align-center wh vertical-middle">
                 <back-btn @click="$emit('onBack')"></back-btn>
            </div>
        </div>
</detail-frame>
</template>
<script>
import {DEFAULT, PLAYING, PLAYINGRECORDING} from "@/confs/reviewStatConf";
import {getBestRecordData} from "@/plugins/storedDataUtil";
import IS_DEBUG from "@/confs/debugMode";
export default {
    props: {
        vipType: String,
        quesArr: Array,
        reviewType: String,
        pageType: String,
        score: Number
    },
    created() {
        console.log(this.score);
    },
    name: "spoken-detail",
    data() {
        return {
            reviewStatus: DEFAULT, //重读页和详情页的活动状态，-1是暂停状态，0是播放元音，1是录音，2是播放录音。
            reviewActiveIndex: -1 //重读页和详情页的当前处于活动状态的题目id;-1表示没有处于活动状态的题目
        };
    },
    methods: {
        // 停止也是走这个接口。
        onReviewPlay(index, btnIndex) {
            if (this.reviewStatus != DEFAULT) {
                this.stop();
                // 如果点击的按钮不是活动中的按钮就启动该按钮，否则当前页面处于default状态。
                if (this.reviewStatus !== btnIndex || this.reviewActiveIndex !== index) {
                    this.$refs.quesList.play(index, btnIndex);
                    this.reviewActiveIndex = index;
                    this.reviewStatus = btnIndex;
                } else {
                    this.onReviewPlayOver(index, btnIndex);
                }
            } else {
                this.$refs.quesList.play(index, btnIndex);
                this.reviewActiveIndex = index;
                this.reviewStatus = btnIndex;
            }
        },
        onReviewPlayOver(index, btnIndex) {
            this.reviewStatus = DEFAULT;
            this.reviewActiveIndex = -1;
        },
        stop() {
            if (this.reviewActiveIndex === -1) {
                this.reviewActiveIndex = 0;
            }
            if (this.reviewStatus === DEFAULT) {
                this.reviewStatus = PLAYING;
            }
            this.$refs.quesList.stop(this.reviewActiveIndex, this.reviewStatus);
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
