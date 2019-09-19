<template>
  <e-layout shadow>
    <stu-header>
      <p class="font20">scrollPage</p>
    </stu-header>
    <e-content>
      <e-check-icon
        :icon-size="20"
        v-model="wheel"
        default-type="no-check"
        active-type="check"
        text="是否显示3d滚动"/>
      <e-separator/>
      <p class="lh3 font16 plr30">
        选择结果:{{ list[select] }}
      </p>
      <e-separator/>
      <p class="lh3 font16 tr">
        <e-button
          :width="250"
          :height="76"
          inline
          active-type="scale"
          theme="primary"
          @click="$refs.scrollPop.show();">显示pop</e-button>
      </p>
      <e-scroll-pop
        ref="scrollPop"
        :list="list"
        v-model="select"
        :wheel="wheel"
        :indicator="false"
        title="请选择地区"
        label="选择之后要点击确定哦"/>
      <div class="font14 pt30">
        <param-table :list="scrollPopInfo">
          <template slot="title">组件html tag：e-scroll-pop</template>
        </param-table>
      </div>
    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
import {eScrollPop} from "@/components";
import mergeProps from "@/../example/lib/mergeProps";
export default {
    name: "ScrollPop",
    data() {
        return {
            wheel: true,
            select: 1,
            list: ["北京", "上海", "深圳", "天津", "广州", "合肥", "青岛"],
            scrollPopInfo: mergeProps(eScrollPop),
            scrollPopExt: []
        };
    }
};

</script>
