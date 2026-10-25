import { type CSSProperties, useState } from 'react';
import { FluxCalendar, FluxCalendarItem } from '@flux-ui/react';
import { DateTime } from 'luxon';
function parseStyle(value: CSSProperties | string | undefined): CSSProperties {
    if (typeof value !== 'string') return value ?? {};
    return Object.fromEntries(
        value
            .split(';')
            .filter((part) => part.includes(':'))
            .map((part) => {
                const colon = part.indexOf(':');
                const name = part.slice(0, colon).trim();
                return [
                    name.startsWith('--')
                        ? name
                        : name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
                    part.slice(colon + 1).trim()
                ];
            })
    );
}
export default function Example() {
    type Color = 'primary' | 'success' | 'warning' | 'info';
    type Event = {
        readonly id: number;
        date: DateTime;
        readonly label: string;
        readonly color: Color;
    };
    const anchorDate = DateTime.now().startOf('month').plus({ days: 9 });
    const [events, setEvents] = useState<Event[]>([
        { id: 1, date: anchorDate, label: 'Stand-up', color: 'primary' },
        { id: 2, date: anchorDate.plus({ days: 1 }), label: 'Design review', color: 'info' },
        { id: 3, date: anchorDate.plus({ days: 2 }), label: 'Sprint demo', color: 'success' },
        { id: 4, date: anchorDate.plus({ days: 3 }), label: 'Retrospective', color: 'warning' },
        { id: 5, date: anchorDate.plus({ days: 4 }), label: 'Release', color: 'success' },
        { id: 6, date: anchorDate.plus({ days: 7 }), label: 'Planning', color: 'primary' }
    ]);
    function onReschedule({ id, toDate }: { id: number | string; toDate: DateTime }): void {
        setEvents(events => events.map(event => event.id === id ? {...event, date: toDate} : event));
    }
    function cardStyle(color: Color): string {
        return `padding: 6px 9px; background: var(--${color}-soft-hover); color: var(--${color}-text); border-radius: var(--radius-half); font-size: 13px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
    }
    return (
        <>
            <FluxCalendar initialDate={anchorDate} draggable={true} onReschedule={onReschedule}>
                {events.map((event) => (
                    <FluxCalendarItem key={event.id} date={event.date} id={event.id}>
                        <div style={parseStyle(cardStyle(event.color))}>{event.label}</div>
                    </FluxCalendarItem>
                ))}
            </FluxCalendar>
        </>
    );
}
