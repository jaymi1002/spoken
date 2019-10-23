<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:37:02
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-23 14:18:27
 -->
<template>
    <div class="popup">
        <transition
            @enter-cancelled="enterCancelled"
            @after-leave="afterLeave"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div ref="modalContent" class="popup-content" v-if="active">
                <slot></slot>
            </div>
        </transition>
        <template>
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div class="popup-mask" v-show="active"></div>
            </transition>
        </template>
    </div>
</template>
<script>
export default {
    name: "popup",
    data() {
        return {
            active: false
        };
    },
    methods: {
        show() {
            this.active = true;
        },
        hide() {
            this.active = false;
        },
        enterCancelled() {
            this.$el.remove();
            this.active = false;
        },
        afterLeave() {
            this.$el.remove();
            this.active = false;
        }
    },
    watch: {
        active(newVal) {
            if (newVal) {
                document.body.classList.add("popup-modal");
                document.body.appendChild(this.$el);
            } else {
                document.body.classList.remove("popup-modal");
            }
        }
    }
};
</script>
<style lang="scss">
.popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .popup-content {
        width: 900px;
        height: 600px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -450px;
        margin-top: -300px;
        z-index: 3;
    }
    .popup-mask {
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
}
.popup-modal {
    overflow: hidden;
}
</style>
