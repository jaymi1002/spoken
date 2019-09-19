<template>
  <e-layout>
    <stu-header title="checkList"/>
    <e-content>
      <p class="tc font16 lh3 text-g3">e-checke-list</p>
      <e-check-list
        ref="checkList"
        :max="3"
        :min="1"
        v-model="selectIndex"
        :disabled="false"
        :icon-size="20"
        :bd-width="600"
        reverse
        class="mt20"
        type="radio"
        tip
        default-type="no-check"
        default-color="g9"
        active-type="check"
        active-color="green"
        bd-color="e0"
        bd-align="right"
        bd-style="dashed">
        <e-check-title>选择班级</e-check-title>
        <e-separator/>
        <template v-for="(el,index) in checkList">
          <e-check-item :value="index">
            {{ el.text }}
          </e-check-item>
          <e-separator/>
        </template>
      </e-check-list>
      <e-check-list
        ref="checkList"
        v-model="selectIndex"
        :disabled="false"
        :icon-size="24"
        class="mt20"
        type="radio"
        active-color="primary"
        default-color="g9"
        tip
        default-type="no-check"
        touch-active
        active-type="check">
        <e-check-title>选择班级</e-check-title>
        <e-separator/>
        <template v-for="(el,index) in checkList">
          <e-check-item :value="index">
            <span class="font16">{{ el.text }}</span>
          </e-check-item>
          <e-separator/>
        </template>
      </e-check-list>
      <div class="font14 ptb30">
        <param-table :list="checkListInfo">
          <template slot="title">组件html tag：e-check-list</template>
        </param-table>
      </div>
      <div class="font14 ptb30">
        <param-table :list="checkItemInfo">
          <template slot="title">组件html tag：e-check-item</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import {eCheckList, eCheckItem} from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    data() {
        return {
            checkList: [{
                value: 1,
                text: "北京"
            }, {
                value: 2,
                text: "上海"
            }, {
                value: 2,
                text: "天津"
            }, {
                value: 2,
                text: "广州"
            }, {
                value: 2,
                text: "深圳"
            }, {
                value: 2,
                text: "成都"
            }],
            selectIndex: 5,
            checkListInfo: mergeProps(eCheckList),
            checkItemInfo: mergeProps(eCheckItem)
        };
    }
};

</script>
