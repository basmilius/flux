import type { DateTime } from 'luxon';
import type { FluxTranslate } from '~flux/components/data';

/**
 * Writes a date range as the shortest label that still reads unambiguously,
 * dropping the parts both dates share. A range that spans more than one year
 * has nothing left to drop; it becomes "custom period" when a translate
 * function is given and the full range when it is not.
 */
export default function (start: DateTime, end: DateTime, translate?: FluxTranslate): string {
    if (start.day === end.day && start.month === end.month && start.year === end.year) {
        return start.toLocaleString({
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    if (start.month === end.month && start.year === end.year) {
        const startStr = start.toLocaleString({
            day: 'numeric'
        });

        const endStr = end.toLocaleString({
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `${startStr} – ${endStr}`;
    }

    if (start.year === end.year) {
        const startStr = start.toLocaleString({
            day: 'numeric',
            month: 'short'
        });

        const endStr = end.toLocaleString({
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `${startStr} – ${endStr}`;
    }

    if (translate) {
        return translate('flux.customPeriod');
    }

    const startStr = start.toLocaleString({
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const endStr = end.toLocaleString({
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return `${startStr} – ${endStr}`;
}
