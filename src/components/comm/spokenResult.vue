<template>
<result-frame :timeStr="timeStr" :score="score" :vipType="vipType" @onClose="$emit('onClose')">
        <div class="rel" slot="main">
                <slot></slot>
        </div>
        <div slot="bottom" class="rel hpt100 df vertical-middle">
            <div class="result-bottom">
                <over-close-btn @click="$emit('onOverClose')"></over-close-btn>
                <do-again-btn @click="onDoAgain"></do-again-btn>
                <score-detail-btn @click="$emit('onScoreDetail')"></score-detail-btn>
            </div>
        </div>
</result-frame>
</template>
<script>
import Vue from "vue";
import qs from "qs";
import {isTeacher, canDo} from "@/confs/questionBasicData";
export default {
    props: {
        vipType: String,
        score: Number,
        duration: Number
    },
    data() {
        return {
            // timeStr: ""
        };
    },
    created() {
        console.log(this.score);
    },
    computed: {
        timeStr() {
            if (Number(this.duration) === 0) {
                return '00:00:00';
            }
            let seconds = this.duration;
            let day = parseInt(seconds / 60 / 60 / 24);
            let hour = parseInt(seconds / 60 / 60 % 24);
            let minutes = parseInt(seconds / 60 % 60);
            let sec = parseInt(seconds % 60);
            let dayFlag = false;
            let hourFlag = false;
            // let minutesFlag = false;
            // let secFlag = false;
            dayFlag = day !== 0;
            hourFlag = hour !== 0;
            hourFlag = true;
            // minutesFlag = minutes !== 0;
            // secFlag = sec !== 0;

            function getDayRes() {
                return dayFlag ? (day >= 10 ? day + '天' : '0' + day + '天') : '';
            }

            function getHourRes() {
                return hourFlag ? (hour >= 10 ? hour + ':' : '0' + hour + ':') : '';
            }

            function getMinRes() {
                return minutes >= 10 ? minutes + ':' : '0' + minutes + ':';
            }

            function getSecRes() {
                return sec >= 10 ? sec + '' : '0' + sec + '';
            }
            return getHourRes() + getMinRes() + getSecRes();
        }
    },
    methods: {
        onDoAgain() {

            Vue.prototype.$axios.get(canDo.as_url, {
                method: "GET",
                params: canDo.data,
                url: canDo.as_url,
                data: qs.stringify(canDo.data),
                responseType: "json"
            })
                .then(({ data: result }) => {
                    if (result.status === "0") {
                        console.log("可以再做一次");
                        this.$emit('onDoAgain');
                    } else {
                        console.log("不能再做一次");
                    }
                    this.isSubmmiting = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.isSubmmiting = false;
                });
        }
    },
    name: "spoken-result"
};
</script>
<style lang="scss">
    .result-bottom{
        display: flex;
        height: 100%;
        width: 550px;
        justify-content: space-between;
        color: white;
        align-items: center;
    }

</style>
