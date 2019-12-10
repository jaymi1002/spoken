/*
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-11-07 17:51:31
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 18:04:11
 */
function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        // 打印交换值
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

export {
    shuffle
};
