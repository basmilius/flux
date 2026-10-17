import type {DateTime} from 'luxon';

export interface TimedEntry {
    id: string | number;
    date: DateTime;
    duration?: number;
    allDay?: boolean;
}
export function positionCalendarItems<T extends TimedEntry>(items: readonly T[], day: DateTime, hourRange: readonly [number, number], pixelsPerMinute: number, preview?: TimedEntry | null) {
    const matching = items.filter(item => !item.allDay).map(data => ({data, date: preview?.id === data.id ? preview.date : data.date, duration: (preview?.id === data.id ? preview.duration : data.duration) ?? 60})).filter(item => item.date.hasSame(day, 'day')).sort((a, b) => a.date.toMillis() - b.date.toMillis());
    const clusters: number[] = [];
    const lanes: number[] = [];
    const ends = new Map<number, number[]>();
    let cluster = -1;
    let clusterEnd = -Infinity;
    matching.forEach((item, index) => {
        const start = item.date.hour * 60 + item.date.minute;
        const end = start + item.duration;
        if (start >= clusterEnd) {cluster++; clusterEnd = end;} else clusterEnd = Math.max(clusterEnd, end);
        clusters[index] = cluster;
        const laneEnds = ends.get(cluster) ?? [];
        let lane = laneEnds.findIndex(value => value <= start);
        if (lane === -1) lane = laneEnds.length;
        laneEnds[lane] = end;
        ends.set(cluster, laneEnds);
        lanes[index] = lane;
    });
    const [from, to] = hourRange.map(hour => hour * 60);
    return matching.flatMap((item, index) => {
        const start = item.date.hour * 60 + item.date.minute;
        const end = start + item.duration;
        if (end <= from || start >= to) return [];
        const width = 100 / ends.get(clusters[index])!.length;
        return [{...item, top: (Math.max(start, from) - from) * pixelsPerMinute, height: Math.max(2, (Math.min(end, to) - Math.max(start, from)) * pixelsPerMinute), left: lanes[index] * width, width, clippedTop: start < from, clippedBottom: end > to}];
    });
}
