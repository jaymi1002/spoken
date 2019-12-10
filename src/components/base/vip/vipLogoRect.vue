<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 10:51:25
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 11:58:19
 -->
<template>
    <div class="vip-logo-rect" @click="$emit('click')" :class="recorderBtmClasses">
        <p>VIP</p>
    </div>
</template>
<script>
export default {
    name: "vipLogoRect"
};
</script>
<style lang="scss" scoped>
    .vip-logo-rect{
        width: 22px;
        height: 12px;
        background-color: #FF3300;
        border-radius: 3px;
        p{
            text-align: center;
            line-height: 12px;
            font-size: 12px;
            font-weight: bold;
            color: white;
        }
    }
</style>
