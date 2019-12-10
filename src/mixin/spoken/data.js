/*
 * @Description: 
 * @Autor: lifangfang
 * @Date: 2019-11-07 16:38:08
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 16:39:01
 */
export default {
    data() {
        return {
            spokenData: null,
            step: "loading", // loading start test main review result detail
            mode: 0, // 0 纠错 1 领读 2 速度
            targetScore: 70, //目标分数
            title: "", //题型名称
            vipType: "" //vip类型
        }
    }
}