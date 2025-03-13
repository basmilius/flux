import type { DateTime } from 'luxon';
import type { Ref } from 'vue';
import { computed, unref } from 'vue';

export default function (currentDate: Ref<DateTime>, displayLength: 'short' | 'long'): UseCalendarMonthSwitcherReturn {
    const months = computed(() => {
        const months: MonthEntry[] = [];
        const now = unref(currentDate);
        let current = now.startOf('year');

        while (current.month <= 12 && current.year === now.year) {
            months.push({
                date: current,
                label: current.toLocaleString({month: displayLength})
            });
            current = current.plus({months: 1});
        }

        return months;
    });

    return {
        months
    };
}

type MonthEntry = {
    readonly date: DateTime;
    readonly label: string;
};

type UseCalendarMonthSwitcherReturn = {
    readonly months: Ref<MonthEntry[]>;
};
