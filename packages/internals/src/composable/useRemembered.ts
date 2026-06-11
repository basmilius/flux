import { DateTime } from 'luxon';
import { ref, type Ref, watch } from 'vue';
import { isSSR } from '../util';

export default function <T>(key: string, initialValue: T): Ref<T> {
    if (isSSR) {
        return ref(initialValue) as Ref<T>;
    }

    const realKey = `flux/${key}`;
    const value = ref<T>(get() ?? initialValue);

    function get(): T | null {
        const storedValue = localStorage.getItem(realKey);

        if (storedValue === null) {
            return null;
        }

        try {
            let storageValue = JSON.parse(storedValue);

            if (Array.isArray(storageValue) && storageValue[0] === 'DateTime') {
                storageValue = DateTime.fromISO(storageValue[1]);
            }

            return storageValue;
        } catch {
            return null;
        }
    }

    watch(value, value => {
        let _value: T = value as T;

        if (DateTime.isDateTime(value)) {
            _value = ['DateTime', value.toISO({
                includeOffset: true,
                extendedZone: true
            })] as unknown as T;
        }

        try {
            localStorage.setItem(realKey, JSON.stringify(_value));
        } catch {
            // Storage can be unavailable or full (e.g. private browsing); remembering is best-effort.
        }
    });

    return value as Ref<T>;
}
