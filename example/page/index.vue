<!--
 * @Description:
 * @Autor: lifangfang
 * @Date: 2019-10-22 10:27:00
 * @LastEditors: lifangfang
 * @LastEditTime: 2019-11-07 16:55:30
 -->
<template>
    <div class="index-demo">
        <p>
            <a href="javascript:;" @click="showWords">读记词语</a>
        </p>
        <p>
            <a href="javascript:;" @click="showImitate">仿示例读句子</a>
        </p>
		 <spoken-words :engeen="engeen" :biz="biz"  v-if="vueType===SPOKENWORDS" ref="spokenWords" :data="data" @onHide="biz=''"></spoken-words>
        <imitate-simple
            v-if="showImitateStatus"
            ref="imitateSimple"
            :data="dataImitate"
            @onHide="onHide"
        ></imitate-simple>
    </div>
</template>
<script>

// import { SpeechData, SDK } from "@/plugins/sdk";

// import AudioPlayer from "@/plugins/AudioPlayer";
import spokenPopBox from "@";
// import wordsData from "../data";
import spokenWords from "@/components/spokenWords.vue";
import imitateSimple from "@/components/imitateSimple.vue";
import spokenWordsBasic from "@/json/spokeWordsBasic.json";
import question from "@/plugins/question";
import {SPOKENWORDS} from "@/confs/quesType";
import bizObj from "@/confs/bizConf";
export default {
    data() {
        return {
            dataWords: {
                keys: "005_1067219|1067222_1950",
                userId: "guest",
                vip_type: "isVip"
            },
            dataImitate: {
                keys: "009_1304235_1952",
                userId: "guest",
                vip_type: "isVip"
            },
            showImitateStatus: false,
		    data: {},
            SPOKENWORDS,
            biz: "",
            engeen: "yzs"
        };
    },
    mounted() {},
    components: {
        spokenWords,
        imitateSimple
    },
    created() {},
    computed: {
        vueType() {
            if (!this.biz) {
                return "";
            }
            return bizObj[this.biz].vue;
        }
    },
    methods: {
        showWords() {
            this.data = spokenWordsBasic;
            this.biz = "005";
            this.$nextTick(() => {
                this.$refs.spokenWords.show();
            });
        },
        showImitate() {
            this.showImitateStatus = true;
            this.$nextTick(() => {
                this.$refs.imitateSimple.show();
            });
        },
        onHide() {
            this.showImitateStatus = false;
        }
    }
};
</script>
<style lang="scss">
@import "@/style/variables.scss";
.index-demo {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > p {
        font-size: 16px;
        margin: 10px 0;
        a {
            color: $primaryBlue;
        }
    }
}
</style>
