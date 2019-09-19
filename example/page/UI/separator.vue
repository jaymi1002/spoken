<template>
  <e-layout shadow>
    <stu-header>
      <p class="font18">separator</p>
    </stu-header>
    <e-content>
      <e-separator class="mt30"/>
      <e-separator
        :width="640"
        class="mt30"
        align="center"/>
      <e-separator
        class="mt30"
        bd-style="dashed"
        bd-color="blue"/>
      <e-separator
        class="mt30"
        bd-style="dotted"
        bd-color="green"/>
      <e-separator
        :width="640"
        class="mt30"
        align="left"
        bd-color="green"/>
      <e-separator
        :width="640"
        class="mt30"
        align="right"
        bd-color="ec"/>
      <e-separator
        class="mt30"
        bd-style="dotted"
        bd-color="blue"/>
      <div class="font14 pt30">
        <param-table :list="separatorInfo">
          <template slot="title">组件html tag：e-separator</template>
          <template slot="tip">bdColor: bd-bdColor</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import {eSeparator} from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default{
    data() {
        return {
            separatorInfo: mergeProps(eSeparator)
        };
    }
};
</script>
