<template>
    <FluxWindowTransition :is-back="isTransitioningToPast">
        <div
            :key="viewDate.month"
            :class="$style.calendarCells"
            role="grid">
            <template
                v-for="day of days"
                :key="day">
                <div :class="$style.calendarDay">
                    {{ day }}
                </div>
            </template>

            <template
                v-for="date of dates"
                :key="date.toSQLDate()">
                <div
                    :class="clsx(
                        $style.calendarEntry,
                        viewDate.month !== date.month && $style.isDisabled,
                        isToday(date) && $style.isToday,
                        focusedDate && date.toSQLDate() === focusedDate.toSQLDate() && $style.isFocused,
                        draggable && dropTargetDate === date.toSQLDate() && $style.isDropTarget
                    )"
                    role="gridcell"
                    @dragover="draggable ? onCellDragOver(date, $event) : undefined"
                    @dragleave="draggable ? onCellDragLeave(date) : undefined"
                    @drop="draggable ? onCellDrop(date, $event) : undefined">
                    <div :class="$style.calendarEvents">
                        <FluxCalendarItemDisplay
                            v-for="item of getItemsForDate(date)"
                            :key="item.id"
                            :data="item"/>
                    </div>

                    <span :class="$style.calendarEntryDate">
                        {{ date.toLocaleString({day: 'numeric'}) }}
                    </span>
                </div>
            </template>
        </div>
    </FluxWindowTransition>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, ref, unref } from 'vue';
    import type { FluxCalendarItemData } from '~flux/components/data';
    import { FluxWindowTransition } from '~flux/components/transition';
    import FluxCalendarItemDisplay from './FluxCalendarItemDisplay.vue';
    import $style from '~flux/components/css/component/Calendar.module.scss';

    const emit = defineEmits<{
        cellDrop: [DateTime];
    }>();

    const {
        dates,
        days,
        viewDate,
        draggable,
        items,
        hasActiveDrag,
        focusedDate
    } = defineProps<{
        readonly dates: DateTime[];
        readonly days: string[];
        readonly viewDate: DateTime;
        readonly isTransitioningToPast: boolean;
        readonly draggable: boolean;
        readonly items: FluxCalendarItemData[];
        readonly hasActiveDrag: boolean;
        readonly focusedDate?: DateTime | null;
    }>();

    const dropTargetDate = ref<string | null>(null);

    const itemsByDate = computed(() => {
        const map = new Map<string, FluxCalendarItemData[]>();

        items.forEach(item => {
            const dateKey = item.date.toSQLDate();

            if (!dateKey) {
                return;
            }

            const list = map.get(dateKey);

            if (list) {
                list.push(item);
            } else {
                map.set(dateKey, [item]);
            }
        });

        return map;
    });

    function isToday(date: DateTime): boolean {
        return date.hasSame(DateTime.now(), 'day');
    }

    function getItemsForDate(forDate: DateTime): FluxCalendarItemData[] {
        const key = forDate.toSQLDate();
        return key ? unref(itemsByDate).get(key) ?? [] : [];
    }

    function onCellDragOver(date: DateTime, evt: DragEvent): void {
        if (!hasActiveDrag) {
            return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = 'move';
        }

        dropTargetDate.value = date.toSQLDate();
    }

    function onCellDragLeave(date: DateTime): void {
        if (unref(dropTargetDate) === date.toSQLDate()) {
            dropTargetDate.value = null;
        }
    }

    function onCellDrop(date: DateTime, evt: DragEvent): void {
        evt.preventDefault();
        emit('cellDrop', date.startOf('day'));
        dropTargetDate.value = null;
    }
</script>
