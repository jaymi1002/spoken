<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 16:05:50
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-30 12:01:10
 -->
<template>
    <div class="score-range">
        <p class="score-label">目标成绩:</p>
        <div class="score-slider-wrapper">
            <div class="score-slider-line">
                <i class="dot dot1" :class="{active:currentValue == 60}" @click="currentValue = 60"></i>
                <i class="dot dot2" :class="{active:currentValue == 70}" @click="currentValue = 70"></i>
                <i class="dot dot3" :class="{active:currentValue == 80}" @click="currentValue = 80"></i>
                <i class="dot dot4" :class="{active:currentValue == 90}" @click="currentValue = 90"></i>
            </div>
            <button
                ref="sliderThumb"
                type="button"
                class="score-slider-thumb"
                v-mouse-pan:horizontal="onSlider"
            ></button>
        </div>
    </div>
</template>
<script>
import { style, css } from "@/helpers/dom.js";
export default {
    name: "score-range",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: Number,
            default: 60
        }
    },
    mounted() {
        this.currentValue = this.value;
    },
    data() {
        return {
            currentValue: 60,
            currentThumbLeft: 0
        };
    },
    methods: {
        onSlider({ relative, isFirst, isFinal }) {
            if (isFirst) {
                this.currentThumbLeft = parseInt(
                    style(this.$refs.sliderThumb, "left")
                );
            }
            let calcThumbLeft = this.currentThumbLeft + relative.x;
            if (calcThumbLeft < 0) {
                calcThumbLeft = 0;
            }
            if (calcThumbLeft > 300) {
                calcThumbLeft = 300;
            }
            css(this.$refs.sliderThumb, {
                left: calcThumbLeft + "px"
            });
            if (isFinal) {
                let target = parseInt(calcThumbLeft / 100);
                if (calcThumbLeft % 100 < 50) {
                    this.currentValue = 60 + target * 10;
                    css(this.$refs.sliderThumb, {
                        left: ((target * 10) / 30) * 100 + "%"
                    });
                } else {
                    this.currentValue = 60 + (target + 1) * 10;
                    css(this.$refs.sliderThumb, {
                        left: (((target + 1) * 10) / 30) * 100 + "%"
                    });
                }
            }
        }
    },
    watch: {
        currentValue(newVal) {
            css(this.$refs.sliderThumb, {
                left: ((newVal - 60) / 30) * 100 + "%"
            });
            this.$emit("change", newVal);
        },
        value(newVal) {
            this.currentValue = newVal;
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.score-range {
    display: flex;
    align-items: flex-end;
    height: 40px;
    width: 480px;
    .score-label {
        font-size: 18px;
        color: #666;
        font-weight: bold;
    }
    .score-slider-wrapper {
        margin-left: 40px;
        position: relative;
        .score-slider-line {
            width: 300px;
            height: 5px;
            background-color: #e8f8ff;
            border-radius: 5px;
            position: relative;
            .dot {
                width: 5px;
                height: 15px;
                position: absolute;
                background-color: #e8f8ff;
                bottom: 0;
                cursor: pointer;
                &::after {
                    position: absolute;
                    color: #333;
                    font-size: 16px;
                    font-style: initial;
                    width: 35px;
                    left: 0;
                    top: 0;
                    margin-top: -25px;
                    margin-left: -10px;
                }
                &.active::after {
                    color: $primaryBlue;
                }
            }
            .dot1 {
                left: 0;
                &:after {
                    content: "60分";
                }
            }
            .dot2 {
                left: 33%;
                &:after {
                    content: "70分";
                }
            }
            .dot3 {
                left: 66%;
                &:after {
                    content: "80分";
                }
            }
            .dot4 {
                left: 100%;
                &:after {
                    content: "90分";
                }
            }
        }
        //滑块
        .score-slider-thumb {
            height: 20px;
            width: 10px;
            border-radius: 10px;
            background-color: $primaryBlue;
            position: absolute;
            outline: none;
            border: none;
            bottom: 0;
            margin-left: -5px;
        }
    }
}
</style>
