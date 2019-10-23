<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-23 10:45:30
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-23 14:47:18
 -->
<template>
    <popup ref="popup">
        <loading
            v-if="resource.length > 0"
            :resource="resource"
            @complete="onDownloadComplete"
            @cancel="hide"
        ></loading>
        <a href="javascript:;" @click="hide">hide</a>
    </popup>
</template>
<script>
export default {
    name: "spoken-words",
    props: {
        data: {
            type: Object
        }
    },
    // created() {},
    computed: {
        resource() {
            if (!this.data) {
                return [];
            }
            let ret = [];
            this.data.ques_item.forEach((el) => {
                ret.push(el.audio);
                ret.push(el.pic);
            });
            return ret;
        }
    },
    methods: {
        show() {
            this.$refs.popup.show();
        },
        hide() {
            this.$refs.popup.hide();
        },
        onDownloadComplete() {
            this.hide();
            console.log("download complete");
        }
    }
};
</script>
<style lang="scss">
</style>
