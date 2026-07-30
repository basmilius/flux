import { useRemembered } from '@basmilius/common';
import { DateTime } from 'luxon';
import type { Ref } from 'vue';

export default function <T>(key: string, initialValue: T): Ref<T> {
    return useRemembered<T>(key, initialValue, {
        prefix: 'flux/',
        deserialize: value => {
            const parsed = JSON.parse(value);

            return Array.isArray(parsed) && parsed[0] === 'DateTime' ? DateTime.fromISO(parsed[1]) : parsed;
        },
        serialize: value => JSON.stringify(DateTime.isDateTime(value) ? ['DateTime', value.toISO({
            includeOffset: true,
            extendedZone: true
        })] : value)
    });
}
