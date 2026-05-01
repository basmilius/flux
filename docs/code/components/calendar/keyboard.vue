<template>
    <div>
        <p style="margin-bottom: 12px; font-size: 13px; color: var(--foreground-secondary);">
            Tab to focus an item, then use <strong>Space</strong> or <strong>Enter</strong> to grab it.
            Use <strong>Arrow keys</strong> to move, <strong>Enter</strong> to drop and <strong>Escape</strong> to cancel.
        </p>

        <FluxCalendar
            :initial-date="anchorDate"
            draggable
            @reschedule="onReschedule">
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
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    type Color = 'primary' | 'success' | 'warning' | 'info';

    type Event = {
        readonly id: number;
        date: DateTime;
        readonly label: string;
        readonly color: Color;
    };

    const anchorDate = DateTime.now().startOf('month').plus({days: 9});

    const events = ref<Event[]>([
        {id: 1, date: anchorDate, label: 'Stand-up', color: 'primary'},
        {id: 2, date: anchorDate.plus({days: 1}), label: 'Design review', color: 'info'},
        {id: 3, date: anchorDate.plus({days: 2}), label: 'Demo', color: 'success'},
        {id: 4, date: anchorDate.plus({days: 4}), label: 'Retro', color: 'warning'},
        {id: 5, date: anchorDate.plus({days: 7}), label: 'Release', color: 'success'}
    ]);

    function onReschedule({id, toDate}: {id: number | string; toDate: DateTime}): void {
        const event = events.value.find(e => e.id === id);

        if (event) {
            event.date = toDate;
        }
    }

    function cardStyle(color: Color): string {
        return `padding: 6px 9px; background: var(--${color}-100); color: var(--${color}-800); border-radius: var(--radius-half); font-size: 13px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
    }
</script>
