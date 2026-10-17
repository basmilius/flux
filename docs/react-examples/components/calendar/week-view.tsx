import { type CSSProperties } from 'react';
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
    const anchorDate = DateTime.now().startOf('week').plus({ hours: 9 });
    const events = [
        { id: 1, date: anchorDate, duration: 30, label: 'Stand-up', color: 'primary' as Color },
        {
            id: 2,
            date: anchorDate.plus({ hours: 3 }),
            duration: 60,
            label: 'Lunch',
            color: 'warning' as Color
        },
        {
            id: 3,
            date: anchorDate.plus({ day: 1, hours: 1 }),
            duration: 120,
            label: 'Design review',
            color: 'info' as Color
        },
        {
            id: 4,
            date: anchorDate.plus({ day: 2, hours: 5 }),
            duration: 30,
            label: 'Demo',
            color: 'success' as Color
        },
        {
            id: 5,
            date: anchorDate.plus({ day: 3, hours: 2 }),
            duration: 90,
            label: 'Workshop',
            color: 'primary' as Color
        },
        {
            id: 6,
            date: anchorDate.plus({ day: 4, hours: 4 }),
            duration: 60,
            label: 'Retro',
            color: 'info' as Color
        }
    ];
    function cardStyle(color: Color): string {
        return `padding: 4px 8px; background: var(--${color}-soft-hover); color: var(--${color}-text); border-radius: var(--radius-half); font-size: 12px; line-height: 1.2; height: 100%; box-sizing: border-box;`;
    }
    return (
        <>
            <FluxCalendar hourRange={[7, 20]} initialDate={anchorDate} view={'week'}>
                {events.map((event) => (
                    <FluxCalendarItem
                        key={event.id}
                        date={event.date}
                        duration={event.duration}
                        id={event.id}
                    >
                        <div style={parseStyle(cardStyle(event.color))}>{event.label}</div>
                    </FluxCalendarItem>
                ))}
            </FluxCalendar>
        </>
    );
}
