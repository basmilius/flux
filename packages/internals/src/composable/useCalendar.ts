import type { DateTime } from 'luxon';
import { computed, type Ref, ref, unref } from 'vue';

export default function (initialDate: DateTime, options?: UseCalendarOptions): UseCalendarReturn {
    const isTransitioningToPast = ref(false);
    const viewDate = ref(initialDate);

    const dates = computed<DateTime[]>(() => {
        const dates: DateTime[] = [];
        const month = unref(viewDate).month;
        let current = unref(viewDate).startOf('month');

        do {
            dates.push(current);
            current = current.plus({day: 1});
        } while (current.month === month);

        const first = dates[0];
        const last = dates[dates.length - 1];

        for (let i = 1; i < first.weekday; ++i) {
            dates.unshift(first.minus({day: i}));
        }

        for (let i = last.weekday + 1; i <= 7; ++i) {
            dates.push(last.plus({day: i - last.weekday}));
        }

        while (dates.length / 7 < 6) {
            const last = dates[dates.length - 1];

            for (let i = 1; i <= 7; ++i) {
                dates.push(last.plus({day: i}));
            }
        }

        return dates;
    });

    const days = computed(() => unref(dates)
        .slice(0, 7)
        .map(d => d.toLocaleString({weekday: options?.weekDayLength ?? 'short'})));

    const viewDateNext = computed(() => unref(viewDate).plus({month: 1}));
    const viewDatePrevious = computed(() => unref(viewDate).minus({month: 1}));
    const viewMonth = computed(() => unref(viewDate).toLocaleString({month: options?.monthLength ?? 'long'}));
    const viewYear = computed(() => unref(viewDate).year.toString());

    function setViewDate(date: DateTime): void {
        isTransitioningToPast.value = viewDate.value > date;
        viewDate.value = date;
    }

    function nextMonth(): void {
        setViewDate(unref(viewDate).plus({month: 1}));
    }

    function previousMonth(): void {
        setViewDate(unref(viewDate).minus({month: 1}));
    }

    return {
        isTransitioningToPast,
        viewDate,
        viewDateNext,
        viewDatePrevious,
        viewMonth,
        viewYear,
        dates,
        days,
        setViewDate,
        nextMonth,
        previousMonth
    };
}

type UseCalendarOptions = {
    readonly monthLength?: 'short' | 'long';
    readonly weekDayLength?: 'short' | 'long';
};

type UseCalendarReturn = {
    readonly isTransitioningToPast: Ref<boolean>;
    readonly viewDate: Ref<DateTime>;
    readonly viewDateNext: Ref<DateTime>;
    readonly viewDatePrevious: Ref<DateTime>;
    readonly viewMonth: Ref<string>;
    readonly viewYear: Ref<string>;
    readonly dates: Ref<DateTime[]>;
    readonly days: Ref<string[]>;

    setViewDate(date: DateTime): void;
    nextMonth(): void;
    previousMonth(): void;
};
