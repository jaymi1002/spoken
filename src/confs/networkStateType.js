//网络状态的枚举
let NETWORDK_GOOD = 0;
let NETWORDK_NORMAL = 1;
let NETWORK_BAD = 2;
let NETWORKD_BREAKDOWN = 3;
let networkStates = [
    {text: "网速良好！", color: "#fff"},
    {text: "网速一般！", color: "#F7F929"},
    {text: "网速较差！", color: "#FE0000"},
    {text: "当前网络较差或设备存在问题！", color: "#FE0000"}
];
export {
    NETWORDK_GOOD,
    NETWORDK_NORMAL,
    NETWORK_BAD,
    NETWORKD_BREAKDOWN,
    networkStates
};
