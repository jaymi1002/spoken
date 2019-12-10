<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:42:12
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 16:05:26
 -->
<template>
    <button type="button" class="score-detail-btn" @click="proxyClick">成绩详情</button>
</template>
<script>
export default {
    name: "score-detail-btn",
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
.score-detail-btn{
    height: 52px;
    width: 174px;
    border-radius: 50px;
    border: 5px solid #5fdaff;
    background-color: #72e4fe;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    outline: none;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
