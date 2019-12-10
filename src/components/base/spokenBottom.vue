<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 18:59:37
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 14:36:25
 -->
<template>
    <div class="spoken-bottom">
        <p class="tip">最终成绩取最高一次段落得分哟~</p>
        <div class="unit-group">
            <div class="audio-slot">
                <slot name="audio"></slot>
            </div>
            <div class="recorder-slot">
                <slot name="recorder"></slot>
            </div>
            <div class="playlocal-slot">
                <slot name="playlocal"></slot>
            </div>
        </div>
        <div class="btn-group">
            <slot name="btnGroup"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "spoken-bottom",
    props: {}
};
</script>
<style lang="scss">
.spoken-bottom {
    display: flex;
    height: 75px;
    align-items: center;
    color: #fff;
    .tip,
    .unit-group,
    .btn-group {
        flex: 1;
    }
    .tip {
        font-size: 12px;
        opacity: 0.7;
    }
    .unit-group {
        display: flex;
        & > * {
            flex: 1;
            text-align: center;
        }
        & .audio-slot {
            text-align: right;
        }
        & .playlocal-slot {
            text-align: left;
        }
    }
    .btn-group {
        text-align: right;
        line-height: 35px;
        > * {
            margin-left: 10px;
        }
    }
}
</style>
