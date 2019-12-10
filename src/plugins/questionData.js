let queDatas = [];
//data原始数据，type答题类型，word,sentence,paragraph
function initQuesionData(data) {
    console.log(data);
    let arr = [];
    if (data.biz === "005") {
        initReadWord(data);
    }
}
function initReadWord(data) {

    /* arr.forEach(el => {
        let quesData = {
            text:el.text,
            realText:el.realText,
            audio:arr[i].audio,
            start:,
            duration,
            recordDuration:,
        };
        queDatas.push(quesData);
    }); */
}
function getQuestionData() {
    return queDatas;
}
export {
    initQuesionData,
    getQuestionData
};
