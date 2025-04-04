<template>
    <FluxCalendar>
        <template v-for="event of events">
            <FluxCalendarEvent
                :date="event.date"
                :label="event.label"/>
        </template>
    </FluxCalendar>
</template>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarEvent } from '@basmilius/flux';
    import { DateTime } from 'luxon';

    const events = [
        {date: DateTime.now(), label: 'Work'}
    ];
</script>
