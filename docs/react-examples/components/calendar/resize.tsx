import {useState, type CSSProperties} from 'react';
import {FluxCalendar, FluxCalendarItem} from '@flux-ui/react';
import {DateTime} from 'luxon';

export default function Example() {
    const [anchorDate] = useState(() => DateTime.now().startOf('day'));
    const [events, setEvents] = useState<Array<{id: number; date: DateTime; duration: number; label: string; color: string}>>([
        {id: 1, date: anchorDate.plus({hours: 9}), duration: 60, label: 'Stand-up', color: 'primary'},
        {id: 2, date: anchorDate.plus({hours: 11}), duration: 90, label: 'Design review', color: 'info'},
        {id: 3, date: anchorDate.plus({hours: 14}), duration: 30, label: 'Demo', color: 'success'}
    ]);
    return <FluxCalendar initialDate={anchorDate} hourRange={[8, 18]} view="day" draggable
        onReschedule={({id, toDate}) => setEvents(events => events.map(event => event.id === id ? {...event, date: toDate} : event))}
        onResize={({id, toDate, toDuration}) => setEvents(events => events.map(event => event.id === id ? {...event, date: toDate, duration: toDuration} : event))}>
        {events.map(event => <FluxCalendarItem key={event.id} date={event.date} duration={event.duration} id={event.id}>
            <div style={{padding: '4px 8px', background: `var(--${event.color}-soft-hover)`, color: `var(--${event.color}-text)`, borderRadius: 'var(--radius-half)', fontSize: 12, lineHeight: 1.2, height: '100%', boxSizing: 'border-box'} as CSSProperties}>{event.label} · {event.duration}m</div>
        </FluxCalendarItem>)}
    </FluxCalendar>;
}
