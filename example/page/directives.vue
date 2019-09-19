<template>
  <e-layout title="directives">
    <stu-header
      slot="header"
      title="directives"/>
    <e-content>
      <p class="font18 lh3 tc">Tap</p>
      <div class="tc font18">
        <e-button
          v-tap="[tap,'hello','world']"
          href="javascript:;"
          theme="primary">tap</e-button>
      </div>
      <p class="font18 lh3 tc">hold</p>
      <div
        v-touch-hold:300="hold"
        class="demo1 bg-primary flex flex-center">
        <pre>{{ holdBackData }}</pre>
      </div>
      <p class="font18 lh3 tc">swipe</p>
      <div
        v-touch-swipe.up="swipe"
        class="demo1 bg-primary flex flex-center">
        <pre>{{ swipeBackData }}</pre>
      </div>
      <p class="font18 lh3 tc">pan</p>
      <div
        v-touch-pan.prevent.stop.horizontal="pan"
        class="demo1 bg-primary flex flex-center">
        <pre>{{ panBackData }}</pre>
      </div>

    </e-content>
  </e-layout>
</template>
<script type="text/javascript">
export default{
    data() {
        return {
            holdBackData: null,
            swipeBackData: null,
            panBackData: null
        };
    },
    methods: {
        tap(value, value1) {
            console.log(value);
            console.log(value1);
        },
        hold(value) {
            this.holdBackData = value;
        },
        swipe(value) {
            this.swipeBackData = value;
        },
        pan(value) {
            this.panBackData = value;
        }
    }
};
</script>
<style lang="scss">
	.demo1{
		width: 100%;
		height: 9.0rem;
	}
</style>
