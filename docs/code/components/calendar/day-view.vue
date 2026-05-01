<template>
    <FluxCalendar
        :initial-date="today"
        :hour-range="[8, 18]"
        view="day">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
                :duration="event.duration"
                :all-day="event.allDay"
                :id="event.id">
                <div :style="cardStyle(event.color)">
                    {{ event.label }}
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

    type Color = 'primary' | 'success' | 'warning' | 'info';

    const today = DateTime.now().startOf('day');

    const events = [
        {id: 1, date: today, allDay: true, duration: 0, label: 'On call', color: 'warning' as Color},
        {id: 2, date: today.plus({hours: 9}), allDay: false, duration: 30, label: 'Stand-up', color: 'primary' as Color},
        {id: 3, date: today.plus({hours: 10}), allDay: false, duration: 90, label: 'Design review', color: 'info' as Color},
        {id: 4, date: today.plus({hours: 13}), allDay: false, duration: 60, label: 'Lunch', color: 'success' as Color},
        {id: 5, date: today.plus({hours: 15}), allDay: false, duration: 60, label: 'Pair session', color: 'primary' as Color},
        {id: 6, date: today.plus({hours: 16, minutes: 30}), allDay: false, duration: 30, label: 'Wrap up', color: 'info' as Color}
    ];

    function cardStyle(color: Color): string {
        return `padding: 4px 8px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 12px; line-height: 1.2; height: 100%; box-sizing: border-box;`;
    }
</script>
