<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 14:29:29
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 17:12:23
 -->
<template>
    <div class="spoken-start-wrapper">
        <div class="spoken-start-header">
            <s-vip :vipType="vipType"></s-vip>
            <s-title>{{title}}</s-title>
            <p class="sub-title mt10">{{subTitle}}</p>
            <close class="header-close" @click="$emit('onClose')"></close>
        </div>
        <div class="spoken-start-main">
            <slot></slot>
        </div>
        <div class="spoken-start-bottom">
            <start-btn :disabled="!ready" @click="$emit('onStart')"></start-btn>
        </div>
    </div>
</template>
<script>
export default {
    name: "spoken-start",
    props: {
        title: String,
        vipType: String,
        subTitle: String
    },
    inject: ["recorderProxy"],
    data() {
        return {
            ready: false
        };
    },
    mounted() {
        let _this = this;
        this.recorderProxy.on("onReady", () => {
            this.ready = true;
        });
        this.recorderProxy.on("onError", (err) => {
            this.$popTip({
                tipTxt: `${err.code}:${err.message}`,
                leftBtnTxt: "去帮助中心",
                rightBtnTxt: "已调试完成",
                onLeftClick() {
                    this.$popTip({
                        tipTxt: "调试好了",
                        leftBtnTxt: "确定",
                        onLeftClick() {
                            _this.recorderProxy.refresh();
                        },
                        onClose() {
                            _this.recorderProxy.refresh();
                        }
                    });
                },
                onRightClick() {
                    _this.recorderProxy.refresh();
                },
                onClose() {
                    _this.recorderProxy.refresh();
                }
            });
        });
        this.recorderProxy.init(
            {
                coreType: "sent"
            },
            [
                {
                    text: "test a simple"
                }
            ]
        );
    },
    computed: {}
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.spoken-start-wrapper {
    width: 790px;
    height: 540px;
    padding: 30px 40px;
    margin: 0 15px;
    background-color: $primaryBlue;
    border-radius: 50px;
    position: relative;
    .spoken-start-header {
        width: 100%;
        height: 130px;
        .sub-title {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
        }
        .header-close {
            position: absolute;
            right: 40px;
            top: 35px;
        }
    }
    .spoken-start-main {
        height: 285px;
        width: 900px;
        background-color: #fff;
        margin-left: -55px;
        border-radius: 20px;
    }
    .spoken-start-bottom {
        display: flex;
        height: 135px;
        justify-content: center;
        align-items: center;
    }
}
</style>
