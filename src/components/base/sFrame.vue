<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 14:24:06
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 15:27:10
 -->
<template>
    <div class="spoken-frame">
        <div class="frame-top">
            <div class="top-left-side">
                <s-vip :vipType="vipType"></s-vip>
            </div>
            <p class="top-title">{{title}}</p>
            <div class="top-right-side">
                <span class="internet-tip"  v-bind:style="{ color: networkColor}">
                    <span class="iconfont icon-internet"></span>
                    <span>{{networkText}}</span>
                </span>
                <close @click="$emit('onClose')"></close>
            </div>
        </div>
        <div class="frame-main">
            <slot name="main"></slot>
        </div>
        <div class="frame-bottom">
            <slot name="bottom"></slot>
        </div>
        <slot name="roundOverCon"></slot>
    </div>
</template>
<script>
import {NETWORDK_GOOD, NETWORDK_NORMAL, NETWORK_BAD, NETWORKD_BREAKDOWN, networkStates} from "@/confs/networkStateType";
export default {
    name: "s-frame",
    props: {
        vipType: String,
        title: String,
        netType: Number
    },
    data() {
        return {
            internet: "网速良好!"
        };
    },
    computed: {
        networkText() {
            return networkStates[this.netType || 0].text;
        },
        networkColor() {
            return networkStates[this.netType || 0].color;
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.spoken-frame {
    height: 100%;
    background: $primaryBlue;
    border-radius: 20px;
    padding: 0 20px;
    .frame-top,
    .frame-bottom {
        height: 75px;
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
        height: 450px;
        background-color: #fff;
        border-radius: 20px;
    }
}
</style>
