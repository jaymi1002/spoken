<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 14:25:34
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 14:26:51
 -->
<template>
    <i class="iconfont icon-pause-btm" @click="$emit('click')"></i>
</template>
<script>
export default {
    name: "pause-btm"
};
</script>
<style lang="scss">
.icon-pause-btm {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #6ed2ff;
    text-align: center;
    &::after {
        content: "\e6b7";
        font-size: 16px;
    }
    &:hover {
        transform: scale(1.1);
    }
}
</style>
