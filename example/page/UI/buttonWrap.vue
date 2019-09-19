<template>
  <e-layout shadow>
    <stu-header title="buttonWrap"/>
    <e-content>
      <p class="tc lh2 font16">status:</p>
      <e-check-list
        v-model="status"
        :icon-size="20"
        type="radio"
        label-right
        default-type="no-check"
        active-type="check"
        reverse>
        <e-check-item
          v-for="item in statusList"
          :value="item" :key="item">
          <span>{{ item }}</span>
        </e-check-item>
      </e-check-list>
      <p class="tc lh2 font16">type:</p>
      <e-check-list
        v-model="type"
        :icon-size="20"
        type="radio"
        label-right
        default-type="no-check"
        active-type="check"
        reverse>
        <e-check-item
          v-for="item in typeList"
          :value="item" :key="item">
          <span>{{ item }}</span>
        </e-check-item>
      </e-check-list>
      <e-button-wrap
        :type="type"
        theme="primary"
        style="position:absolute;bottom:0;">
        <e-button-item
          :loading="status === 'loading'"
          :disabled="status === 'disabled'"
          plain>取消</e-button-item>
        <e-button-item
          :loading="status === 'loading'"
          :disabled="status === 'disabled'">确定</e-button-item>
      </e-button-wrap>
      <div class="font14 ptb30">
        <param-table :list="buttonWrapInfo">
          <template slot="title">组件html tag：e-button-wrap</template>
          <template slot="tip">theme:button的主题</template>
        </param-table>
        <param-table :list="buttonWrapExt"/>
      </div>
      <div class="font14 ptb30">
        <param-table :list="buttonItemInfo">
          <template slot="title">组件html tag：e-button-item</template>
        </param-table>
        <param-table :list="buttonItemExt"/>
      </div>
      <div style="padding-bottom:1.28rem"/>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import { eButtonWrap, eButtonItem } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    props: {

    },
    data() {
        return {
            typeList: ["rect", "cir"],
            type: "rect",
            statusList: ["loading", "default", "disabled"],
            status: "default",
            buttonWrapInfo: mergeProps(eButtonWrap),
            buttonWrapExt: [{
                name: "default",
                type: "slot"
            }],
            buttonItemInfo: mergeProps(eButtonItem),
            buttonItemExt: [{
                name: "default",
                type: "slot"
            }]
        };
    }
};

</script>
