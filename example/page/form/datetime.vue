<template>
  <e-layout>
    <stu-header>
      <p class="font20">datatime</p>
    </stu-header>
    <e-content>
      <div class="plr30">
        <e-datetime
          ref="myDatetime"
          v-model="datetime"
          format="YYYY-MM-DD HH">
          <e-datetime-header title="请选择"/>
        </e-datetime>
        <div class="input-wrap plr30">
          <e-input
            v-model="datetime"
            type="text"
            label="datetime:"
            placeholder="请输入"/>
        </div>
        <e-separator/>
        <p class="lh2 tr pt10">
          <e-button
            :width="250"
            :height="76"
            inline
            active-type="scale"
            param-table="primary"
            @click="$refs.myDatetime.show();">显示pop</e-button>
        </p>
      </div>
      <div class="font14 ptb30">
        <param-table :list="datetimeInfo">
          <template slot="title">组件html tag：e-datetime</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import { eDatetime } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    data() {
        return {
            start: "2011-03-22 07",
            end: "2016-03-23 10",
            date: "2018-04-04",
            time: "17:25",
            datetime: "2016-03-02 08",
            datetimeInfo: mergeProps(eDatetime)
        };
    }
};

</script>
