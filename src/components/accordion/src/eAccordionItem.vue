<template>
    <li :class="itemClasses" class="accordion-item">
        <slot></slot>
    </li>
</template>
<script type="text/javascript">
export default {
    name: "e-accordion-item",
    props: {
        value: Number
    },
    inject: ["accordion"],
    provide() {
        return {
            accordionItem: this
        };
    },
    computed: {
        itemClasses() {
            if (this.accordion.radio) {
                if (this.index === this.accordion.currentIndex) {
                    return this.accordion.activeClass;
                }
            } else {
                if (this.accordion.currentIndex.indexOf(this.index) > -1) {
                    return this.accordion.activeClass;
                }
            }
        },
        actived() {
            return this.accordion.radio ? this.accordion.currentIndex === this.index : this.accordion.currentIndex.indexOf(this.index) > -1;
        }
    },
    data() {
        return {
            index: this.value ? this.value : 0
        };
    }
};

</script>
