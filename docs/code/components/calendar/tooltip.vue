<template>
    <FluxCalendar :initial-date="anchorDate">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
                :id="event.id">
                <FluxTooltip :content="event.tooltip">
                    <div :style="cardStyle(event.color)">
                        {{ event.label }}
                    </div>
                </FluxTooltip>
            </FluxCalendarItem>
        </template>
    </FluxCalendar>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarItem, FluxTooltip } from '@flux-ui/components';
    import { DateTime } from 'luxon';

    type Color = 'primary' | 'success' | 'warning';

    const anchorDate = DateTime.now().startOf('month').plus({days: 9});

    const events = [
        {id: 1, date: anchorDate, label: 'Stand-up', tooltip: 'Daily stand-up at 09:30 with the engineering team.', color: 'primary' as Color},
        {id: 2, date: anchorDate.plus({days: 1}), label: 'Lunch with Anna', tooltip: 'Lunch with Anna at the new place around the corner. 12:30.', color: 'warning' as Color},
        {id: 3, date: anchorDate.plus({days: 2}), label: 'Demo', tooltip: 'Demo of the new dashboard for stakeholders. 15:00 — 16:00.', color: 'success' as Color},
        {id: 4, date: anchorDate.plus({days: 4}), label: 'Retro', tooltip: 'Sprint retrospective. 14:00.', color: 'primary' as Color}
    ];

    function cardStyle(color: Color): string {
        return `padding: 6px 9px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 13px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
    }
</script>
