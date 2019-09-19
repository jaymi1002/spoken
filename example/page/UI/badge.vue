<template>
  <e-layout
    head
    title="badge">
    <stu-header title="badge"/>
    <e-content>
      <p class="tc lh3 font16">尝试一下</p>
      <e-separator/>
      <div class="input-wrap plr30">
        <e-input
          v-model="label"
          type="text"
          label="label值:"
          placeholder="请输入"/>
      </div>
      <e-separator/>
      <div class="pt30 plr30">
        <e-badge :label="label"/>
      </div>
      <div class="font14 pt30">
        <param-table :list="badgeInfo">
          <template slot="title">组件html tag：e-badge</template>
          <template slot="tip">
            使用color 需要在业务中配置 bg-color
          </template>
        </param-table>
      </div>
      <div class="font14">
        <param-table :list="badgeExt">
          <template slot="title">额外</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import { eBadge } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "Badge",
    data() {
        return {
            label: "",
            badgeInfo: mergeProps(eBadge),
            badgeExt: [{
                name: "default",
                type: "slot"
            }]
        };
    }
};

</script>
<style lang="scss">
.input-wrap {
    height: 1.333rem;
}

</style>
