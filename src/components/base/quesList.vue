<template>
<div class="ques-list">
    <div v-for="(el,index) in recordData" v-bind:key="index" class="review-item" :class="[reviewType]">
        <word-review-item v-if="reviewType===reviewType_word" :pageType="pageType" :vip="true" :recordShow="true" :recordData="recordData[index]" :questionData="quesArr[index]" :score="recordData[index].score" @onReviewRecord="onReviewRecord(index)"  @onReviewPlayRecord="onReviewPlayRecord(index)"  @onReviewPlay="onReviewPlay(index)" @onReviewRecordOver="onReviewRecord(index)"  @onReviewPlayRecordOver="onReviewPlayRecordOver(index)"  @onReviewPlayOver="onReviewPlayOver(index)" ref="wordReviewItem"></word-review-item>
        <sent-review-item v-if="reviewType===reviewType_sent" ref="sentReviewItem" :pageType="pageType"></sent-review-item>
        <para-review-item v-if="reviewType===reviewType_para" ref="paraReviewItem" :pageType="pageType"></para-review-item>
    </div>
</div>
</template>
<script>
import {resetCurrenRecordData, getCurrenRecordData} from "@/plugins/storedDataUtil";
import {reviewType_word, reviewType_sent, reviewType_para} from "@/confs/reviewType";
import {DEFAULT, PLAYING, RECORDING, PLAYINGRECORDING} from "@/confs/reviewStatConf";
export default {
    props: {
        quesArr: Array,
        reviewType: String,
        pageType: String
    },
    data() {
        return {
            recordData: [],
            reviewType_word: reviewType_word,
            reviewType_sent: reviewType_sent,
            reviewType_para: reviewType_para};

    },
    computed: {
        reviewItemList() {
            switch (this.reviewType) {
                case reviewType_word:
                    return this.$refs.wordReviewItem;
                    break;
                case reviewType_sent:
                    return this.$refs.sentReviewItem;
                    break;
                case reviewType_para:
                    return this.$refs.paraReviewItem;
                    break;
                default:
                    return this.reviewItemList;
                    break;
            }
        }
    },
    name: "ques-list",
    created() {
        resetCurrenRecordData();
        this.recordData = getCurrenRecordData();
    },
    methods: {
        stop(quesIndex, btnIndex) {
            this.reviewItemList[quesIndex].stop(btnIndex);
        },
        play(quesIndex, btnIndex) {
            this.reviewItemList[quesIndex].play(btnIndex);
        },
        setProgress(quesIndex, pro) {
            this.reviewItemList[quesIndex].setProgress(pro);
        },
        setRecordData(quesIndex, recordData) {
            this.recordData = [...getCurrenRecordData()];
            // this.reviewItemList[quesIndex].setRecordData(recordData);
        },
        onReviewPlay(index) {
            this.$emit('onReviewPlay', index, PLAYING);
        },
        onReviewRecord(index) {
            this.$emit('onReviewPlay', index, RECORDING);
        },
        onReviewPlayRecord(index) {
            this.$emit('onReviewPlay', index, PLAYINGRECORDING);
        },
        onReviewPlayOver(index) {
            this.$emit('onReviewPlayOver', index, PLAYING);
        },
        onReviewRecordOver(index) {
            this.$emit('onReviewPlayOver', index, RECORDING);
        },
        onReviewPlayRecordOver(index) {
            this.$emit('onReviewPlayOver', index, PLAYINGRECORDING);
        }
    }
};
</script>
<style lang="scss">
   .ques-list{
       max-height: 410px;
       overflow: auto;
       display: flex;
       flex-wrap: wrap;
        justify-content: space-between;
   }
   .review-item{
        background: #E8F8FF;
        padding: 8px;
        padding-left: 12px;
        margin-bottom: 10px;
        flex-grow: 0;
        flex-shrink: 1;
    }
   .reviewType_word{
       width: 385px;
    }
</style>
