<script setup>
import CCard from './CCard.vue';
</script>

<template>
    <div>
        <div v-for="min in Object.keys(getStreamArrayDevidedByMinutes)" :key="min" class="p-schedule-item__inner">
            <div class="p-schedule-item__time">
                <span class="text-time">{{getTimeString(getStreamArrayDevidedByMinutes[min][0].start_date)}}</span>
            </div>
            <div class="p-schedule-item__card" v-for="stream in getStreamArrayDevidedByMinutes[min]" :key="stream.id">
                <CCard :stream="stream" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            hourSchedule: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            getStreamArrayDevidedByMinutes() {
                const streamArrayDevidedByMinutes = [];
                this.hourSchedule.schedule.forEach(item => {
                    const date = new Date(item.start_date);
                    const minutes = date.getMinutes();
                    if (!streamArrayDevidedByMinutes[minutes]) {
                        streamArrayDevidedByMinutes[minutes] = [];
                    }
                    streamArrayDevidedByMinutes[minutes].push(item);
                });
                return streamArrayDevidedByMinutes;
            }
        },
        methods: {
            getTimeString(dateStr) {
                const date = new Date(dateStr);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            }
        }
    }
</script>