import type { DateTime } from 'luxon';
import type { FluxTranslate } from '~flux/components/data';

/**
 * Writes a date range as the shortest label that still reads unambiguously. A range
 * spanning more than one year becomes "custom period", or the full range without a
 * translate function.
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
