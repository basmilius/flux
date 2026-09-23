import type { DateTime } from 'luxon';

/**
 * Writes a date range as the shortest label that still reads unambiguously. A range
 * spanning more than one year becomes the multi-year label, or the full range when
 * that label is omitted.
 */
export default function (start: DateTime, end: DateTime, multiYearLabel?: string): string {
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

    if (multiYearLabel) {
        return multiYearLabel;
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
