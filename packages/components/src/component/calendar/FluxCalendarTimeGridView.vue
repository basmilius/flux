<template>
    <div
        :class="$style.timeGrid"
        :style="cssVars">
        <FluxWindowTransition :is-back="isTransitioningToPast">
            <div
                :key="viewKey"
                :class="$style.timeGridInner">
                <div :class="$style.timeGridHeader">
                    <div :class="$style.timeGridHeaderGutter"/>
                    <div :class="$style.timeGridHeaderDays">
                        <template v-for="d of viewDates" :key="d.toISODate()">
                            <div :class="clsx($style.timeGridHeaderDay, isToday(d) && $style.isToday)">
                                {{ formatDayHeader(d) }}
                            </div>
                        </template>
                    </div>
                </div>

                <div :class="$style.timeGridAllDay">
                    <div :class="$style.timeGridAllDayLabel">
                        {{ translate('flux.allDay') }}
                    </div>
                    <div :class="$style.timeGridAllDayDays">
                        <template v-for="d of viewDates" :key="d.toISODate()">
                            <div
                                :class="clsx(
                                    $style.timeGridAllDayCell,
                                    draggable && dropTargetAllDay === d.toSQLDate() && $style.isDropTarget
                                )"
                                @dragover="draggable ? onAllDayDragOver(d, $event) : undefined"
                                @dragleave="draggable ? onAllDayDragLeave(d) : undefined"
                                @drop="draggable ? onAllDayDrop(d, $event) : undefined">
                                <FluxCalendarItemDisplay
                                    v-for="item of getAllDayItems(d)"
                                    :key="item.id"
                                    :data="item"/>
                            </div>
                        </template>
                    </div>
                </div>

                <div :class="$style.timeGridBody">
                    <div :class="$style.timeGridHours">
                        <template v-for="hour of hours" :key="hour">
                            <div
                                :class="$style.timeGridHourLabel"
                                :style="{height: `${pixelsPerMinute * 60}px`}">
                                <span :class="$style.timeGridHourLabelText">{{ hourLabels.get(hour) }}</span>
                            </div>
                        </template>
                    </div>

                    <div :class="$style.timeGridDays">
                        <template v-for="d of viewDates" :key="d.toISODate()">
                            <div
                                :class="clsx(
                                    $style.timeGridDay,
                                    draggable && dropTargetDay === d.toSQLDate() && $style.isDropTarget
                                )"
                                :style="{height: `${totalHeight}px`}"
                                @dragover="draggable ? onColumnDragOver(d, $event) : undefined"
                                @dragleave="draggable ? onColumnDragLeave(d) : undefined"
                                @drop="draggable ? onColumnDrop(d, $event) : undefined">
                                <template v-for="positioned of getTimedItems(d)" :key="positioned.id">
                                    <div
                                        :class="clsx(
                                            $style.timeGridDayItem,
                                            positioned.clippedTop && $style.isClippedTop,
                                            positioned.clippedBottom && $style.isClippedBottom,
                                            resizeState && resizeState.id === positioned.id && $style.isResizing
                                        )"
                                        :style="{
                                            top: `${positioned.top}px`,
                                            height: `${positioned.height}px`,
                                            left: `${positioned.left}%`,
                                            width: `${positioned.width}%`
                                        }">
                                        <div :class="$style.timeGridDayItemBody">
                                            <FluxCalendarItemDisplay :data="positioned.data"/>

                                            <template v-if="draggable && !hasActiveDrag">
                                                <div
                                                    :class="clsx($style.timeGridDayItemHandle, $style.isTop)"
                                                    @mousedown="(evt) => onResizeStart(positioned, 'top', evt)"/>
                                                <div
                                                    :class="clsx($style.timeGridDayItemHandle, $style.isBottom)"
                                                    @mousedown="(evt) => onResizeStart(positioned, 'bottom', evt)"/>
                                            </template>
                                        </div>
                                    </div>
                                </template>

                                <div
                                    v-if="dropTargetDay === d.toSQLDate() && dropTargetMinutes !== null"
                                    :class="$style.timeGridDropIndicator"
                                    :style="{top: `${(dropTargetMinutes - hourRange[0] * 60) * pixelsPerMinute}px`}"/>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </FluxWindowTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, onBeforeUnmount, ref, unref } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import type { FluxCalendarItemData } from '~flux/components/data';
    import { FluxWindowTransition } from '~flux/components/transition';
    import FluxCalendarItemDisplay from './FluxCalendarItemDisplay.vue';
    import $style from '~flux/components/css/component/Calendar.module.scss';

    type Positioned = {
        readonly id: string | number;
        readonly data: FluxCalendarItemData;
        readonly date: DateTime;
        readonly duration: number;
        readonly top: number;
        readonly height: number;
        readonly left: number;
        readonly width: number;
        readonly clippedTop: boolean;
        readonly clippedBottom: boolean;
    };

    type ResizeState = {
        readonly id: string | number;
        readonly edge: 'top' | 'bottom';
        readonly originalDate: DateTime;
        readonly originalDuration: number;
        readonly startY: number;
    };

    const emit = defineEmits<{
        timeGridDrop: [DateTime];
        allDayDrop: [DateTime];
        resize: [{ id: string | number; fromDate: DateTime; toDate: DateTime; fromDuration: number; toDuration: number }];
    }>();

    const {
        viewDates,
        draggable,
        items,
        hasActiveDrag,
        hourRange,
        pixelsPerMinute,
        snapMinutes,
        dayCount
    } = defineProps<{
        readonly viewDates: DateTime[];
        readonly isTransitioningToPast: boolean;
        readonly draggable: boolean;
        readonly items: FluxCalendarItemData[];
        readonly hasActiveDrag: boolean;
        readonly hourRange: readonly [number, number];
        readonly pixelsPerMinute: number;
        readonly snapMinutes: number;
        readonly dayCount: 1 | 2 | 7;
    }>();

    const dropTargetDay = ref<string | null>(null);
    const dropTargetMinutes = ref<number | null>(null);
    const dropTargetAllDay = ref<string | null>(null);

    const resizeState = ref<ResizeState | null>(null);
    const resizePreview = ref<{ id: string | number; date: DateTime; duration: number } | null>(null);

    const translate = useTranslate();

    const hours = computed<number[]>(() => {
        const [from, to] = hourRange;
        const out: number[] = [];

        for (let h = from; h < to; ++h) {
            out.push(h);
        }

        return out;
    });

    const totalHeight = computed<number>(() =>
        (hourRange[1] - hourRange[0]) * 60 * pixelsPerMinute
    );

    const cssVars = computed(() => ({
        '--hour-height': `${pixelsPerMinute * 60}px`
    } as Record<string, string>));

    const viewKey = computed<string>(() => `${dayCount}-${viewDates[0].toISODate() ?? ''}`);

    // Precompute the positioned items per day so re-renders caused by drag-hover state
    // (dropTargetMinutes updates on every dragover) don't redo the lane layout for all columns.
    const timedItemsByDay = computed(() => {
        const map = new Map<string | null, Positioned[]>();

        for (const d of viewDates) {
            map.set(d.toSQLDate(), computeTimedItems(d));
        }

        return map;
    });

    // Precompute the all-day items per day, depending only on items + viewDates, so drag-hover
    // state changes (which update resizePreview / dropTargetMinutes) don't refilter every column.
    const allDayItemsByDay = computed(() => {
        const map = new Map<string | null, FluxCalendarItemData[]>();

        for (const d of viewDates) {
            const dStr = d.toSQLDate();
            map.set(dStr, items.filter(item => item.allDay && item.date.toSQLDate() === dStr));
        }

        return map;
    });

    const hourLabels = computed<Map<number, string>>(() => {
        const map = new Map<number, string>();

        for (const hour of unref(hours)) {
            map.set(hour, DateTime.fromObject({hour}).toFormat('HH:mm'));
        }

        return map;
    });

    function isToday(d: DateTime): boolean {
        return d.hasSame(DateTime.now(), 'day');
    }

    function formatDayHeader(d: DateTime): string {
        if (dayCount === 1) {
            return d.toLocaleString({weekday: 'long', day: 'numeric', month: 'long'});
        }

        if (dayCount === 2) {
            return d.toLocaleString({weekday: 'long', day: 'numeric', month: 'short'});
        }

        return d.toLocaleString({weekday: 'short', day: 'numeric'});
    }

    function getAllDayItems(d: DateTime): FluxCalendarItemData[] {
        return unref(allDayItemsByDay).get(d.toSQLDate()) ?? [];
    }

    function getTimedItems(d: DateTime): Positioned[] {
        return unref(timedItemsByDay).get(d.toSQLDate()) ?? [];
    }

    function computeTimedItems(d: DateTime): Positioned[] {
        const dStr = d.toSQLDate();
        const matching = items
            .map(item => {
                if (item.allDay) {
                    return null;
                }

                const preview = unref(resizePreview);
                const effectiveDate = preview && preview.id === item.id ? preview.date : item.date;
                const effectiveDuration = preview && preview.id === item.id ? preview.duration : (item.duration ?? 60);

                if (effectiveDate.toSQLDate() !== dStr) {
                    return null;
                }

                return {
                    id: item.id,
                    data: item,
                    date: effectiveDate,
                    duration: effectiveDuration
                };
            })
            .filter((entry): entry is { id: string | number; data: FluxCalendarItemData; date: DateTime; duration: number } => entry !== null)
            .sort((a, b) => a.date.toMillis() - b.date.toMillis());

        const lanes = assignLanes(matching);

        const [fromH, toH] = hourRange;
        const viewportStartMin = fromH * 60;
        const viewportEndMin = toH * 60;

        const out: Positioned[] = [];

        matching.forEach((m, idx) => {
            const start = m.date.hour * 60 + m.date.minute;
            const end = start + m.duration;

            if (end <= viewportStartMin || start >= viewportEndMin) {
                return;
            }

            const clampedStart = Math.max(start, viewportStartMin);
            const clampedEnd = Math.min(end, viewportEndMin);
            const top = (clampedStart - viewportStartMin) * pixelsPerMinute;
            const height = Math.max(2, (clampedEnd - clampedStart) * pixelsPerMinute);

            const {lane, totalLanes} = lanes[idx];
            const width = 100 / totalLanes;
            const left = lane * width;

            out.push({
                id: m.id,
                data: m.data,
                date: m.date,
                duration: m.duration,
                top,
                height,
                left,
                width,
                clippedTop: start < viewportStartMin,
                clippedBottom: end > viewportEndMin
            });
        });

        return out;
    }

    function assignLanes(matching: ReadonlyArray<{ readonly date: DateTime; readonly duration: number }>): { lane: number; totalLanes: number }[] {
        const intervals = matching.map(m => {
            const start = m.date.hour * 60 + m.date.minute;
            return {start, end: start + m.duration};
        });

        const clusters: number[] = [];
        let currentCluster = -1;
        let currentClusterEnd = -Infinity;

        for (let i = 0; i < intervals.length; ++i) {
            if (intervals[i].start >= currentClusterEnd) {
                ++currentCluster;
                currentClusterEnd = intervals[i].end;
            } else {
                currentClusterEnd = Math.max(currentClusterEnd, intervals[i].end);
            }

            clusters[i] = currentCluster;
        }

        const lanes: number[] = [];
        const clusterLaneEnds = new Map<number, number[]>();

        for (let i = 0; i < intervals.length; ++i) {
            const cid = clusters[i];

            if (!clusterLaneEnds.has(cid)) {
                clusterLaneEnds.set(cid, []);
            }

            const ends = clusterLaneEnds.get(cid)!;
            let assigned = -1;

            for (let li = 0; li < ends.length; ++li) {
                if (ends[li] <= intervals[i].start) {
                    assigned = li;
                    break;
                }
            }

            if (assigned === -1) {
                ends.push(intervals[i].end);
                assigned = ends.length - 1;
            } else {
                ends[assigned] = intervals[i].end;
            }

            lanes[i] = assigned;
        }

        const clusterTotal = new Map<number, number>();

        for (const [cid, ends] of clusterLaneEnds) {
            clusterTotal.set(cid, ends.length);
        }

        return intervals.map((_, i) => ({
            lane: lanes[i],
            totalLanes: clusterTotal.get(clusters[i])!
        }));
    }

    function snapToMinutes(minutes: number): number {
        return Math.round(minutes / snapMinutes) * snapMinutes;
    }

    function dateAtMinutes(d: DateTime, minutes: number): DateTime {
        return d.set({hour: Math.floor(minutes / 60), minute: minutes % 60, second: 0, millisecond: 0});
    }

    let cachedDropTarget: HTMLElement | null = null;
    let cachedDropRect: DOMRect | null = null;
    let scrollListenerElement: HTMLElement | null = null;

    function invalidateDropRect(): void {
        cachedDropRect = null;
    }

    function attachScrollListener(target: HTMLElement): void {
        const scrollContainer = target.closest<HTMLElement>(`.${$style.timeGridBody}`);

        if (scrollListenerElement === scrollContainer) {
            return;
        }

        detachScrollListener();

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', invalidateDropRect, {passive: true});
            scrollListenerElement = scrollContainer;
        }
    }

    function detachScrollListener(): void {
        if (scrollListenerElement) {
            scrollListenerElement.removeEventListener('scroll', invalidateDropRect);
            scrollListenerElement = null;
        }
    }

    function getDropTargetRect(target: HTMLElement, fresh: boolean = false): DOMRect {
        if (fresh || cachedDropTarget !== target || !cachedDropRect) {
            cachedDropTarget = target;
            cachedDropRect = target.getBoundingClientRect();
            attachScrollListener(target);
        }

        return cachedDropRect;
    }

    function clearDropTargetCache(): void {
        cachedDropTarget = null;
        cachedDropRect = null;
        detachScrollListener();
    }

    function calculateDropMinutes(evt: DragEvent, fresh: boolean = false): number | null {
        const target = evt.currentTarget as HTMLElement | null;

        if (!target) {
            return null;
        }

        const rect = getDropTargetRect(target, fresh);
        const offsetY = evt.clientY - rect.top;
        const minuteFromTop = offsetY / pixelsPerMinute;
        const absoluteMinute = hourRange[0] * 60 + minuteFromTop;
        const snapped = snapToMinutes(absoluteMinute);

        return Math.max(hourRange[0] * 60, Math.min(hourRange[1] * 60 - snapMinutes, snapped));
    }

    function onColumnDragOver(d: DateTime, evt: DragEvent): void {
        if (!hasActiveDrag) {
            return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = 'move';
        }

        dropTargetDay.value = d.toSQLDate();
        dropTargetMinutes.value = calculateDropMinutes(evt);
        dropTargetAllDay.value = null;
    }

    function onColumnDragLeave(d: DateTime): void {
        if (unref(dropTargetDay) === d.toSQLDate()) {
            dropTargetDay.value = null;
            dropTargetMinutes.value = null;
            clearDropTargetCache();
        }
    }

    function onColumnDrop(d: DateTime, evt: DragEvent): void {
        evt.preventDefault();

        const minutes = calculateDropMinutes(evt, true) ?? hourRange[0] * 60;
        const toDate = dateAtMinutes(d, minutes);
        emit('timeGridDrop', toDate);
        dropTargetDay.value = null;
        dropTargetMinutes.value = null;
        clearDropTargetCache();
    }

    function onAllDayDragOver(d: DateTime, evt: DragEvent): void {
        if (!hasActiveDrag) {
            return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = 'move';
        }

        dropTargetAllDay.value = d.toSQLDate();
        dropTargetDay.value = null;
        dropTargetMinutes.value = null;
    }

    function onAllDayDragLeave(d: DateTime): void {
        if (unref(dropTargetAllDay) === d.toSQLDate()) {
            dropTargetAllDay.value = null;
        }
    }

    function onAllDayDrop(d: DateTime, evt: DragEvent): void {
        evt.preventDefault();
        emit('allDayDrop', d.startOf('day'));
        dropTargetAllDay.value = null;
    }

    function onResizeStart(positioned: Positioned, edge: 'top' | 'bottom', evt: MouseEvent): void {
        if (positioned.id == null) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        resizeState.value = {
            id: positioned.id,
            edge,
            originalDate: positioned.date,
            originalDuration: positioned.duration,
            startY: evt.clientY
        };
        resizePreview.value = {
            id: positioned.id,
            date: positioned.date,
            duration: positioned.duration
        };

        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('mouseup', onResizeEnd);
    }

    function onResizeMove(evt: MouseEvent): void {
        const state = unref(resizeState);

        if (!state) {
            return;
        }

        const deltaY = evt.clientY - state.startY;
        const deltaMinutes = deltaY / pixelsPerMinute;
        const snappedDelta = snapToMinutes(deltaMinutes);

        const minDuration = snapMinutes;
        const rangeStartMin = hourRange[0] * 60;
        const rangeEndMin = hourRange[1] * 60;

        if (state.edge === 'bottom') {
            const newDuration = Math.max(minDuration, state.originalDuration + snappedDelta);
            const startMin = state.originalDate.hour * 60 + state.originalDate.minute;
            const clampedDuration = Math.min(newDuration, rangeEndMin - startMin);
            resizePreview.value = {
                id: state.id,
                date: state.originalDate,
                duration: clampedDuration
            };
        } else {
            // top edge: move start backwards (negative delta = earlier start)
            const originalStartMin = state.originalDate.hour * 60 + state.originalDate.minute;
            const originalEndMin = originalStartMin + state.originalDuration;
            let newStartMin = originalStartMin + snappedDelta;
            newStartMin = Math.max(rangeStartMin, Math.min(originalEndMin - minDuration, newStartMin));
            const newDuration = originalEndMin - newStartMin;
            const newDate = dateAtMinutes(state.originalDate, newStartMin);
            resizePreview.value = {
                id: state.id,
                date: newDate,
                duration: newDuration
            };
        }
    }

    function onResizeEnd(): void {
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', onResizeEnd);

        const state = unref(resizeState);
        const preview = unref(resizePreview);

        resizeState.value = null;
        resizePreview.value = null;

        if (!state || !preview) {
            return;
        }

        if (preview.date.toMillis() === state.originalDate.toMillis()
            && preview.duration === state.originalDuration) {
            return;
        }

        emit('resize', {
            id: state.id,
            fromDate: state.originalDate,
            toDate: preview.date,
            fromDuration: state.originalDuration,
            toDuration: preview.duration
        });
    }

    onBeforeUnmount(() => {
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', onResizeEnd);
        clearDropTargetCache();
    });
</script>
