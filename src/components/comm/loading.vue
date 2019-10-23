<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:35:14
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-23 14:46:53
 -->
<template>
    <div class="loading-wrapper">
        <i class="iconfont icon-close" @click="cancel"></i>
        <div class="loading-outer">
            <div ref="loadingInner" class="loading-inner" :style="innnerStyle"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loading",
    props: {
        resource: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    mounted() {
        let queue = new window.createjs.LoadQueue(false);
        this.queue = queue;
        queue.setMaxConnections(10);
        queue.on("complete", () => {
            this.transitionEndOnceCallBack(() => {
                this.$emit("complete");
            });
        });
        queue.on("error", () => {
            this.$emit("error");
        });
        queue.on("progress", (progress) => {
            this.progress = progress.loaded * 100;
        });
        queue.loadManifest(this.manifast);
        queue.load();
    },
    data() {
        return {
            progress: 0,
            queue: null
        };
    },
    computed: {
        manifast() {
            if (this.resource.length === 0) {
                return [];
            }
            return this.resource.map((el) => ({ src: el }));
        },
        innnerStyle() {
            return {
                width: this.progress + "%"
            };
        }
    },
    methods: {
        cancel() {
            this.queue.cancel();
            this.transitionEndOnceCallBack(() => {
                this.$emit("cancel");
            });
        },
        transitionEndOnceCallBack(callback) {
            this.$refs.loadingInner.addEventListener(
                "transitionend",
                () => {
                    callback();
                },
                {
                    once: true
                }
            );
            this.$refs.loadingInner.addEventListener(
                "webkitTransitionEnd",
                () => {
                    callback();
                },
                {
                    once: true
                }
            );
        }
    }
};
</script>
<style lang="scss">
.loading-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .loading-outer {
        width: 500px;
        height: 15px;
        border-radius: 10px;
        background: #ffffff;
    }
    .loading-inner {
        width: 0;
        height: 15px;
        border-radius: 10px;
        background: #6ed2ff;
        transition: width 300ms ease-out;
    }
    .icon-close {
        position: absolute;
        right: 20%;
        top: 30%;
        &:after {
            content: "\e601";
            font-size: 48px;
            color: #fff;
        }
    }
}
</style>
