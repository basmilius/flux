import type { DateTime } from 'luxon';
import type { FluxTranslator } from '@/composable/private';

export default function (translate: FluxTranslator, start: DateTime, end: DateTime, preventCustom: boolean = false): string {
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

    if (preventCustom) {
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

    return translate('flux.customPeriod');
}
