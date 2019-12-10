<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-29 15:53:09
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-29 16:10:54
 -->
<template>
    <i class="loading-unit iconfont"></i>
</template>
<script>
export default {
    name: "t-loading-unit"
};
</script>
<style lang="scss">
.loading-unit {
    display: inline-block;
    width: 110px;
    height: 110px;
    background: #79cd22;
    border: 10px solid #e4efd9;
    border-radius: 50%;
    vertical-align: middle;
    animation: rotating 2s linear infinite;
    &::after {
        content: "\e6b3";
        line-height: 110px;
        font-size: 54px;
        color: #fff;
    }
}
@keyframes rotating {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>
