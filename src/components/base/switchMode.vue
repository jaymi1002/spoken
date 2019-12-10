<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 15:50:47
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-06 14:54:14
 -->
<template>
    <div class="switch-mode-wrapper">
        <s-select :block="true" v-model="current" :selectList="modeList" @onBlock="onBlock"></s-select>
        <pop-tip
            ref="modeTip"
            leftBtnTxt="马上切换"
            rightBtnTxt="暂不切换"
            @onLeftClick="onSwitch"
            @onClose="$emit('onTipCancel')"
            @onRightClick="$emit('onTipCancel')"
        >
            <div class="mode-tip-content">
                <h5 class="title">{{modeList[current]}}模式你将享受到</h5>
                <p
                    v-for="(el,index) in modeList"
                    :class="{disabled:!modeTipMaps[modeMedian][index]}"
                >
                    {{el}}
                    <i class="iconfont icon-tick"></i>
                </p>
            </div>
        </pop-tip>
    </div>
</template>
<script>
export default {
    name: "switch-mode",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: [String, Number]
    },
    data() {
        return {
            current: this.value,
            modeList: ["智能纠错", "家教领读", "自己速读"],
            modeTipMaps: {
                0: [true, true, true],
                1: [true, true, false],
                2: [false, true, false]
            },
            blockCb: null,
            modeMedian: this.value
        };
    },
    methods: {
        onBlock(cb, val) {
            this.blockCb = cb;
            this.modeMedian = val;
            this.$refs.modeTip.show();
            this.$emit("onTipPop");
        },
        onSwitch() {
            this.blockCb();
        }
    },
    watch: {
        value(newVal) {
            this.current = newVal;
        },
        current(newVal) {
            this.$emit("change", newVal);
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.switch-mode-wrapper {
    display: inline-block;
}
.mode-tip-content {
    color: #333;
    text-align: center;
    & > .title {
        padding-top: 30px;
        font-size: 16px;
    }
    & > p {
        font-size: 16px;
        margin-top: 10px;
    }
    .icon-tick {
        margin-left: 10px;
        &::after {
            content: "\e717";
            color: $primaryBlue;
        }
    }
    & > .disabled {
        opacity: 0.5;
        & > .icon-tick::after {
            color: #999;
        }
    }
}
</style>
