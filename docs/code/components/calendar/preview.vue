<template>
    <FluxCalendar :initial-date="anchorDate">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
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

    const anchorDate = DateTime.now().startOf('month').plus({days: 9});

    const events = [
        {id: 1, date: anchorDate, label: 'Stand-up', color: 'primary' as Color},
        {id: 2, date: anchorDate, label: 'Design review', color: 'info' as Color},
        {id: 3, date: anchorDate.plus({days: 1}), label: 'Sprint planning', color: 'warning' as Color},
        {id: 4, date: anchorDate.plus({days: 2}), label: 'Demo', color: 'success' as Color},
        {id: 5, date: anchorDate.plus({days: 4}), label: 'Retro', color: 'primary' as Color},
        {id: 6, date: anchorDate.plus({days: 7}), label: 'Release', color: 'success' as Color}
    ];

    function cardStyle(color: Color): string {
        return `padding: 6px 9px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 13px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
    }
</script>
