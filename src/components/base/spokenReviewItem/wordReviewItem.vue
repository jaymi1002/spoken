<template>
    <div class="word-review-item">
        <div class="flex">
            <review-btn-comp  :btnArr='btnArr' :recordData="recordData" :questionData="questionData"  @onReviewPlay="onReviewPlay" ref="reviewBtnComp" @onReviewPlayOver="onReviewPlayOver"></review-btn-comp>
            <span class="word-text" :class="[colorClass]">{{questionData.text}}</span>
        </div>
        <score-circle :score="score" :bgColorClass="bgColorClass"></score-circle>
    </div>
</template>
<script>
import {colorGood, colorBad, colorOrdinary, bgGood, bgBad, bgOrdinary} from "@/confs/cssClass";
import {DEFAULT, PLAYING, RECORDING, PLAYINGRECORDING} from "@/confs/reviewStatConf";
import {START, TEST, MAIN, REVIEW, RESULT, DETAIL} from "@/confs/pageType";
export default {
    props: {
        vip: Boolean,
        recordData: Object,
        questionData: Object,
        score: Number,
        pageType: String
    },
    data() {
        return {
            bgColorClass: "",
            colorClass: ""
        };
    },
    computed: {
        btnArr() {
            switch (this.pageType) {
                case REVIEW:
                    return [1, 1, 1];
                default:
                    return [1, 0, 1];
            }

        }
    },
    name: "word-review-item",
    created() {
        // resetCurrenRecordData();
        // this.recordData = getCurrenRecordData();
        if (this.score >= 90) {
            this.colorClass = colorGood;
            this.bgColorClass = bgGood;
        } else if (this.score >= 60) {
            this.colorClass = colorOrdinary;
            this.bgColorClass = bgOrdinary;
        } else {
            this.colorClass = colorBad;
            this.bgColorClass = bgBad;
        }
    },
    watch: {
        score(newVal) {
            if (newVal >= 90) {
                this.colorClass = colorGood;
                this.bgColorClass = bgGood;
            } else if (newVal >= 60) {
                this.colorClass = colorOrdinary;
                this.bgColorClass = bgOrdinary;
            } else {
                this.colorClass = colorBad;
                this.bgColorClass = bgBad;
            }
        }
    },
    methods: {
        setProgress(pro) {
            this.$refs.reviewBtnComp.setProgress(pro);
        },
        onReviewPlay(btnIndex) {
            switch (btnIndex) {
                case PLAYING:
                    this.$emit('onReviewPlay');
                    break;
                case RECORDING:
                    this.$emit('onReviewRecord');
                    break;
                case PLAYINGRECORDING:
                    this.$emit('onReviewPlayRecord');
                    break;

            }
        },
        stop(btnIndex) {
            this.$refs.reviewBtnComp.stop(btnIndex);
        },
        play(btnIndex) {
            this.$refs.reviewBtnComp.play(btnIndex);
        },
        onReviewPlayOver(btnIndex) {
            switch (btnIndex) {
                case PLAYING:
                    this.$emit('onReviewPlayOver');
                    break;
                case RECORDING:
                    this.$emit('onReviewRecordOver');
                    break;
                case PLAYINGRECORDING:
                    this.$emit('onReviewPlayRecordOver');
                    break;

            }
        }
    }
};
</script>
<style lang="scss">
    .word-review-item{
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
    }
    .word-text{
        font-size: 22px;
        line-height: 30px;
    }
    .flex{
        display: flex;
    }
</style>
