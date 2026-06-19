import { DateTime } from 'luxon';
import { computed } from 'vue';
import type { Id, TimeEntry } from '@/types';
import { uid } from '@/util/id';
import { db } from './state';

export function useTimeStore() {
    const entries = computed(() => db.timeEntries);

    function entriesForMemberWeek(memberId: Id, weekStart: DateTime): TimeEntry[] {
        const weekEnd = weekStart.plus({days: 7});

        return db.timeEntries.filter(entry =>
            entry.memberId === memberId &&
            entry.date >= weekStart &&
            entry.date < weekEnd);
    }

    function hoursFor(memberId: Id, projectId: Id, day: DateTime, weekStart: DateTime): number {
        return entriesForMemberWeek(memberId, weekStart)
            .filter(entry => entry.projectId === projectId && entry.date.hasSame(day, 'day'))
            .reduce((sum, entry) => sum + entry.hours, 0);
    }

    function projectsForMemberWeek(memberId: Id, weekStart: DateTime): Id[] {
        const ids = new Set<Id>();

        for (const entry of entriesForMemberWeek(memberId, weekStart)) {
            ids.add(entry.projectId);
        }

        return [...ids];
    }

    function addEntry(input: Omit<TimeEntry, 'id'>): TimeEntry {
        const entry: TimeEntry = {id: uid('te'), ...input};
        db.timeEntries = [...db.timeEntries, entry];
        return entry;
    }

    function weekTotal(memberId: Id, weekStart: DateTime): number {
        return entriesForMemberWeek(memberId, weekStart).reduce((sum, entry) => sum + entry.hours, 0);
    }

    function billableTotal(memberId: Id, weekStart: DateTime): number {
        return entriesForMemberWeek(memberId, weekStart)
            .filter(entry => entry.billable)
            .reduce((sum, entry) => sum + entry.hours, 0);
    }

    return {
        addEntry,
        billableTotal,
        entries,
        entriesForMemberWeek,
        hoursFor,
        projectsForMemberWeek,
        weekTotal
    };
}
