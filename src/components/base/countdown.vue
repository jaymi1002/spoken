<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-05 15:45:50
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 16:11:34
 -->
<template>
    <div class="countdown-wrapper">
        <i class="countdown iconfont" ref="countDownUnit">
            <span ref="countDown">{{currentSeconds}}</span>
        </i>
    </div>
</template>
<script>
import countdownUnit from "./spokenTest/countdownUnit";
export default {
    name: "countdown",
    extends: countdownUnit,
    mounted() {
        document.getElementById("spokenPopup").appendChild(this.$el);
    },
    watch: {
        currentSeconds(newVal) {
            if (newVal === 1) {
                setTimeout(() => {
                    this.$el.remove();
                }, 1000);
            }
        }
    }
};
</script>
<style lang="scss">
.countdown-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    .countdown {
        display: inline-block;
        width: 160px;
        height: 160px;
        background: #79cd22;
        border: 8px solid #c1e69c;
        border-radius: 50%;
        vertical-align: middle;
        color: #fff;
        font-size: 120px;
        line-height: 160px;
        font-weight: bold;
        text-align: center;
        span {
            display: inline-block;
            transition: transform 200ms linear;
        }
    }
}
</style>
