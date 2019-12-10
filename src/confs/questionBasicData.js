import varType from "@/plugins/sdk/vartype.js";
//通用数据存储结构
let commonData = {};
// 是否是教师
let isTeacher = false;
// 打log的的接口
let logData = {};
//获取题目数据的接口
let getData = {};
//提交题目数据的接口
let postData = {};
//存储答题数据的接口
let setRecord = {};
//获取答题数据的接口
let getRecord = {};
//是否可以再做一次的的接口
let canDo = {};
// 答题的遍数
let roundTotal = 1;
// 是否是vip
let isVip = false;
// vip类型
let vipType = 0;

/* 初始化答题基础数据 */
let initBasicData = (oriData) => {
    commonData = oriData.as_data;
    isTeacher = oriData.is_try;
    logData = oriData.url.log_data;
    getData = oriData.url.get_data;
    postData = oriData.url.post_data;
    setRecord = oriData.url.set_record;
    getRecord = oriData.url.get_record;
    canDo = oriData.url.can_do;
    data2Str(logData);
    data2Str(getData);
    data2Str(postData);
    data2Str(setRecord);
    data2Str(getRecord);
    data2Str(canDo);
    roundTotal = commonData.number ? commonData.number : roundTotal;
    roundTotal = parseInt(roundTotal);
    isVip = commonData.is_vip;
    vipType = commonData.vip_icon;
};
function data2Str(obj) {
    if (!obj.data.data) {
        return;
    }
    obj.data.data = varType.isString(obj.data.data) ? obj.data.data : JSON.stringify(obj.data.data);
}
export {
    initBasicData,
    commonData,
    isTeacher,
    logData,
    getData,
    postData,
    setRecord,
    getRecord,
    canDo,
    roundTotal,
    isVip,
    vipType
};
