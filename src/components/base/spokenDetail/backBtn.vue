<template>
    <button type="button" class="back-btn" @click="proxyClick">返回</button>
</template>
<script>
export default {
    name: "back-btn",
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
.back-btn{
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
