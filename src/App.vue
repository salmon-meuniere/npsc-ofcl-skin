<script setup>
import CHeader from "./components/CHeader.vue";
import CLoader from "./components/CLoader.vue";
import PSchedule from "./components/PSchedule.vue";
</script>

<template>
    <CHeader />
    <CLoader v-if="status == 0" />
    <PSchedule v-else-if="status == 1" :schedule="streamDataSort" />
</template>

<script>
export default {
    data() {
        return {
            status: 0,
            streamData: [],
        };
    },
    computed: {
        streamDataSort() {
            if (this.status != 1 || this.streamData == []) return;

            return this.streamData[0].sort(function (a, b) {
                return new Date(a["start_date"]) - new Date(b["start_date"]);
            });
        },
    },
    methods: {
        fetchData() {
            let x = new XMLHttpRequest();
            let self = this;
            x.open(
                "GET",
                "https://schedule-api.noripromatome.ml/client-api/NpStream.json"
            );
            x.addEventListener("load", function () {
                if (this.status == 200 || this.status == 304) {
                    try {
                        self.streamData = JSON.parse(this.responseText);
                        self.status = 1;
                    } catch (error) {
                        console.error(error);
                        alert("配信データの解析時に問題が発生しました");
                    }
                } else {
                    alert("配信データの読み込みに失敗しました");
                    return;
                }
            });
            x.send();
        }
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style>
@import "./assets/schedule.css";

.bi {
    display: inline-block;
    vertical-align: -0.125em;
    fill: currentcolor;
}
</style>
