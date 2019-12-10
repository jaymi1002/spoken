<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:10:02
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 15:40:29
 -->
<template>
    <p class="s-title">
        <slot></slot>
    </p>
</template>
<script>
export default {
    name: "s-title"
};
</script>
<style lang="scss">
.s-title {
    font-size: 54px;
    color: #fff;
    font-weight: bold;
    text-align: center;
}
</style>
