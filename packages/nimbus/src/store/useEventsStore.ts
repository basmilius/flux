import { DateTime } from 'luxon';
import { computed } from 'vue';
import type { CalendarEvent, Id } from '@/types';
import { db } from './state';

export function useEventsStore() {
    const events = computed(() => db.events);

    function eventsForProject(projectId: Id): CalendarEvent[] {
        return db.events.filter(event => event.projectId === projectId);
    }

    function upcoming(limit = 6): CalendarEvent[] {
        const now = DateTime.now();

        return [...db.events]
            .filter(event => event.date > now)
            .sort((a, b) => a.date.toMillis() - b.date.toMillis())
            .slice(0, limit);
    }

    function reschedule(id: Id | number, toDate: DateTime): void {
        const event = db.events.find(entry => entry.id === String(id));

        if (event) {
            event.date = toDate.set({hour: event.date.hour, minute: event.date.minute});
        }
    }

    return {
        events,
        eventsForProject,
        reschedule,
        upcoming
    };
}
