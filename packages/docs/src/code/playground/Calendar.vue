<template>
    <flux-pane style="width: calc(100% + 240px); margin-left: -120px; margin-right: -120px">
        <flux-calendar>
            <template v-for="event of events">
                <flux-calendar-event
                    :date="event.date"
                    :label="event.label"/>
            </template>
        </flux-calendar>
    </flux-pane>
</template>

<script lang="ts">
    export const enabled = true;
</script>

<script
    lang="ts"
    setup>
    import { FluxCalendar, FluxCalendarEvent, FluxPane } from '@fancee/flux';
    import { DateTime } from 'luxon';

    const events = [
        {
            date: DateTime.now().startOf('month'),
            label: 'Some event'
        },
        {
            date: DateTime.now().endOf('month'),
            label: 'Another event'
        }
    ];
</script>
