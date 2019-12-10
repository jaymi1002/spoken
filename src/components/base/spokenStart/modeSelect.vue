<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-25 15:27:01
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-30 11:48:45
 -->
<template>
    <div class="model-select">
        <p class="model-label">模式选择:</p>
        <div class="model-select-wrapper">
            <div
                class="select-item"
                :class="{active:current == index}"
                v-for="(el,index) in modelList"
                @click="current = index"
                v-show="modeShowList[index]"
                v-bind:key="index"
            >
                <vip-logo-rect class="vip-logo" v-if="index==0&&!vipType"></vip-logo-rect>
                <i class="iconfont icon-select"></i>
                <span>{{el}}</span>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "mode-select",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        vipType: false
    },
    data() {
        return {
            current: this.value,
            modelList: ["智能纠错", "家教领读", "自己速读"]
        };
    },
    watch: {
        value(newVal) {
            this.current = newVal;
        },
        current(newVal) {
            this.$emit("change", newVal);
        }

    },
    computed: {
        modeShowList() {
            return [1, 1, 1];
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.model-select {
    display: flex;
    align-items: center;
    width: 480px;
    .model-label {
        font-size: 18px;
        color: #666;
        font-weight: bold;
    }
    .model-select-wrapper {
        display: flex;
        align-items: center;
        margin-left: 30px;
        .select-item {
            &.active{
                cursor: default;
            }
            margin-right: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            position: relative;
            .vip-logo{
                position: absolute;
                top:0;
                right: 0;
                transform: translateY(calc(-100%));
            }
            .icon-select {
                &:after {
                    content: "\e610";
                    font-size: 22px;
                    color: $primaryBlue;
                }
                vertical-align: middle;
                margin-right: 2px;
            }
            span {
                vertical-align: middle;
                font-size: 16px;
            }
            &.active {
                .icon-select {
                    &::after {
                        content: "\e6d2";
                    }
                }
                span {
                    color: $primaryBlue;
                }
            }
        }
    }
}
</style>
