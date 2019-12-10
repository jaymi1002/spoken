<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-29 15:54:38
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-05 16:17:34
 -->
<template>
    <i class="countdown-unit iconfont" ref="countDownUnit">
        <span ref="countDown">{{currentSeconds}}</span>
    </i>
</template>
<script>
import {
    css,
    cssTransform,
    addTransitionEnd,
    removeTransitionEnd
} from "@/helpers/dom.js";
export default {
    name: "t-countdown-unit",
    props: {
        seconds: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            currentSeconds: this.seconds,
            timer: null
        };
    },
    mounted() {
        let _this = this;
        function transitionEvent() {
            --_this.currentSeconds;
            removeTransitionEnd(_this.$refs.countDown, transitionEvent);
            css(_this.$refs.countDown, cssTransform(`rotateX(0deg)`));
        }
        this.timer = setInterval(() => {
            if (this.currentSeconds === 1) {
                clearInterval(this.timer);
                this.$emit("onEnd");
                return false;
            }
            addTransitionEnd(this.$refs.countDown, transitionEvent);
            css(this.$refs.countDown, cssTransform(`rotateX(-90deg)`));
        }, 1000);
    },
    beforeDestroy() {
        this.stop();
    },
    methods: {
        stop() {
            clearInterval(this.timer);
        }
    }
};
</script>
<style lang="scss">
.countdown-unit {
    display: inline-block;
    width: 120px;
    height: 120px;
    background: #79cd22;
    border: 5px solid #c1e69c;
    border-radius: 50%;
    vertical-align: middle;
    color: #fff;
    font-size: 72px;
    line-height: 120px;
    font-weight: bold;
    span {
        display: inline-block;
        transition: transform 200ms linear;
    }
}
</style>
