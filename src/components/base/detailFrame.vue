<template>
    <div class="detail-frame-container">
        <div class="result-score-comp">
            <span class="rel" style="top:15px;"><em>我的成绩</em>{{Math.floor(score)}}<em>分</em></span>
        </div>
        <div class="detail-frame">
            <div class="frame-top">
                <div class="top-left-side">
                    <s-vip :vipType="vipType"></s-vip>
                </div>
                <p class="top-title"></p>
                <div class="top-right-side">
                    <span class="internet-tip">
                        <span class="iconfont icon-internet"></span>
                        <span>{{internet}}</span>
                    </span>
                    <close @click="$emit('onClose')"></close>
                </div>
            </div>
            <div class="frame-main">
                <!-- <icon-tip></icon-tip> -->
                <slot name="main"></slot>
            </div>
            <div class="frame-bottom">
                <slot name="bottom"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "detail-frame",
    props: {
        vipType: String,
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
.detail-frame-container{
    height: 100%;
    text-align: center;
    .result-score-comp{
        width: 594px;
        height: 115px;
        background-image:url("../../images/bg_title_score_blue.png");
        color: white;
        font-size: 38px;
        font-weight: bold;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
        margin:auto;
    }
    .detail-frame {
        height: 562px;
        position: absolute;
        width: 860px;
        bottom: 0;
        left: 0;
        background: $primaryBlue;
        border-radius: 20px;
        padding: 0 20px;
        .frame-top{
            height: 64px;
            position: relative;
        }
        .frame-bottom {
            height: 80px;
            position: relative;
        }
        .frame-top {
            padding-bottom: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: flex-end;
            color: #fff;
            .top-left-side,
            .top-right-side {
                width: 200px;
            }
            .top-left-side {
                text-align: left;
            }
            .top-right-side {
                text-align: right;
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
            height: 389px;
            background-color: #fff;
            padding: 17px 20px;
            border-radius: 20px;
            position: relative;
        }
    }
}

</style>
