<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:35:14
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-05 11:15:50
 -->
<template>
    <div class="loading-wrapper">
        <i class="iconfont icon-close" @click="cancel"></i>
        <img src="@/images/cloud.png" class="cloud1" alt />
        <img src="@/images/cloud.png" class="cloud2" alt />
        <div class="loading-outer">
            <div ref="loadingInner" class="loading-inner" :style="innnerStyle"></div>
            <i class="loading-thumb" :style="thumbStyle"></i>
        </div>
        <p class="progress-num">{{progress}}%</p>
    </div>
</template>
<script>
import IS_DEBUG from "@/confs/debugMode";
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
                this.$emit("onComplete");
            });
        });
        queue.on("error", () => {
            this.$emit("error");
        });
        queue.on("progress", (progress) => {
            this.progress = parseInt(progress.loaded * 100);
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
            return this.resource.map((el) => ({
                src: el + "?v=" + IS_DEBUG ? "1" : new Date().getTime()
            }));
        },
        innnerStyle() {
            return {
                width: this.progress + "%"
            };
        },
        thumbStyle() {
            return {
                left: this.progress + "%"
            };
        }
    },
    methods: {
        cancel() {
            this.queue.cancel();
            this.$emit("onCancel");
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
        width: 310px;
        height: 12px;
        border-radius: 10px;
        background: #ffffff;
        position: relative;
    }
    .loading-inner {
        width: 0;
        height: 12px;
        border-radius: 10px;
        background: #6ed2ff;
        transition: width 300ms ease-out;
    }
    .loading-thumb {
        border: 6px solid #6ed2ff;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        top: -6px;
        margin-left: -16px;
        transition: left 300ms ease-out;
    }
    .icon-close {
        position: absolute;
        right: 25%;
        top: 20%;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);
        text-align: center;
        line-height: 30px;
        &:after {
            content: "\e696";
            font-size: 24px;
            color: rgba(0, 0, 0, 0.4);
            // font-weight: bold;
        }
        &:hover {
            background: rgba(255, 255, 255, 0.8);
        }
    }
    .cloud1,
    .cloud2 {
        position: absolute;
    }
    .cloud1 {
        width: 85px;
        top: 35%;
        left: 43%;
        animation: cloudFloat 2000ms linear infinite;
    }
    .cloud2 {
        width: 50px;
        top: 33%;
        left: 53%;
        animation: cloudFloat 2000ms linear infinite 1000ms;
    }
    .progress-num {
        color: #fff;
        font-size: 18px;
        position: absolute;
        right: 25%;
    }
    @keyframes cloudFloat {
        0% {
            margin-left: 0;
        }

        25% {
            margin-left: 10px;
        }

        50% {
            margin-left: 0px;
        }

        75% {
            margin-left: -10px;
        }

        100% {
            margin-left: 0;
        }
    }
}
</style>
