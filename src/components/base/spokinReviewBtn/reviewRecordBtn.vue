<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:25
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 11:58:19
 -->
<template>
    <div class="review-record-btn iconfont" @click="$emit('click')" :class="recorderBtmClasses">
        <s-ring :progress="ringProgress" class="recorder-circle" :stroke="'rgba(0,156,226)'"></s-ring>
    </div>
</template>
<script>
export default {
    name: "review-record-btn",
    props: {
    },
    data: function() {
        return {
            progress: 0,
            disabled: true
        };
    },
    computed: {
        ringProgress() {
            if (this.progress) {
                return this.progress;
            }
            return 0;
        },
        recorderBtmClasses() {
            if (this.disabled) {
                return "disabled";
            }
            return "default";
        }
    },
    methods: {
        setProgress(pro) {
            this.progress = pro;
        },
        stop() {
            this.disabled = true;
            this.progress = 0;
        },
        play() {
            this.disabled = false;
        }
    }
};
</script>
<style lang="scss">
.review-record-btn {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: white;
    position: relative;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    &.disabled {
        opacity: 1;
    }
    &::after {
        font-size: 22px;
        color: #009CE2;
    }
    &.default,
    &.disabled {
        &::after {
            font-size: 14px;
            content: "\e6c2";
        }
    }
    .recorder-circle {
        position: absolute;
        width: 90%;
        height: 90%;
        margin-left: 5%;
        margin-top: 5%;
    }
    &.default:hover {
        background-color: #ff8080;
        &::after {
            content: "";
            display: inline-block;
            width: 10px;
            height: 10px;
            // background-color: #fff;
            border: 1px solid white;
            border-radius: 2px;
            vertical-align: baseline;
        }
    }
}
</style>
