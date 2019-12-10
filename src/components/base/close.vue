<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-25 16:02:44
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-05 11:10:41
 -->
<template>
    <i ref="iconClose" class="iconfont icon-close" @click="$emit('click')" @mouseover="onMouseOver"></i>
</template>
<script>
import { cssTransform, css } from "@/helpers/dom.js";
export default {
    name: "close",
    data() {
        return {
            count: 0
        };
    },
    methods: {
        onMouseOver() {
            css(
                this.$refs.iconClose,
                cssTransform(`rotateZ(${++this.count * 90}deg)`)
            );
        }
    }
};
</script>
<style lang="scss">
.icon-close {
    &::after {
        content: "\e696";
        font-size: 36px;
        color: #fff;
    }
    transition: transform 200ms linear;
    cursor: pointer;
    display: inline-block;
}
</style>
