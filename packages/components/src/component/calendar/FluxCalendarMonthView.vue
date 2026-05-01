<template>
    <FluxWindowTransition :is-back="isTransitioningToPast">
        <div
            :key="viewDate.month"
            :class="$style.calendarCells"
            role="grid">
            <template v-for="day of days">
                <div :class="$style.calendarDay">
                    {{ day }}
                </div>
            </template>

            <template v-for="date of dates">
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
                        <VNodeRenderer
                            v-for="event of getItemsForDate(date)"
                            :key="event.key"
                            :vnode="event.vnode"/>
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
    import { getComponentProps } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, ref, unref, type VNode } from 'vue';
    import { FluxWindowTransition } from '$flux/transition';
    import { VNodeRenderer } from '../primitive';
    import $style from '$flux/css/component/Calendar.module.scss';

    type ItemEntry = { readonly key: string | number; readonly vnode: VNode };
    type ItemProps = { date: DateTime; id?: string | number };

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
        readonly items: VNode[];
        readonly hasActiveDrag: boolean;
        readonly focusedDate?: DateTime | null;
    }>();

    const dropTargetDate = ref<string | null>(null);

    function isToday(date: DateTime): boolean {
        return date.hasSame(DateTime.now(), 'day');
    }

    const itemsByDate = computed(() => {
        const map = new Map<string, ItemEntry[]>();

        items.forEach((vnode, index) => {
            const props = getComponentProps<ItemProps>(vnode);
            const dateKey = props.date.toSQLDate();

            if (!dateKey) {
                return;
            }

            const key = props.id ?? (vnode.key as string | number | null) ?? index;
            const entry: ItemEntry = {key, vnode};
            const list = map.get(dateKey);

            if (list) {
                list.push(entry);
            } else {
                map.set(dateKey, [entry]);
            }
        });

        return map;
    });

    function getItemsForDate(forDate: DateTime): ItemEntry[] {
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
