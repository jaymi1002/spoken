// 整体的update控制。
let updateHooks = [];
let timeId;
let timeManage = {
    onUpdate(fn) {
        if (!timeId) {
            timeId = setInterval(() => {
                updateHooks.forEach((item) => {
                    item();
                });
            }, 1000);
        }
        if (!(fn instanceof Function)) {
            throw new Error("请注册function");
        }
        updateHooks.push(fn);
    },
    offUpdate(fn) {
        updateHooks.splice(updateHooks.indexOf(fn), 1);
        if (!updateHooks.length) {
            clearInterval(timeId);
            timeId = 0;
        }
    },
    offAllUpdate() {
        while (updateHooks.length) {
            updateHooks.pop();
        }
    },
    destroy() {
        this.offAllUpdate();
        clearInterval(timeId);
        timeId = 0;
    }
};
export default timeManage;
