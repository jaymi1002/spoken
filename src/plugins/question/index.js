import spokenWordsData from "@/plugins/question/spokenWordsData";
import bizObj from "@/confs/bizConf";
let biz = "";
let id = "";
let key = "";
let jiaocai = {};
let quesItems = [];
let getAns = () => {};
let engeen = "yzs";
let ques = {
    spokenWordsData
};
function initQuestionData(data, _biz, _engeen) {
    let quesType = bizObj[_biz].dataUtil;
    engeen = _engeen;
    let quesData = ques[quesType].initData(data);
    ({biz, key, jiaocai, quesItems, id, getAns} = ques[quesType]);
}

export {
    biz,
    id,
    key,
    jiaocai,
    quesItems,
    initQuestionData,
    getAns,
    engeen
};
