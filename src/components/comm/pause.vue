<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-04 16:46:16
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 20:05:24
 -->
<template>
    <div class="pause-wrapper">
        <button class="continue-btn" type="button" @click="$emit('onContinue')">继续</button>
        <button class="close-btn" type="button" @click="$emit('onClose')">关闭</button>
    </div>
</template>
<script>
export default {
    name: "pause"
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.pause-wrapper {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    button {
        border: none;
    }
    .continue-btn,
    .close-btn {
        width: 170px;
        height: 42px;
        line-height: 42px;
        font-size: 18px;
        margin: 20px 0;
        color: #fff;
        border-radius: 999px;
        cursor: pointer;
    }
    .continue-btn {
        background-color: $primaryBlue;
        &:hover {
            transform: scale(1.1);
        }
    }
    .close-btn {
        background-color: transparent;
        border: 1px solid transparent;
        &:hover {
            border-color: #fff;
        }
    }
}
</style>
