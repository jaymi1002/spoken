<template>
    <div class="review-btn-comp" :class="[compStyle]">
        <review-audio-btn v-if="showAudio" :btnIndex="0" :startMs="0" :endMs="0" :src="questionData.audio" @click="$emit('onReviewPlay',0)" ref="reviewAudioBtn" @onEnd="onReviewPlayOver(0)"></review-audio-btn>
        <review-record-btn v-if="showRecord" :btnIndex="1"  @click="$emit('onReviewPlay',1)" ref="reviewRecordBtn" :progress="0" :disabled="true"></review-record-btn>
        <review-playrecord-btn v-if="showPlayRecord"  :btnIndex="2" :src="recordData.datas.audio"  @click="$emit('onReviewPlay',2)" ref="reviewPlayRecorderBtn" @onEnd="onReviewPlayOver(2)"></review-playrecord-btn>
    </div>
</template>
<script>
import {DEFAULT, PLAYING, RECORDING, PLAYINGRECORDING} from "@/confs/reviewStatConf";
export default {
    props: {
        btnArr: Array,
        questionData: Object,
        recordData: Object
    },
    data() {
        return {
            showAudio: true,
            showRecord: true,
            showPlayRecord: true,
            btnNum: 0,
            compStyle: "btn3"
        };
    },
    computed: {

    },
    created() {
        [this.showAudio, this.showRecord, this.showPlayRecord] = this.btnArr;
        this.btnArr.forEach((element) => {
            if (element) {
                this.btnNum++;
            }
        });
        if (this.btnArr < 1) {
            throw new Error("按钮个数不能为0");
        }
        this.compStyle = "btn" + this.btnNum;
    },
    methods: {
        stop(btnIndex) {
            switch (btnIndex) {
                case PLAYING:
                    this.$refs.reviewAudioBtn.stop(btnIndex);
                    break;
                case RECORDING:
                    this.$refs.reviewRecordBtn.stop(btnIndex);
                    break;
                case PLAYINGRECORDING:
                    this.$refs.reviewPlayRecorderBtn.stop(btnIndex);
                    break;
                default:
                    // this.$refs.reviewAudioBtn.stop(btnIndex);

                    break;
            }

        },
        play(btnIndex) {
            switch (btnIndex) {
                case PLAYING:
                    this.$refs.reviewAudioBtn.play(btnIndex);
                    break;
                case RECORDING:
                    this.$refs.reviewRecordBtn.play(btnIndex);
                    break;
                case PLAYINGRECORDING:
                    this.$refs.reviewPlayRecorderBtn.play(btnIndex);
                    break;
                default:
                    // this.$refs.reviewAudioBtn.stop(btnIndex);

                    break;
            }

        },
        onReviewPlayOver(btnIndex) {
            this.$emit('onReviewPlayOver', btnIndex);
        },
        setProgress(pro) {
            this.$refs.reviewRecordBtn.progress = pro;
        }
    },
    name: "review-btn-comp"
};
</script>
<style lang="scss">
    .review-btn-comp{
        width: 132px;
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
    }
    .review-btn-comp.btn2{
        width: 82px;
    }
</style>
