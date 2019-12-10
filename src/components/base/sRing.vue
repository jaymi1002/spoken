<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:38:26
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 11:18:59
 -->
<template>
    <div class="time_cir">
        <svg width="100" height="100" viewBox="0 0 100 100" style="width:100%;height:100%;">
            <circle
                class="circle"
                stroke-linecap="round"
                cx="50"
                cy="50"
                :r="radius"
                :stroke-width="strokeWidth"
                stroke="transparent"
                fill="none"
            />
            <circle
                v-show="progress>0"
                class="circle"
                :class="innerClass"
                stroke-linecap="round"
                cx="50"
                cy="50"
                :r="radius"
                :stroke-width="strokeWidth"
                fill="none"
                :stroke="stroke"
                :stroke-dasharray="dasharray"
            />
        </svg>
    </div>
</template>
<script type="text/javascript">
export default {
    name: "s-ring",
    props: {
        startColor: String,
        endColor: String,
        outerColor: String,
        direction: {
            type: String,
            default: "forward", // 'forward  reverse',
            validator(value) {
                return ["forward", "reverse"].indexOf(value) !== -1;
            }
        },
        progress: {
            type: Number,
            default: 20
        },
        ringWidth: {
            type: Number, //百分比
            default: 10
        },
        stroke: {
            type: String,
            default: "rgba(255,255,255,255.8)"
            // default: "rgba(0,255,255,255.8)"
        }
    },
    data() {
        return {
            active: true
        };
    },
    computed: {
        innerClass() {
            let classes = [];
            if (this.active) {
                classes.push("active");
            }
            classes.push(this.direction);
            return classes;
        },
        dasharray() {
            let girth = this.radius * 2 * Math.PI;
            return `${(this.progress / 100) * girth} ${girth}`;
        },
        strokeWidth() {
            return (50 * this.ringWidth) / 100;
        },
        radius() {
            return 50 - this.strokeWidth;
        }
    },
    methods: {},
    watch: {
        progress(newVal, oldVal) {
            if (newVal === 100) {
                this.$emit("ended");
            }
            if (newVal < oldVal) {
                this.active = false;
            } else {
                this.active = true;
            }
        }
    }
};
</script>
<style lang="scss">
.time_cir {
    // margin-right: .133rem;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 2;
    line-height: 1;
    transform-origin: 50% 50%;
    transform: rotate(90deg);
    circle {
        &.active {
            transition: stroke-dasharray 400ms linear;
        }
        &.forward {
            transform-origin: 50% 50%;
            transform: scale(-1, -1);
        }
        &.reverse {
            transform-origin: 50% 50%;
            transform: scale(-1, 1);
        }
    }
}
</style>
