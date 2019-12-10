/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-31 16:32:39
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-10-31 16:53:11
 */
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: [String, Number]
    },
    data() {
        return {
            current: this.value
        };
    },
    watch: {
        value(newVal) {
            this.current = newVal;
        },
        current(newVal) {
            this.$emit("change", newVal);
        }
    }
};
