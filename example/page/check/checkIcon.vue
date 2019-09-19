<template>
  <e-layout>
    <stu-header title="checkIcon"/>
    <e-check-icon
      :icon-size="16"
      v-model="select"
      default-type="no-check"
      active-color="green"
      default-color="g9"
      active-type="check"
      text="请认真阅读以下协议,同意之后再确定。请认真阅读以下协议,同意之后再确定。"/>
    <e-separator/>
    <div class="font14 ptb30">
      <param-table :list="checkIconInfo">
        <template slot="title">组件html tag：e-check-icon</template>
      </param-table>
    </div>
  </e-layout>
</template>
<script type="text/javascript">
import {eCheckIcon} from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "CheckIcon",
    data() {
        return {
            select: false,
            checkIconInfo: mergeProps(eCheckIcon)
        };
    }
};
</script>
