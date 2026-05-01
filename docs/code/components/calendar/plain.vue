<template>
    <FluxCalendar :initial-date="anchorDate">
        <template
            v-for="event of events"
            :key="event.id">
            <FluxCalendarItem
                :date="event.date"
                :id="event.id"
                @click="event.onClick">
                {{ event.label }}
            </FluxCalendarItem>
        </template>
    </FluxCalendar>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarItem } from '@flux-ui/components';
    import { DateTime } from 'luxon';

    const anchorDate = DateTime.now().startOf('month').plus({days: 9});

    const events = [
        {id: 1, date: anchorDate, label: 'Stand-up', onClick: undefined},
        {id: 2, date: anchorDate, label: 'Lunch with team', onClick: () => alert('Lunch')},
        {id: 3, date: anchorDate.plus({days: 1}), label: 'Pair programming', onClick: undefined},
        {id: 4, date: anchorDate.plus({days: 2}), label: 'Code review', onClick: () => alert('Code review')},
        {id: 5, date: anchorDate.plus({days: 4}), label: 'Demo', onClick: undefined},
        {id: 6, date: anchorDate.plus({days: 4}), label: 'Drinks', onClick: undefined},
        {id: 7, date: anchorDate.plus({days: 7}), label: 'Release', onClick: () => alert('Release')}
    ];
</script>
