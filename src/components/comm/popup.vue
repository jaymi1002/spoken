<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:37:02
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 19:45:33
 -->
<template>
    <div class="popup">
        <transition
            @enter-cancelled="enterCancelled"
            @after-leave="afterLeave"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div ref="modalContent" id="spokenPopup" class="popup-content" v-if="active">
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
    destroyed() {
        console.log("destroyed");
    },
    methods: {
        show() {
            this.active = true;
        },
        hide() {
            this.active = false;
            this.$el.remove();
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
                this.$emit("onShow");
            } else {
                document.body.classList.remove("popup-modal");
                this.$emit("onHide");
            }
        }
    }
};
</script>
<style lang="scss">
.popup {
    .popup-content {
        width: 900px;
        height: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -450px;
        margin-top: -300px;
        z-index: 3;
        overflow: hidden;
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
