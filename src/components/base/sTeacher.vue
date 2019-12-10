<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 15:06:25
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 15:44:31
 -->
<template>
    <div class="s-teacher">
        <img src="@/images/t_default.png" v-show="status == 'default'" alt />
        <img src="@/images/t_audio.png" v-show="status == 'audio'" alt />
        <img src="@/images/t_record.png" v-show="status == 'record'" alt />
        <div class="teacher-score" v-show="status == 'score'">
            <img src="@/images/t_score.png" alt />
            <p class="score-box">
                <span :class="scoreClass">{{score}}</span>分
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "s-teacher",
    props: {
        status: {
            type: String,
            default: "default",
            validator(val) {
                let ret =
                    ["audio", "record", "score", "default"].indexOf(val) > -1;
                return ret;
            }
        },
        score: Number
    },
    computed: {
        scoreClass() {
            if (this.score < 60) {
                return "score-bad";
            } else if (this.score > 59 && this.score < 80) {
                return "score-ordinary";
            } else {
                return "score-good";
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.s-teacher {
    width: auto;
    & img {
        height: 235px;
    }
    .teacher-score {
        position: relative;
        .score-box {
            position: absolute;
            top: 53%;
            right: 46%;
            font-size: 18px;
            & > span {
                margin-right: 5px;
            }
            .score-good {
                color: $scoreGood;
            }
            .score-ordinary {
                color: $scoreOrdinary;
            }
            .score-bad {
                color: $scoreBad;
            }
        }
    }
}
</style>
