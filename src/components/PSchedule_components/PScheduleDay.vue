<script setup>
import PScheduleItem from './PScheduleItem.vue';
</script>

<template>
    <div>
        <div class="p-schedule-day__date">
            <span class="text-date">{{getDateStringSeparatedWithDot}}</span>
        </div>
        <div class="p-schedule-day__timeline">
            <PScheduleItem v-for="(hour, forIndex) in daySchedule" :key="hour.hour" :data-hour="hour.hour" :hourSchedule="hour" :class="['p-schedule-item', {'p-schedule-item--odd': ((forIndex + 1) % 2 != 0)}, {'p-schedule-item--even': ((forIndex + 1) % 2 == 0)}, {'p-schedule-item--first': (forIndex == 0 && index == 0)}]" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            daySchedule: {
                type: Array,
                default: () => []
            },
            day: {
                type: String,
                default: ''
            },
            index: {
                type: Number,
                default: 0
            }
        },
        computed: {
            getDateStringSeparatedWithDot() {
                const date = new Date(this.day);
                return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
            }
        }
    }
</script>