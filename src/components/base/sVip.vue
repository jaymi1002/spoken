<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-24 15:31:26
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-24 15:35:59
 -->
<template>
    <div :class="vipClass"></div>
</template>
<script>
export default {
    name: "s-vip",
    props: {
        vipType: {
            type: String,
            default: "false"
        }
    },
    computed: {
        vipClass() {
            return `vip-cnametag-${this.vipType}`;
        }
    }
};
</script>
<style lang="scss">
.vip-cnametag-exp,
.vip-cnametag-false,
.vip-cnametag-school,
.vip-cnametag-vip {
    display: inline-block;
    width: 132px;
    height: 33px;
    background: url(../../images/vip_cname_tag.png) no-repeat;
    vertical-align: text-bottom;
    white-space: nowrap;
}

.vip-cnametag-vip {
    background-position: 0 0;
}

.vip-cnametag-exp {
    background-position: 0 -108px;
}

.vip-cnametag-school {
    background-position: 0 -162px;
}

.vip-cnametag-false {
    background-position: 0 -54px;
}
</style>
