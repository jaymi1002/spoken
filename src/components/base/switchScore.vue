<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 15:50:47
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 16:57:35
 -->
<template>
    <s-select v-model="current" :selectList="modelList"></s-select>
</template>
<script>
export default {
    name: "switch-score",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: Number
    },
    data() {
        return {
            current: 9 - this.value / 10,
            modelList: ["90分", "80分", "70分", "60分"]
        };
    },
    watch: {
        value(newVal) {
            this.current = 9 - newVal / 10;
        },
        current(newVal) {
            this.$emit("change", (9 - newVal) * 10);
        }
    }
};
</script>
