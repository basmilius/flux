<template>
    <FluxApplicationContent layout="full">
        <FluxCalendar
            draggable
            @reschedule="onReschedule">
            <FluxCalendarItem
                v-for="event of events"
                :id="event.id"
                :key="event.id"
                :date="event.date"
                :duration="event.durationMinutes"
                @click="onEvent(event)">
                <div :class="`event event-${event.color}`">
                    {{ event.title }}
                </div>
            </FluxCalendarItem>
        </FluxCalendar>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxCalendar, FluxCalendarItem, showSnackbar } from '@flux-ui/components';
    import type { DateTime } from 'luxon';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useEventsStore } from '@/store';
    import type { CalendarEvent } from '@/types';

    const route = useRoute();
    const {eventsForProject, reschedule} = useEventsStore();

    const events = computed(() => eventsForProject(String(route.params.id)));

    function onReschedule({id, toDate}: { id: string | number; toDate: DateTime }): void {
        reschedule(id, toDate);
    }

    function onEvent(event: CalendarEvent): void {
        showSnackbar({icon: 'calendar', message: `${event.title} · ${event.date.toFormat('LLL d, HH:mm')}` });
    }
</script>

<style scoped>
    .event {
        height: 100%;
        padding: 3px 6px;
        font-size: 12px;
        font-weight: 500;
        color: var(--foreground);
        border-radius: 4px;
        border-left: 3px solid var(--primary-500);
        background: var(--primary-100);
    }

    .event-info {
        border-left-color: var(--info-500);
        background: var(--info-100);
    }

    .event-success {
        border-left-color: var(--success-500);
        background: var(--success-100);
    }

    .event-danger {
        border-left-color: var(--danger-500);
        background: var(--danger-100);
    }

    .event-warning {
        border-left-color: var(--warning-500);
        background: var(--warning-100);
    }
</style>
