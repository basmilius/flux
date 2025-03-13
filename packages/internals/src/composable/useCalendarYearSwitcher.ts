import type { DateTime } from 'luxon';
import type { Ref } from 'vue';
import { computed, ref, unref, watch } from 'vue';

export default function (currentDate: Ref<DateTime>, limit: number = 10): UseCalendarYearSwitcherReturn {
    const index = ref(0);

    const years = computed(() => {
        const year = unref(currentDate).year;
        const years: number[] = [];
        const start = year - (year % limit) + unref(index) * limit;

        for (let i = 0; i < limit; ++i) {
            years.push(start + i);
        }

        return years;
    });

    function next(): void {
        ++index.value;
    }

    function previous(): void {
        --index.value;
    }

    watch(currentDate, () => index.value = 0);

    return {
        years,
        next,
        previous
    };
}

type UseCalendarYearSwitcherReturn = {
    readonly years: Ref<number[]>;

    next(): void;
    previous(): void;
};
