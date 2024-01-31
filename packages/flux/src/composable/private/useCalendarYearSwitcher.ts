import { DateTime } from 'luxon';
import { computed, ComputedRef, ref, Ref, unref, watch } from 'vue';

export default function (currentDate: Ref<DateTime>, limit: number = 10): UseCalendarYearSwitcher {
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

interface UseCalendarYearSwitcher {
    readonly years: ComputedRef<number[]>;

    next(): void;

    previous(): void;
}
