<template>
    <FluxCalendar
        :initial-date="anchorDate"
        :hour-range="[7, 20]"
        view="week">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
                :duration="event.duration"
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

    const anchorDate = DateTime.now().startOf('week').plus({hours: 9});

    const events = [
        {id: 1, date: anchorDate, duration: 30, label: 'Stand-up', color: 'primary' as Color},
        {id: 2, date: anchorDate.plus({hours: 3}), duration: 60, label: 'Lunch', color: 'warning' as Color},
        {id: 3, date: anchorDate.plus({day: 1, hours: 1}), duration: 120, label: 'Design review', color: 'info' as Color},
        {id: 4, date: anchorDate.plus({day: 2, hours: 5}), duration: 30, label: 'Demo', color: 'success' as Color},
        {id: 5, date: anchorDate.plus({day: 3, hours: 2}), duration: 90, label: 'Workshop', color: 'primary' as Color},
        {id: 6, date: anchorDate.plus({day: 4, hours: 4}), duration: 60, label: 'Retro', color: 'info' as Color}
    ];

    function cardStyle(color: Color): string {
        return `padding: 4px 8px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 12px; line-height: 1.2; height: 100%; box-sizing: border-box;`;
    }
</script>
