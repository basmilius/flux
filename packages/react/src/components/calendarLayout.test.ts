import {DateTime} from 'luxon';
import {describe, expect, it} from 'vitest';
import {positionCalendarItems} from './calendarLayout';
const day = DateTime.fromISO('2026-10-07');
const item = (id: number, hour: number, duration: number) => ({id, date: day.plus({hours: hour}), duration});
describe('calendar time grid', () => {
    it('shares lanes across connected overlap clusters and reuses available lanes', () => {
        const result = positionCalendarItems([item(1, 9, 120), item(2, 10, 120), item(3, 11, 120), item(4, 14, 60)], day, [8, 18], 1);
        expect(result.map(({left, width}) => [left, width])).toEqual([[0, 50], [50, 50], [0, 50], [0, 100]]);
    });
    it('crops events at the visible range and excludes all-day and other-day entries', () => {
        const result = positionCalendarItems([item(1, 7, 120), item(2, 17, 120), item(3, 6, 60), {...item(4, 9, 30), allDay: true}, {...item(5, 9, 30), date: day.plus({days: 1})}], day, [8, 18], .8);
        expect(result.map(({top, height, clippedTop, clippedBottom}) => [top, height, clippedTop, clippedBottom])).toEqual([[0, 48, true, false], [432, 48, false, true]]);
    });
    it('uses the resize preview without changing the registered event', () => {
        const event = item(1, 9, 60);
        const result = positionCalendarItems([event], day, [8, 18], .8, {...event, duration: 90});
        expect(result[0].height).toBe(72);
        expect(event.duration).toBe(60);
    });
});
