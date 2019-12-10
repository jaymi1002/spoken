<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 15:18:59
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-05 11:40:29
 -->
<template>
    <s-frame :netType="netType" :title="title" :vipType="vipType" @onClose="$emit('onClose')">
        <div class="spoken-main" slot="main">
            <div class="main-left" v-if="!noTeacher">
                <s-teacher class="teacher" :status="status" :score="score"></s-teacher>
                <div class="switch-wrapper">
                    <slot name="switch"></slot>
                </div>
            </div>
            <div class="main-right">
                <icon-tip></icon-tip>
                <slot></slot>
            </div>
        </div>
        <div slot="bottom">
            <slot name="bottom"></slot>
        </div>
        <div v-show="showRoundOverCon"  class="roundOverCon" slot="roundOverCon">
            <span>现在开始读第{{roundNow+1}}遍</span>
        </div>
    </s-frame>
</template>
<script>
export default {
    name: "spoken-main",
    props: {
        title: String,
        vipType: String,
        noTeacher: Boolean,
        roundNow: Number,
        showRoundOverCon: Boolean,
        netType: Number
    },
    data() {
        return {
            status: "default",
            score: 0,
            showRoundOver: false
        };
    },
    created() {
        console.log(2323);
    },
    methods: {
        changeTeaStatus(status, score) {
            console.log(status, score);
            this.status = status;
            if (score) {
                this.score = score;
            }
        }
    }
};
</script>
<style lang="scss">
.spoken-main {
    width: 100%;
    height: 100%;
    display: flex;
    .main-left {
        width: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        .teacher {
            margin-top: -50px;
        }
        .switch-wrapper {
            position: absolute;
            width: 100%;
            height: 190px;
            left: 0;
            bottom: 0;
            background: #fff;
            padding: 10px 0 0;
            text-align: center;
            border-bottom-left-radius: 20px;
        }
    }
    .main-right {
        flex: 1;
        padding: 15px 0;
        position: relative;
    }
}
  .roundOverCon{
        color: #00CCFF;
        font-size: 26px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content:center;
        z-index: 100;
        background: black;
        opacity: 0.7;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
