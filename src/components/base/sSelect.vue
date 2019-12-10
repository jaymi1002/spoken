<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 15:51:35
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-04 19:16:41
 -->
<template>
    <div class="s-select-wrapper">
        <div class="select-btn" @click="showPopup">
            <span>{{selectList[current]}}</span>
            <i class="iconfont icon-arrowup"></i>
        </div>
        <ul class="select-popup" v-if="active">
            <li v-for="(el,index) in selectList" @click="select(index)">{{el}}</li>
        </ul>
    </div>
</template>
<script>
import defModel from "@/mixin/defModel.js";
export default {
    name: "s-select",
    mixins: [defModel],
    props: {
        selectList: Array,
        block: Boolean
    },
    mounted() {
        let _this = this;
        this.bodyEvent = function(e) {
            _this.active = false;
        };
        document.body.addEventListener("click", this.bodyEvent);
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        showPopup(e) {
            this.active = true;
            e.stopPropagation();
            e.preventDefault();
        },
        select(index) {
            if (this.block) {
                this.$emit(
                    "onBlock",
                    () => {
                        this.current = index;
                        this.active = false;
                    },
                    index
                );
                return false;
            }
            this.current = index;
            this.active = false;
        }
    },
    beforeDestroy() {
        document.body.removeEventListener("click", this.bodyEvent);
    }
};
</script>
<style lang="scss">
.s-select-wrapper {
    display: inline-block;
    position: relative;
    width: 95px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    .select-btn {
        width: 95px;
        height: 30px;
        border-radius: 5px;
        position: relative;
        background: #87d9ff;
        cursor: default;
        & > span {
            margin-right: 10px;
        }
        .icon-arrowup::after {
            content: "\e632";
            font-size: 12px;
            position: absolute;
            right: 10px;
        }
    }
    .select-popup {
        position: absolute;
        width: 95px;
        bottom: 30px;
        & > li {
            width: 95px;
            height: 30px;
            border-radius: 5px;
            background: #87d9ff;
            box-shadow: 0 1px 0px #6ed2ff;
            margin-bottom: 1px;
            cursor: pointer;
            &:hover {
                background: #94dafb;
            }
        }
    }
}
</style>
