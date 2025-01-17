import { DateTime } from 'luxon';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

export default function <T>(key: string, initialValue: T): Ref<T> {
    const realKey = `flux/${key}`;
    const value = ref<T>(get() ?? initialValue);

    function get(): T | null {
        if (realKey in localStorage) {
            let storageValue = JSON.parse(localStorage.getItem(realKey)!);

            if (Array.isArray(storageValue) && storageValue[0] === 'DateTime') {
                storageValue = DateTime.fromISO(storageValue[1]);
            }

            return storageValue;
        }

        return null;
    }

    watch(value, value => {
        let _value: T = value as T;

        if (DateTime.isDateTime(value)) {
            _value = ['DateTime', value.toISO({
                includeOffset: true,
                extendedZone: true
            })] as unknown as T;
        }

        localStorage.setItem(realKey, JSON.stringify(_value));
    });

    return value as Ref<T>;
}
