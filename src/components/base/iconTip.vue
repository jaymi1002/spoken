<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-05 10:40:29
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-05 10:48:32
 -->
<template>
    <div class="icon-tip-wrapper">
        <i class="iconfont icon-score-tip"></i>
    </div>
</template>
<script>
export default {
    name: "icon-tip"
};
</script>
<style lang="scss">
.icon-tip-wrapper {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 25px;
    position: absolute;
    right: 2px;
    top: 15px;
    .icon-score-tip {
        &::after {
            content: "\e618";
            color: #87d9ff;
            font-size: 24px;
        }
    }
}
</style>
