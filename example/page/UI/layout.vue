<template>
  <e-layout head-color="f5">
    <e-header
      v-if="head"
      title="layout">
      <template
        v-if="headerLeftSlot"
        slot="left">
        <e-icon
          :size="24"
          type="face-smile"
          color="g3"
          @click="goback"/>
      </template>
      <template
        v-if="headerTitleSlot"
        slot="title">
        <div class="tc lh1-5 ptb10">
          <p class="font20">单词闯关</p>
          <p class="font16 lh1">单词闯关</p>
        </div>
      </template>
      <template
        v-else
        slot="title">
        Layout
      </template>
      <template
        v-if="headerRightSlot"
        slot="right">
        <e-icon
          :size="24"
          class="mr20"
          type="face-smile"
          color="blue"
          @click="rightClick"/>
      </template>
    </e-header>
    <e-content>
      <div class="lh1-5">
        <e-check-icon
          :icon-size="20"
          v-model="head"
          default-type="no-check"
          active-type="check"
          text="head"/>
        <e-separator/>
        <e-check-icon
          :icon-size="20"
          v-model="headerRightSlot"
          default-type="no-check"
          active-type="check"
          text="headerRightSlot"/>
        <e-separator/>
        <e-check-icon
          :icon-size="20"
          v-model="headerTitleSlot"
          default-type="no-check"
          default-color="g6"
          active-type="check"
          text="headerTitleSlot"/>
        <e-separator/>
        <e-check-icon
          :icon-size="20"
          v-model="headerLeftSlot"
          default-type="no-check"
          default-color="g6"
          active-type="check"
          text="headerLeftSlot"/>
      </div>
      <div class="font14 ptb30">
        <param-table :list="layoutInfo">
          <template slot="title">组件html tag：e-layout</template>
        </param-table>
        <param-table :list="layoutExt"/>
      </div>
      <div class="font14 ptb30">
        <param-table :list="headerInfo">
          <template slot="title">组件html tag：e-header</template>
        </param-table>
        <param-table :list="headerExt"/>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import { eLayout, eHeader } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "Layout",
    data() {
        return {
            head: true,
            headerRightSlot: true,
            headerTitleSlot: true,
            headerLeftSlot: true,
            layoutInfo: mergeProps(eLayout),
            layoutExt: [{
                name: "header",
                type: "slot"
            }],
            headerInfo: mergeProps(eHeader),
            headerExt: [{
                name: "left",
                type: "slot"
            }, {
                name: "title",
                type: "slot"
            }, {
                name: "right",
                type: "slot"
            }]
        };
    },
    methods: {
        goback() {
            window.history.go(-1);
        },
        rightClick() {
            alert("rightClick");
        }
    }
};

</script>
