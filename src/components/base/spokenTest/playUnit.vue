<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-29 15:46:10
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-29 16:05:36
 -->
<template>
    <i class="play-unit iconfont" @click="$emit('click')"></i>
</template>
<script>
export default {
    name: "t-play-unit"
};
</script>
<style lang="scss">
.play-unit {
    display: inline-block;
    width: 130px;
    height: 130px;
    background: #79cd22;
    border-radius: 50%;
    vertical-align: middle;
    &:after {
        content: "\e6da";
        color: #fff;
        font-size: 72px;
        line-height: 130px;
        margin-left: 8px;
    }
}
</style>
