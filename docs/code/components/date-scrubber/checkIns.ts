import { DateTime } from 'luxon';

// Fixed seed and start date: the docs prerender, so the data must not depend on "now".
export function createCheckIns(count: number = 72): DateTime[] {
    let seed = 7;
    const random = (): number => {
        seed = (seed * 16807) % 2147483647;

        return seed / 2147483647;
    };

    const dates: DateTime[] = [];
    let date = DateTime.fromISO('2026-05-02T09:00');

    for (let i = 0; i < count; i++) {
        dates.push(date);
        date = random() < 0.25
            ? date.plus({hours: 2 + Math.floor(random() * 6)})
            : date.plus({days: 1 + Math.floor(random() * 3), hours: Math.floor(random() * 4)});
    }

    return dates;
}
