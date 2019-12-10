<template>
    <div class="score-circle" :class="bgColorClass">{{Math.floor(score)}}</div>
</template>
<script>
export default {
    name: "score-circle",
    props: {
        score: Number,
        bgColorClass: String
    },
    computed: {

    },
    data: function() {
        return {
            // bgClass: ""
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {

    },
    created() {
        // console.log(this.bgColorClass);
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
    .score-circle{
        width:30px;
        height: 30px;
        border-radius: 50%;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: white;
    }
</style>
