<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 14:23:00
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 14:25:13
 -->
<template>
    <button class="btn-btm" @click="$emit('click')">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: "btn-btm"
};
</script>
<style lang="scss">
.btn-btm {
    width: 78px;
    height: 35px;
    background: #6ed2ff;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
