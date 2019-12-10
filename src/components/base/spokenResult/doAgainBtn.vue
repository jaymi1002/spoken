<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:42:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 16:05:26
 -->
<template>
    <button type="button" class="do-again-btn" @click="proxyClick">再做一次</button>
</template>
<script>
export default {
    name: "do-again-btn",
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
.do-again-btn{
    height: 52px;
    width: 174px;
    border-radius: 50px;
    border: 5px solid #85DC2A;
    background-color: #98E844;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    outline: none;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
