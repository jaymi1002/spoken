<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:42:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 16:05:26
 -->
<template>
    <button type="button" class="complete-btn" @click="proxyClick">完成</button>
</template>
<script>
export default {
    name: "complete-btn",
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
.complete-btn{
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
