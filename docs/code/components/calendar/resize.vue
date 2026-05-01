<template>
    <FluxCalendar
        :initial-date="anchorDate"
        :hour-range="[8, 18]"
        view="day"
        draggable
        @reschedule="onReschedule"
        @resize="onResize">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
                :duration="event.duration"
                :id="event.id">
                <div :style="cardStyle(event.color)">
                    {{ event.label }} · {{ event.duration }}m
                </div>
            </FluxCalendarItem>
        </template>
    </FluxCalendar>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    type Color = 'primary' | 'success' | 'info';

    type Event = {
        readonly id: number;
        date: DateTime;
        duration: number;
        readonly label: string;
        readonly color: Color;
    };

    const anchorDate = DateTime.now().startOf('day');

    const events = ref<Event[]>([
        {id: 1, date: anchorDate.plus({hours: 9}), duration: 60, label: 'Stand-up', color: 'primary'},
        {id: 2, date: anchorDate.plus({hours: 11}), duration: 90, label: 'Design review', color: 'info'},
        {id: 3, date: anchorDate.plus({hours: 14}), duration: 30, label: 'Demo', color: 'success'}
    ]);

    function onReschedule({id, toDate}: {id: number | string; toDate: DateTime}): void {
        const event = events.value.find(e => e.id === id);

        if (event) {
            event.date = toDate;
        }
    }

    function onResize({id, toDate, toDuration}: {id: number | string; toDate: DateTime; toDuration: number}): void {
        const event = events.value.find(e => e.id === id);

        if (event) {
            event.date = toDate;
            event.duration = toDuration;
        }
    }

    function cardStyle(color: Color): string {
        return `padding: 4px 8px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 12px; line-height: 1.2; height: 100%; box-sizing: border-box;`;
    }
</script>
