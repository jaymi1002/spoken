<template>
  <e-layout shadow>
    <stu-header title="button"/>
    <e-content>
      <p class="tc lh3 font16">尝试一下</p>
      <e-separator/>
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
      <p class="tc lh2 font16">active-type:</p>
      <e-check-list
        v-model="activeType"
        :icon-size="20"
        type="radio"
        label-right
        default-type="no-check"
        active-type="check"
        reverse>
        <e-check-item
          v-for="item in activeTypeList"
          :value="item" :key="item">
          <span>{{ item }}</span>
        </e-check-item>
      </e-check-list>
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
      <p class="tc lh2 font16">其他:</p>
      <e-check-icon
        v-model="inline"
        :icon-size="20"
        text="inline"
        default-type="no-check"
        active-type="check"/>
      <e-separator/>
      <e-check-icon
        v-model="plain"
        :icon-size="20"
        text="plain"
        default-type="no-check"
        active-type="check"/>
      <div class="input-wrap plr30">
        <e-input
          v-model="width"
          type="number"
          label="宽度:"
          placeholder="请输入"/>
      </div>
      <e-separator/>
      <div class="input-wrap plr30">
        <e-input
          v-model="height"
          type="number"
          label="高度:"
          placeholder="请输入"/>
      </div>
      <e-separator/>
      <div class="input-wrap plr30">
        <e-input
          v-model="borderRadius"
          type="number"
          label="圆角:"
          placeholder="请输入"/>
      </div>
      <e-separator/>
      <div class="pt20">
        <e-button
          :width="parseInt(width)"
          :height="parseInt(height)"
          :type="type"
          :active-type="activeType"
          :inline="inline"
          :border-radius="borderRadius"
          :loading="status ==='loading'"
          :disabled="status === 'disabled'"
          :plain="plain"
          class="mt20"
          theme="primary">
          完成
        </e-button>
        <e-button
          :width="parseInt(width)"
          :height="parseInt(height)"
          :type="type"
          :active-type="activeType"
          :inline="inline"
          :border-radius="borderRadius"
          :loading="status ==='loading'"
          :disabled="status === 'disabled'"
          :plain="plain"
          class="mt20"
          theme="primary">
          完成
        </e-button>
      </div>
      <div class="font14 ptb30">
        <param-table :list="buttonInfo">
          <template slot="title">组件html tag：e-button</template>
          <template slot="tip">
            使用theme 需要在业务中配置
          </template>
        </param-table>
        <param-table :list="buttonExt"/>
      </div>

      <div>
        <div class="mt20">
          <p class="tc lh2 font18">---文字按钮---</p>
          <e-button-text>
            <span class="font14 text-primary">
              文案
            </span>
          </e-button-text>
          <e-button-text>
            <span class="font16 text-g3">
              文案
            </span>
          </e-button-text>
          <e-button-text>
            <span class="font18 text-primary">
              文案
            </span>
          </e-button-text>
        </div>
      </div>
      <div class="font14 ptb30">
        <param-table :list="buttonTextInfo">
          <template slot="title">组件html tag：e-button-text</template>
          <template slot="tip">只规定了点击效果为透明色</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script>
import { eButton } from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    data() {
        return {
            width: 750,
            height: 96,
            borderRadius: 10,
            typeList: ["rect", "cir", "default"],
            activeTypeList: ["scale", "opacity"],
            inline: false,
            plain: false,
            statusList: ["loading", "default", "disabled"],
            type: "cir",
            activeType: "scale",
            status: "default",
            buttonInfo: mergeProps(eButton),
            buttonExt: [{
                name: "default",
                type: "slot"
            }],
            buttonTextInfo: [{
                name: "default",
                type: "slot"
            }]
        };
    }
};

</script>
