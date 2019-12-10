<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:42:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 16:05:26
 -->
<template>
    <div class="result-title rel tc">
        <div v-if="imgType==='good_vip'" class="abs wpt100" style="top:0">
            <img src="@/images/result_title_good_vip.png" style="margin:auto" alt="">
        </div>
        <div v-if="imgType==='bad_vip'" class="abs wpt100" style="top:-50px;">
            <img src="@/images/result_title_bad_vip.png" style="margin:auto" alt="">
        </div>
        <div  v-if="imgType==='bad_novip'" class="abs wpt100" style="top:0;">
            <img src="@/images/result_title_bad_novip.png" style="margin:auto" alt="">
        </div>
        <div  v-if="imgType==='good_novip'" class="abs wpt100" style="top:0;">
            <img src="@/images/result_title_good_novip.png" style="margin:auto" alt="">
        </div>
        <div class="result-score-comp">
            <span class="rel" style="top:15px;">{{score}}<em>分</em></span>
        </div>
    </div>
</template>
<script>
export default {
    name: "result-title",
    props: {
        score: Number,
        vipType: String
    },
    computed: {
        imgType() {
            let str = "";
            if (this.score >= 60) {
                str += "good";
            } else {
                str += "bad";
            }
            if (this.vipType === "false") {
                str += "_vip";
            } else {
                str += "_novip";
            }

            return str;
        },
        isVip() {
            return str !== "false";
        }
    },
    methods: {
        proxyClick() {
            this.$emit("click");
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/style/variables.scss";
.result-title{
    width: 900px;
    height: 230px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    justify-content: flex-end;
    align-items: center;
    img{
        transform: rotateY(180deg);//不知是什么原因导致的图片从flash导出来的时候，跟镜子一样是反着显示的，所以做了一个旋转
    }
    .result-score-comp{
        width: 426px;
        height: 105px;
        background-image:url("../../../images/bg_title_score_red.png");;
        color: white;
        font-size: 38px;
        font-weight: bold;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }

}
</style>
