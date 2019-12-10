import {getBestRecordData} from "@/plugins/storedDataUtil";
let spokenWordsData = {};
function initData(data) {
    let QuestionData = data[0];
    spokenWordsData.biz = QuestionData.biz;
    spokenWordsData.key = QuestionData.key;
    spokenWordsData.jiaocai = QuestionData.jiaocai;
    spokenWordsData.id = QuestionData.id;
    spokenWordsData.quesItems = QuestionData.ques_item;
}
function getAns() {
    let arr = [];
    getBestRecordData().forEach((element, index) => {
        arr.push({
            _from: element.datas._from || "yzs",
            audio: element.datas.audio,
            id: spokenWordsData.quesItems[index].id,
            text: spokenWordsData.quesItems[index].realtext,
            record_id: element.datas.audio,
            score: element.score || 0
            // accuracy: 0,
            // fluency: 0,
            // integrity: 0,
        });
    });
    return arr;
}
spokenWordsData = {
    initData,
    getAns,
    biz: "",
    key: "",
    id: "",
    jiaocai: "",
    quesItems: []
};
export default spokenWordsData;
