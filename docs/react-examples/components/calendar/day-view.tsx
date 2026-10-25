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
    const today = DateTime.now().startOf('day');
    const events = [
        {
            id: 1,
            date: today,
            allDay: true,
            duration: 0,
            label: 'On call',
            color: 'warning' as Color
        },
        {
            id: 2,
            date: today.plus({ hours: 9 }),
            allDay: false,
            duration: 30,
            label: 'Stand-up',
            color: 'primary' as Color
        },
        {
            id: 3,
            date: today.plus({ hours: 10 }),
            allDay: false,
            duration: 90,
            label: 'Design review',
            color: 'info' as Color
        },
        {
            id: 4,
            date: today.plus({ hours: 13 }),
            allDay: false,
            duration: 60,
            label: 'Lunch',
            color: 'success' as Color
        },
        {
            id: 5,
            date: today.plus({ hours: 15 }),
            allDay: false,
            duration: 60,
            label: 'Pair session',
            color: 'primary' as Color
        },
        {
            id: 6,
            date: today.plus({ hours: 16, minutes: 30 }),
            allDay: false,
            duration: 30,
            label: 'Wrap up',
            color: 'info' as Color
        }
    ];
    function cardStyle(color: Color): string {
        return `padding: 4px 8px; background: var(--${color}-soft-hover); color: var(--${color}-text); border-radius: var(--radius-half); font-size: 12px; line-height: 1.2; height: 100%; box-sizing: border-box;`;
    }
    return (
        <>
            <FluxCalendar hourRange={[8, 18]} initialDate={today} view={'day'}>
                {events.map((event) => (
                    <FluxCalendarItem
                        key={event.id}
                        date={event.date}
                        duration={event.duration}
                        allDay={event.allDay}
                        id={event.id}
                    >
                        <div style={parseStyle(cardStyle(event.color))}>{event.label}</div>
                    </FluxCalendarItem>
                ))}
            </FluxCalendar>
        </>
    );
}
