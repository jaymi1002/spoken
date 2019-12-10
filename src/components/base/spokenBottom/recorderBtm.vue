<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:25
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 11:58:19
 -->
<template>
    <div class="recorder-btm iconfont" @click="proxyClick" :class="recorderBtmClasses">
        <s-ring :progress="ringProgress" class="recorder-circle"></s-ring>
    </div>
</template>
<script>
export default {
    name: "recorder-btm",
    props: {
        progress: Number,
        disabled: Boolean
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
        proxyClick() {
            if (this.disabled) {
                return false;
            } else {
                this.$emit("click");
            }
        }
    }
};
</script>
<style lang="scss">
.recorder-btm {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #009ce2;
    position: relative;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    &.disabled {
        opacity: 0.5;
    }
    &::after {
        font-size: 22px;
        color: #fff;
    }
    &.default,
    &.disabled {
        &::after {
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
            width: 15px;
            height: 15px;
            background-color: #fff;
            border-radius: 2px;
            vertical-align: baseline;
        }
    }
}
</style>
