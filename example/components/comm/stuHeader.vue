<template>
  <e-header
    :title="title"
    fixed
    @goback="commGoback">
    <div
      v-if="!title"
      slot="title">
      <slot/>
    </div>
  </e-header>
</template>
<script type="text/javascript">
export default{
    name: "StuHeader",
    // extends:eHeader,
    props: {
        title: String
    },
    methods: {
        commGoback() {
            window.history.go(-1);
        }
    }
};
</script>
<style lang="scss">
</style>
