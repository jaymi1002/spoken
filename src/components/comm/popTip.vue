<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-28 16:22:23
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 19:27:34
 -->
<template>
    <div class="pop-tip-wrapper" v-if="active">
        <div class="pop-tip-box">
            <p class="tip-header">
                <i class="iconfont icon-tip">&#xe60b;</i>
                提示
                <i class="iconfont icon-close" @click="closeClick"></i>
            </p>
            <div class="tip-content">
                <div class="slot-content">
                    <slot>
                        <p class="default-text">{{tipTxt}}</p>
                    </slot>
                </div>
                <div class="tip-btn-wrapper">
                    <button
                        type="button"
                        class="left-btn"
                        v-if="leftBtnTxt"
                        @click="leftBtnClick"
                    >{{leftBtnTxt}}</button>
                    <button
                        type="button"
                        class="right-btn"
                        v-if="rightBtnTxt"
                        @click="rightBtnClick"
                    >{{rightBtnTxt}}</button>
                </div>
            </div>
        </div>
        <div class="pop-tip-mask"></div>
    </div>
</template>
<script>
export default {
    name: "pop-tip",
    props: {
        leftBtnTxt: String,
        rightBtnTxt: String,
        tipTxt: String
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        show() {
            this.active = true;
        },
        hide() {
            this.active = false;
        },
        closeClick() {
            this.hide();
            this.$nextTick(() => {
                this.$emit("onClose");
            });
        },
        leftBtnClick() {
            this.hide();
            this.$nextTick(() => {
                this.$emit("onLeftClick");
            });
        },
        rightBtnClick() {
            this.hide();
            this.$el.remove();
            this.$nextTick(() => {
                this.$emit("onRightClick");
            });
        }
    },
    watch: {
        active(newVal) {
            if (newVal) {
                document.getElementById("spokenPopup").appendChild(this.$el);
            } else {
                this.$el.remove();
            }
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
@import "@/style/popTip.scss";
.pop-tip-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .pop-tip-mask {
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        border-radius: 20px;
    }
    .pop-tip-box {
        height: 335px;
        width: 470px;
        border-top-left-radius: 200px 100px;
        border-top-right-radius: 200px 100px;
        border-bottom-left-radius: 200px 100px;
        border-bottom-right-radius: 200px 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: $primaryBlue;
        z-index: 3;
        .tip-header {
            height: 85px;
            color: #fff;
            text-align: center;
            line-height: 85px;
            font-size: 28px;
            font-weight: bold;
            position: relative;
            .icon-tip {
                font-weight: normal;
                font-size: 28px;
            }
            .icon-close {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ffcc00;
                display: inline-block;
                line-height: 40px;
                position: absolute;
                right: 20px;
                top: 20px;
                &::after {
                    content: "\e696";
                    color: #fff;
                    font-size: 24px;
                }
            }
            &:after {
                content: "";
                position: absolute;
                border-width: 15px;
                border-style: solid;
                border-color: $primaryBlue transparent transparent transparent;
                bottom: 0;
                left: 50%;
                margin-bottom: -30px;
                margin-left: -15px;
            }
        }
        .tip-content {
            height: 250px;
            width: 100%;
            background-color: #e8f8ff;
            border-top-left-radius: 30px 30px;
            border-top-right-radius: 30px 30px;
            border-bottom-left-radius: 200px 100px;
            border-bottom-right-radius: 200px 100px;
            .slot-content {
                height: 155px;
                .default-text {
                    font-size: 24px;
                    color: #333;
                    text-align: center;
                    padding: 50px;
                }
            }
            .tip-btn-wrapper {
                height: 95px;
                display: flex;
                justify-content: center;
                .left-btn,
                .right-btn {
                    width: 135px;
                    height: 40px;
                    border-radius: 40px;
                    margin: 0 10px;
                    outline: none;
                    border: none;
                    color: #fff;
                    font-size: 20px;
                    font-weight: bold;
                    &:hover {
                        opacity: 0.9;
                    }
                }
                .left-btn {
                    background: #98e844;
                    box-shadow: 0px 3px 1px #85dc2a;
                }
                .right-btn {
                    background: #ffcc00;
                    box-shadow: 0px 3px 1px #ffc20e;
                }
            }
        }
    }
}
</style>
