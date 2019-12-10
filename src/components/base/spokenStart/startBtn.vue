<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:42:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 16:05:26
 -->
<template>
    <button type="button" class="start-btn" @click="proxyClick">START NOW</button>
</template>
<script>
export default {
    name: "start-btn",
    props: {
        disabled: Boolean
    },
    methods: {
        proxyClick() {
            this.$emit("click");
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.start-btn {
    height: 75px;
    width: 245px;
    border-radius: 50px;
    border: 5px solid $borderYellow;
    background-color: $primaryYellow;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    outline: none;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
