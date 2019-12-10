<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-29 15:56:39
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-06 14:54:33
 -->
<template>
    <div class="recorder-unit-wrapper">
        <i class="recorder-unit iconfont"></i>
        <div class="recorder-unit-left">
            <div class="half-cir" ref="leftCir"></div>
        </div>
        <div class="recorder-unit-right">
            <div class="half-cir" ref="rightCir"></div>
        </div>
    </div>
</template>
<script>
import { css, cssTransform } from "@/helpers/dom.js";
export default {
    name: "t-recorder-unit",
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.rotate();
    },
    methods: {
        rotate() {
            if (this.progress < 50) {
                css(
                    this.$refs.leftCir,
                    cssTransform(
                        `rotate(${-135 + (this.progress / 50) * 180}deg)`
                    )
                );
                css(this.$refs.rightCir, cssTransform(`rotate(${-135}deg)`));
            } else {
                css(
                    this.$refs.leftCir,
                    cssTransform(`rotate(${-135 + 180}deg)`)
                );
                css(
                    this.$refs.rightCir,
                    cssTransform(
                        `rotate(${-135 + ((this.progress - 50) / 50) * 180}deg)`
                    )
                );
            }
        }
    },
    watch: {
        progress(newVal, oldVal) {
            this.rotate();
        }
    }
};
</script>
<style lang="scss">
@keyframes record-wave {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.05);
        opacity: 0;
    }
}
.recorder-unit-wrapper {
    width: 130px;
    height: 130px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    transform: rotate(45deg);
    .recorder-unit-left,
    .recorder-unit-right {
        width: 65px;
        height: 130px;
        display: inline-block;
        overflow: hidden;
        position: relative;
        .half-cir {
            width: 110px;
            height: 110px;
            border-width: 10px;
            border-style: solid;
            border-radius: 50%;
            position: absolute;
            transform: rotate(-135deg);
        }
    }
    .recorder-unit-left {
        .half-cir {
            border-color: #e4efd9 #e4efd9 transparent transparent;
        }
    }
    .recorder-unit-right {
        .half-cir {
            border-color: transparent transparent #e4efd9 #e4efd9;
            right: 0;
        }
    }

    .recorder-unit {
        display: inline-block;
        width: 110px;
        height: 110px;
        background: #79cd22;
        border: 10px solid #a8dc74;
        border-radius: 50%;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-45deg);
        &::after {
            content: "\e6b1";
            line-height: 110px;
            font-size: 54px;
            color: #fff;
        }
        &::before {
            content: "";
            display: inline-block;
            width: 130px;
            height: 130px;
            border: 4px solid #fff;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 0;
            margin-left: -14px;
            margin-top: -14px;
            animation: record-wave 1000ms linear infinite;
        }
    }
}
</style>
