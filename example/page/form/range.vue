<template>
  <e-layout shadow>
    <stu-header>
      <p class="font20">range</p>
    </stu-header>
    <e-content>
      <div class="range flex justify-center items-center">
        <div class="pct100">
          <e-range
            v-model="progress"
            tip
            inner-color="green"
            outer-color="progress-outer"/>
          <br>
          <br>
          <e-range
            v-model="progress"
            tip
            reverse
            inner-color="green"/>
          <br>
          <br>
          <e-range
            v-model="progressArr"
            tip
            side-show/>
          <br>
        </div>
      </div>
      <div class="font14 pt30">
        <param-table :list="rangeInfo">
          <template slot="title">组件html tag：e-range</template>
          <template slot="tip">color: bg-color</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import {eRange} from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "Range",
    data() {
        return {
            progress: 0,
            progressArr: [0, 20],
            rangeInfo: mergeProps(eRange)
        };
    },
    methods: {

    }
};

</script>
<style type="text/css">
.range {
    margin-top: 1.333rem;
}

</style>
