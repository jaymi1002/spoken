import {isTeacher, setRecord} from "@/confs/questionBasicData";
import qs from "qs";
import Vue from 'vue';
let storedRecordData = {};
let currenRecordData = [];
function setOriRecordData(roundTotal, quesNum, engeenType) {
    let allRoundData = {};
    allRoundData.roundTotal = roundTotal;
    allRoundData.currentQuesIndex = 0;
    allRoundData.version = 3;//当时AS为了区分3.0和4.0而进行的版本区分
    allRoundData.script = "js";//当前的编程语言，为了区分as语言。
    allRoundData.sendP = [];
    allRoundData.duation = 0;
    allRoundData.bestRecordData = [];
    allRoundData.view = "main";//记录录音的答题页面
    allRoundData.pause = 0;//暂停次数
    for (let i = 0;i < roundTotal;i++) {
        let currentRoundData = {};
        allRoundData.sendP.push(currentRoundData);
        currentRoundData.time = 0;
        let scoreArr = currentRoundData.scoreArr = [];
        for (let j = 0;j < quesNum;j++) {
            let recordData = {
                datas: {
                    "version": "full 1.0",
                    "standardScore": 0,
                    "voiceSpeed": 0, "score": 0,
                    "EvalType": "general",
                    "lines": [
                        {
                            "sample": "morning",
                            "usertext": "", "begin": 0,
                            "end": 1.524, "score": 0,
                            "voiceSpeed": 0, "standardScore": 0, "businessLevel": "1", "fluency": 0,
                            "integrity": 0, "pronunciation": 0,
                            "words": [{"StressOfWord": 0, "phonetic": "'mɔːrnɪŋ", "text": "morning", "type": 1, "begin": 1.524, "end": 1.524, "volume": 0, "score": 0, "subwords": [{ "subtext": "'", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "m", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "ɔː", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "r", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "n", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "ɪ", "volume": 0, "begin": 0, "end": 0, "score": 0 }, { "subtext": "ŋ", "volume": 0, "begin": 0, "end": 0, "score": 0 }] }]
                        }],
                    "audio": "http://edu.hivoice.cn:9088/WebAudio-1.0-SNAPSHOT/audio/play/cb125b35-5a39-4d1c-b99f-4d9d57d8a872/1573627907220898232/bj"
                },
                score: 0
            };
            if (i === 0) {
                allRoundData.bestRecordData[j] = Object.assign({}, recordData);
                currenRecordData[j] = Object.assign({}, recordData);
            }
            scoreArr.push(recordData);
        }
    }
    storedRecordData = allRoundData;
    return allRoundData;
}

function getStoredRecordData() {
    return storedRecordData;
}
function getCurrenRecordData() {
    return currenRecordData;
}
function getBestRecordData() {
    return storedRecordData.bestRecordData;
}
//当读取到上一次的答题数据时，通过此方法更新storedRecordData
function seStoredData(data) {
    storedRecordData = data;
}
function getDuration() {
    return storedRecordData.duation;
}
// 进入重读页时，重置currenRecordData，保持跟bestRecordData一致
function resetCurrenRecordData() {
    for (let i = 0;i < currenRecordData.length;i++) {
        currenRecordData[i] = storedRecordData.bestRecordData[i];
    }
}
//存储答题数据到缓存中，roundNow表示遍数，在重读页roundNow=-1，quesIndex答题index,recordData返回结果
//根据答题遍数及题目index,会存入 storedRecordData.sendP[roundNow].scoreArr[quesIndex]；当roundNow=-1，也就是重读页时，不会存入缓存
//如果答题的分数比bestRecordData[quesIndex].score要高或者相等，会存入bestRecordData[quesIndex]
function storeRecordData(roundNow, quesIndex, recordData) {

    if (roundNow !== -1) {
        storedRecordData.sendP[roundNow].scoreArr[quesIndex].score = recordData.score;
        storedRecordData.sendP[roundNow].scoreArr[quesIndex].datas = recordData;
    }
    currenRecordData[quesIndex] = {
        score: recordData.score,
        datas: recordData
    };
    if (storedRecordData.bestRecordData[quesIndex].score <= recordData.score) {
        storedRecordData.bestRecordData[quesIndex] = {
            score: recordData.score,
            datas: recordData
        };
    }
    if (roundNow !== -1) {
        storedRecordData.roundNow = roundNow;
        storedRecordData.currentQuesIndex = quesIndex;
    }
    ajaxSetRecordData();
}
// 存储当前是哪个页面的信息，因为有的页面需要手动进入重读页
function storePageData(page) {
    if (page !== "review") {
        return;
    }
    storedRecordData.view = page;
    ajaxSetRecordData();
}
function updateDuration() {
    storedRecordData.duation = storedRecordData.duation || 0;
    storedRecordData.duation++;
}

function ajaxSetRecordData() {
    if (isTeacher) {
        console.log("存储记录的结果是:老师账号不存储记录");
        return;
    }
    setRecord.data.data = JSON.stringify(storedRecordData);
    Vue.prototype.$axios({
        method: "post",
        url: setRecord.as_url,
        data: qs.stringify(setRecord.data),
        responseType: "json"
    })
        .then(({ data: result }) => {
            if (result.status === "0") {
                console.log("存储记录的结果成功");
            } else {
                console.log("存储记录的结果失败");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export {
    setOriRecordData,
    getStoredRecordData,
    getCurrenRecordData,
    getBestRecordData,
    seStoredData,
    storeRecordData,
    resetCurrenRecordData,
    updateDuration,
    storePageData,
    getDuration
};
