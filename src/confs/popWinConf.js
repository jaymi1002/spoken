import {WIN_CHECKLIST,WIN_VIP,WIN_PLAIN_TEXT,WIN_WARN_TITLE} from "./popWinType";
import {vipType} from "./questionBasicData"
let winVipTitles=[{img:"@/images/vip_privilege_popwin_0001.png",title:"再做一次，不断提升",content:{"0":"开通VIP，做题不限次数，挑战最好成绩，\n提交你的最高分！","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0002.png",title:"查看分数",content:{"0":"开通VIP，作业考试随意练，\n重温题目，加深印象，扎实掌握！","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0003.png",title:"开通VIP",content:{"0":"开通VIP，马上查看答题详情,获得成绩分析！","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0004.png",title:"再练一练，游刃有余",content:{"0":"开通VIP，作业考试随意练，\n巩固所学，不经意间炼就学霸!","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0005.png",title:"查看答案及解析",content:{"0":"开通VIP，及时查分，心中有“数”\n明了知识掌握程度!","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0006.png",title:"千锤百炼，更上层楼",content:{"0":"开通VIP，听领读，看评分。\n获得发音改进建议，助你练就精准口语！","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
{img:"@/images/vip_privilege_popwin_0007.png",title:"智能纠错，精准评分",content:{"0":"开通VIP，专享精准评分、智能纠错、再做一次、成绩解析等多项特权。争做学霸不是事儿！","6":"该功能为VIP会员专属，云会员无此权限，你可以到会员中心升级VIP，解锁全部会员权限哦！","5":"会员服务已经到期，快到个人中心升级VIP解锁全部会员权限吧！"}},
];

const VIP_PRIVILEGE_TOTAL,VIP_PRIVILEGE_UPGRADE,CLEAR_RECORD_NOVIP = {
    type:WIN_VIP,
    conf:{
        img:winVipTitles[6].img,
        title:winVipTitles[6].title,
        content:winVipTitles[6].content[vipType]||"",
    }
};

const VIP_PRIVILEGE_DOAGAIN = {
    type:WIN_VIP,
    conf:{
        img:winVipTitles[0].img,
        title:winVipTitles[0].title,
        content:winVipTitles[0].content[vipType]||"",
    }
};

const VIP_PRIVILEGE_LOOKSCORE = {
    type:WIN_VIP,
    conf:{
        img:winVipTitles[4].img,
        title:winVipTitles[4].title,
        content:winVipTitles[4].content[vipType]||"",
    }
};

const JIUCUO_STARTVIEW_NOVIP,JIUCUO_MAINVIEW_NOVIP={
    type:WIN_CHECKLIST,
    conf:{
        checked:["专业领读","智能录音","准确纠错"],
        noChecked:[],
        describe:"升级VIP会员，设置智能纠错模式",
        btns:["知道了","升级VIP"]
    }
};

const SUDU_MAINVIEW_VIP={
    type:WIN_CHECKLIST,
    conf:{
        checked:["智能录音",],
        noChecked:["专业领读","准确纠错"],
        describe:"自己速读模式你将享受到",
        btns:["马上切换","暂不切换"]
    }
};
const LINGDU_MAINVIEW_VIP,LINGDU_MAINVIEW_NOVIP={
    type:WIN_CHECKLIST,
    conf:{
        checked:["专业领读","智能录音",],
        noChecked:["准确纠错"],
        describe:"家教领读模式你将享受到",
        btns:["马上切换","暂不切换"]
    }
};
const JIUCUO_MAINVIEW_VIP,SUDU_MAINVIEW_NOVIP={
    type:WIN_CHECKLIST,
    conf:{
        checked:["专业领读","智能录音","准确纠错"],
        noChecked:[],
        describe:"智能纠错模式你将享受到",
        btns:["马上切换","暂不切换"]
    }
};

const CHOOSE_RECORDERDATA = {
    type:WIN_PLAIN_TEXT,
    conf:{
        content:"上次答题没有完成哦~\n要不要从上次的位置继续？",
        btns:["从头再来","继续答题"]
    }
};

const CHOOSE_BACKTHREEQUES = {
    type:WIN_PLAIN_TEXT,
    conf:{
        content:"你已经连续多句朗读成绩较差\n可能是设备有问题",
        btns:["从头再来","继续答题"]
    }
};

const TIPS_ANSWER_FORBID = {
    type:WIN_WARN_TITLE,
    conf:{
        title:"答案解析尚未公布",
        content:"老师将在收取本次训练后公布答案及解析,\n可在训练历史中查看",
        btns:["知道了"]
    }
};

const TIPS_ANSWER_FAIL = {
    TYPE:WIN_PLAIN_TEXT,
    conf:{
        content:"啊哦~成绩上传木有成功\n请检查下您的网络连接，然后",
        btns:["重新上传"]
    }
}

export{
    VIP_PRIVILEGE_TOTAL,
    VIP_PRIVILEGE_UPGRADE,
    CLEAR_RECORD_NOVIP,
    VIP_PRIVILEGE_DOAGAIN,
    VIP_PRIVILEGE_LOOKSCORE,
    JIUCUO_STARTVIEW_NOVIP,
    JIUCUO_MAINVIEW_NOVIP,
    SUDU_MAINVIEW_VIP,
    LINGDU_MAINVIEW_VIP,
    LINGDU_MAINVIEW_NOVIP,
    JIUCUO_MAINVIEW_VIP,
    SUDU_MAINVIEW_NOVIP,
    CHOOSE_RECORDERDATA,
    CHOOSE_BACKTHREEQUES,
    TIPS_ANSWER_FORBID,
    TIPS_ANSWER_FAIL
}