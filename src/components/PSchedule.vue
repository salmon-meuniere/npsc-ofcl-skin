<script setup>
import PScheduleDay from './PSchedule_components/PScheduleDay.vue';
</script>

<template>
    <div class="p-schedule" ref="root">
        <PScheduleDay v-for="(date, index) in Object.keys(scheduleDevidedByDateAndHour)" :key="date" :day="date" :data-day="date" :index="index" :daySchedule="scheduleDevidedByDateAndHour[date]" class="p-schedule-day" />
    </div>
</template>

<script>
    export default {
        props: {
            schedule: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            scheduleDevidedByDateAndHour() {
                const scheduleDevidedByDateAndHour = {};
                this.schedule.forEach(item => {
                    const date = new Date(item.start_date);
                    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    if (!scheduleDevidedByDateAndHour[dateString]) {
                        scheduleDevidedByDateAndHour[dateString] = {};
                    }
                    const hour = date.getHours();
                    if (!scheduleDevidedByDateAndHour[dateString][hour]) {
                        scheduleDevidedByDateAndHour[dateString][hour] = [];
                    }
                    scheduleDevidedByDateAndHour[dateString][hour].push(item);
                });
                Object.keys(scheduleDevidedByDateAndHour).forEach(date => {
                    scheduleDevidedByDateAndHour[date] = Object.keys(scheduleDevidedByDateAndHour[date]).map(hour => {
                        return {
                            hour: hour,
                            schedule: scheduleDevidedByDateAndHour[date][hour]
                        };
                    }).sort((a, b) => {
                        return a.hour - b.hour;
                    });
                });
                return scheduleDevidedByDateAndHour;
            }
        },
        methods: {
            scroll() {
                let firstStreamEl = this.$refs.root.querySelector(".c-card__user.is-now:first-child").closest(".p-schedule-item");
                let topPadding;
                if(window.innerWidth >= 760) {
                    let m = document.querySelector('.text-date');
                    let n = document.querySelector('.p-schedule-day__date');
                    topPadding = window.getComputedStyle(m).top.replace("px", "") - window.getComputedStyle(n).paddingTop.replace("px", "");
                } else {
                    topPadding = 0;
                }
                if (firstStreamEl) {
                //if(false) {
                    window.scrollTo({
                        top: firstStreamEl.getBoundingClientRect().top - topPadding,
                        behavior: "smooth"
                    });
                } else {
                    const now = new Date();
                    const nowDateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                    const nowHour = now.getHours();
                    const nearestHour = this.scheduleDevidedByDateAndHour[nowDateString].find(hour => hour.hour > nowHour);
                    const nearestHourEl = this.$refs.root.querySelector(`.p-schedule-day[data-day="${nowDateString}"] .p-schedule-item[data-hour="${nearestHour.hour}"] `);
                    window.scrollTo({
                        top: nearestHourEl.getBoundingClientRect().top - topPadding,
                        behavior: "smooth"
                    });
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.scroll();
            }, 200);
        },
    }
</script>