<template>
  <e-layout>
    <stu-header>
      <p class="font20">actionsheet</p>
    </stu-header>
    <e-content>
      <p class="example-table-title font16">尝试一下</p>
      <e-separator/>
      <e-check-icon
        v-model="horizontal"
        :icon-size="20"
        text="horizontal"
        default-type="no-check"
        active-type="check"/>
      <e-separator/>
      <e-check-icon
        v-model="autoClose"
        :icon-size="20"
        text="autoClose"
        default-type="no-check"
        active-type="check"/>
      <e-separator/>
      <e-check-icon
        v-model="maskClickDisabled"
        :icon-size="20"
        text="maskClickDisabled"
        default-type="no-check"
        active-type="check"/>
      <e-separator/>
      <e-check-icon
        v-model="noCancel"
        :icon-size="20"
        text="noCancel"
        default-type="no-check"
        active-type="check"/>
      <e-separator/>
      <div class="input-wrap plr30">
        <e-input
          v-model="title"
          label="title"/>
      </div>
      <e-separator/>
      <div class="input-wrap plr30">
        <e-input
          v-model="explain"
          label="explain"/>
      </div>
      <e-button
        :width="690"
        class="font14 text-g3 ml30"
        theme="primary"
        @click="$refs.actionsheet.show();">show</e-button>
      <e-actionsheet
        ref="actionsheet"
        :horizontal="horizontal"
        :list="list"
        :no-cancel="noCancel"
        :mask-click-disabled="maskClickDisabled"
        :auto-close="autoClose">
        <e-actionsheet-header
          :title="title"
          :explain="explain"/>
        <e-separator v-if="!horizontal"/>
        <template v-for="(el,key) in list">
          <e-actionsheet-item
            :value="key"
            :img="el.img"
            :text="el.title"
            :disabled="el.disabled"/>
          <e-separator v-if="!horizontal"/>
        </template>
      </e-actionsheet>

      <div class="font14 ptb30">
        <param-table :list="actionsheetInfo">
          <template slot="title">组件html tag：e-actionsheet</template>
          <template slot="tip">
            <pre>list每一项字段为
        {
            title:String,
            img:String,
            disabled:Boolean
        }
            </pre>
          </template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import {eActionsheet} from "@/components";
import mergeProps from "../../lib/mergeProps";
export default {
    name: "Actionsheet",
    data() {
        return {
            list: [{
                title: "QQ",
                img: "http://res.ekwing.com/images/student/qq.png"
            }, {
                title: "微信",
                img: "http://res.ekwing.com/images/student/wechat.png"
            }, {
                title: "QQ朋友圈",
                img: "http://res.ekwing.com/images/student/qzone.png"
            }, {
                title: "微信朋友圈",
                img: "http://res.ekwing.com/images/student/wx_zone68.png",
                disabled: true
            }],
            horizontal: false,
            noCancel: true,
            autoClose: true,
            maskClickDisabled: false,
            title: "选择分享方式",
            explain: "分享文案说明",
            actionsheetInfo: mergeProps(eActionsheet)
        };
    },
    methods: {}

};

</script>
<style lang="scss">
    .input-wrap{
        height: 1.333rem;
    }
</style>
