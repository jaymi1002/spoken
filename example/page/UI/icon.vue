<template>
  <e-layout>
    <stu-header title="Icon"/>
    <e-content>
      <div class="pt20">
        <div class="tc">
          <e-icon
            :size="size"
            type="arrow-left"
            @click="choose"
            @disabledHandle="disabledChoose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="no-check"
            disabled
            @click="choose"
            @disabledHandle="disabledChoose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="face-smile"
            @click="choose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="face-cry"
            @click="choose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="face-no"
            @click="choose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="face-smile"
            @click="choose"/>
        </div>
        <div class="tc">
          <e-icon
            :size="size"
            type="face-smile"
            @click="choose"/>
        </div>
        <div class="font14 ptb30">
          <param-table :list="iconInfo">
            <template slot="title">组件html tag：e-icon</template>
            <template slot="tip">css需要配置
              <br> type:icon-type
              <br> size: font-size
              <br> color:text-color
              <br>
            </template>
          </param-table>
        </div>
      </div>
    </e-content>
  </e-layout>
</template>
<script>
import { eIcon } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "Icon",
    components: {
        eIcon
    },
    data() {
        return {
            size: 24,
            iconInfo: mergeProps(eIcon)
        };
    },
    methods: {
        choose() {
            alert("别点我");
        },
        disabledChoose() {
            alert("我被禁止了");
        }
    }
};

</script>
<style>

</style>
