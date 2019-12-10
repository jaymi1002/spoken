<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 14:24:06
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 15:27:10
 -->
<template>
    <div class="result-frame">
        <div class="frame-top">
            <div class="frame-title">
                <result-title :score="score" :vipType="vipType"></result-title>
            </div>
            <div class="top-left-side">
                <s-vip :vipType="vipType"></s-vip>
            </div>
            <div class="top-right-side">
                <close @click="$emit('onClose')"></close>
            </div>
        </div>
        <div class="frame-main">
            <div class="g9" style="vertical-align=middle"> <em class="f22">用时</em><em class="f20">{{timeStr}}</em> </div>
            <slot name="main"></slot>
        </div>
        <div class="frame-bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "result-frame",
    props: {
        vipType: String,
        title: String,
        timeStr: String,
        score: Number
    },
    data() {
        return {
            internet: "网速良好!"
        };
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.result-frame {
    height: 100%;
    background-image: url("../../images/bgResultPage.png");
    background-repeat: no-repeat;
    background-position-y: 75px;
    display: flex;
    flex-direction: column;

    .frame-bottom {
        height: 90px;
        position: relative;
    }
    .frame-top {
        height: 230px;
        box-sizing: border-box;
        display: flex;
        color: #fff;
        position: relative;
        .top-left-side,
        .top-right-side {
            width: 200px;
        }
        .top-left-side {
            text-align: left;
            position: absolute;
            top:102px;
            left: 66px;
        }
        .top-right-side {
            text-align: right;
            top:102px;
            right: 60px;
            position: absolute;
            .internet-tip {
                position: relative;
                font-size: 16px;
                margin-right: 15px;
                top: 3px;
                & > * {
                    vertical-align: middle;
                }
            }
            .icon-internet {
                margin-right: 2px;
                &::after {
                    content: "\e752";
                    font-size: 24px;
                }
            }
            & > * {
                vertical-align: middle;
            }
        }
        .top-title {
            font-size: 36px;
            font-weight: bold;
            flex: 1;
            text-align: center;
        }
    }
    .frame-main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
