<template>
    <flux-pane style="width: calc(100% + 240px); margin-left: -120px; margin-right: -120px">
        <flux-calendar>
            <template v-for="event of events">
                <flux-calendar-event
                    :date="event.date"
                    :label="event.label"
                    v-slot:tooltip>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem blanditiis consequatur cum, hic labore maiores molestiae, omnis optio, pariatur placeat quae quaerat quam quas recusandae totam ut voluptas voluptatem.
                </flux-calendar-event>
            </template>
        </flux-calendar>
    </flux-pane>
</template>

<script lang="ts">
    export const enabled = false;
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
