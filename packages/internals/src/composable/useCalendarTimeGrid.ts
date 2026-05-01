import type { DateTime } from 'luxon';
import { computed, type ComputedRef, type MaybeRefOrGetter, ref, type Ref, toValue, unref, watch } from 'vue';

export type UseCalendarTimeGridDayCount = 1 | 2 | 7;

export type UseCalendarTimeGridReturn = {
    readonly isTransitioningToPast: Ref<boolean>;
    readonly viewDate: Ref<DateTime>;
    readonly viewDates: ComputedRef<DateTime[]>;
    readonly rangeLabel: ComputedRef<string>;

    setViewDate(date: DateTime): void;
    next(): void;
    previous(): void;
};

function getAnchor(date: DateTime, dayCount: UseCalendarTimeGridDayCount): DateTime {
    return dayCount === 7 ? date.startOf('week') : date.startOf('day');
}

function stepDuration(dayCount: UseCalendarTimeGridDayCount): { day?: number; week?: number } {
    if (dayCount === 7) {
        return {week: 1};
    }

    if (dayCount === 2) {
        return {day: 2};
    }

    return {day: 1};
}

export default function (
    initialDate: DateTime,
    dayCount: MaybeRefOrGetter<UseCalendarTimeGridDayCount>
): UseCalendarTimeGridReturn {
    const isTransitioningToPast = ref(false);
    const viewDate = ref<DateTime>(getAnchor(initialDate, toValue(dayCount)));

    // Re-anchor on dayCount change (e.g. switching from week to two-days view).
    watch(() => toValue(dayCount), (count) => {
        viewDate.value = getAnchor(unref(viewDate), count);
    });

    const viewDates = computed<DateTime[]>(() => {
        const anchor = unref(viewDate);
        const count = toValue(dayCount);
        const out: DateTime[] = [];

        for (let i = 0; i < count; ++i) {
            out.push(anchor.plus({day: i}));
        }

        return out;
    });

    const rangeLabel = computed<string>(() => {
        const dates = unref(viewDates);
        const first = dates[0];
        const last = dates[dates.length - 1];
        const count = toValue(dayCount);

        if (count === 1) {
            return first.toLocaleString({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
        }

        const sameMonth = first.month === last.month;
        const sameYear = first.year === last.year;

        const firstFmt = first.toLocaleString(
            sameMonth && sameYear
                ? {weekday: 'short', day: 'numeric'}
                : {weekday: 'short', day: 'numeric', month: 'short'}
        );
        const lastFmt = last.toLocaleString({weekday: 'short', day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric'});

        return `${firstFmt} – ${lastFmt}`;
    });

    function setViewDate(date: DateTime): void {
        const anchor = getAnchor(date, toValue(dayCount));
        isTransitioningToPast.value = unref(viewDate) > anchor;
        viewDate.value = anchor;
    }

    function next(): void {
        setViewDate(unref(viewDate).plus(stepDuration(toValue(dayCount))));
    }

    function previous(): void {
        setViewDate(unref(viewDate).minus(stepDuration(toValue(dayCount))));
    }

    return {
        isTransitioningToPast,
        viewDate,
        viewDates,
        rangeLabel,
        setViewDate,
        next,
        previous
    };
}
