import { DateTime } from 'luxon';
import { computed, Ref, unref } from 'vue-demi';

export function useCalendarMonthSwitcher(currentDate: Ref<DateTime>, displayLength: 'short' | 'long'): UseCalendarMonthSwitcher {
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

interface UseCalendarMonthSwitcher {
    readonly months: Ref<MonthEntry[]>;
}

interface MonthEntry {
    readonly date: DateTime;
    readonly label: string;
}
