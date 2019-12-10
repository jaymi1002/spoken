<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 17:49:14
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 18:08:09
 -->
<template>
    <div class="progress-wrapper">
        <div class="bar-outter">
            <div class="bar-progress" :style="progressStyle"></div>
            <div class="bar-line"></div>
        </div>
        <div class="progress-count">{{value>0?value:0}}/{{total}}</div>
    </div>
</template>
<script>
export default {
    name: "s-progress",
    props: {
        value: Number,
        total: Number
    },
    computed: {
        progressStyle() {
            return {
                width:
                    this.value && this.total
                        ? `${parseInt(((this.value > 0 ? this.value : 0) / this.total) * 100)}%`
                        : 0
            };
        }
    }
};
</script>
<style lang="scss">
.progress-wrapper {
    display: flex;
    align-items: center;
    .bar-outter {
        width: 575px;
        position: relative;
        height: 14px;
        .bar-line {
            width: 100%;
            height: 8px;
            background: #d6f2ff;
            border-radius: 999px;
            position: absolute;
            top: 3px;
            left: 0;
            z-index: 1;
        }
        .bar-progress {
            height: 14px;
            background: #6ed2ff;
            border-radius: 999px;
            position: relative;
            z-index: 2;
        }
    }
    .progress-count {
        width: 66px;
        height: 26px;
        color: #fff;
        font-size: 18px;
        border-radius: 999px;
        background: #6ed2ff;
        text-align: center;
        line-height: 26px;
        margin-left: 10px;
    }
}
</style>
