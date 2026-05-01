<template>
    <div
        ref="root"
        :class="$style.calendar">
        <FluxActionBar :class="$style.calendarActions">
            <template #primary>
                <div
                    :class="$style.calendarCurrent"
                    role="presentation">
                    <template v-if="resolvedView === 'month'">
                        <FluxFlyout :width="300">
                            <template #opener="{open}">
                                <button
                                    :class="$style.calendarCurrentMonth"
                                    :aria-label="translate('flux.selectMonth')"
                                    type="button"
                                    @click="open">
                                    {{ monthViewMonth }}
                                </button>
                            </template>

                            <template #default="{close}">
                                <div :class="$styleDatePicker.datePickerMonths">
                                    <template
                                        v-for="month of months"
                                        :key="month.label">
                                        <FluxSecondaryButton
                                            :label="month.label"
                                            tabindex="-1"
                                            @click="setMonthViewMonth(month.date, close)"/>
                                    </template>
                                </div>
                            </template>
                        </FluxFlyout>

                        <FluxFlyout :width="300">
                            <template #opener="{open}">
                                <button
                                    :class="$style.calendarCurrentYear"
                                    :aria-label="translate('flux.selectYear')"
                                    type="button"
                                    @click="open">
                                    {{ monthViewYear }}
                                </button>
                            </template>

                            <template #default="{close}">
                                <div :class="$styleDatePicker.datePickerYears">
                                    <FluxSecondaryButton
                                        :aria-label="translate('flux.previousYears')"
                                        icon-leading="angle-left"
                                        tabindex="-1"
                                        @click="previousYears"/>

                                    <template
                                        v-for="year of years"
                                        :key="year">
                                        <FluxSecondaryButton
                                            :label="year.toString()"
                                            tabindex="-1"
                                            @click="setMonthViewYear(year, close)"/>
                                    </template>

                                    <FluxSecondaryButton
                                        :aria-label="translate('flux.nextYears')"
                                        icon-leading="angle-right"
                                        tabindex="-1"
                                        @click="nextYears"/>
                                </div>
                            </template>
                        </FluxFlyout>
                    </template>

                    <template v-else>
                        <FluxFlyout :width="320">
                            <template #opener="{open}">
                                <button
                                    :class="$style.calendarRangeLabel"
                                    :aria-label="translate('flux.selectDate')"
                                    type="button"
                                    @click="open">
                                    {{ rangeLabel }}
                                </button>
                            </template>

                            <template #default="{close}">
                                <FluxDatePicker
                                    :model-value="datePickerValue"
                                    @update:model-value="(value) => onDatePicked(value, close)"/>
                            </template>
                        </FluxFlyout>
                    </template>
                </div>
            </template>

            <template #actionsEnd>
                <FluxSecondaryButton
                    :aria-label="translate('flux.today')"
                    :label="translate('flux.today')"
                    @click="setToday"/>

                <FluxButtonGroup>
                    <FluxSecondaryButton
                        :aria-label="translate('flux.previous')"
                        icon-leading="angle-left"
                        @click="navigatePrevious"
                        @dragenter="onNavDragEnter('previous')"
                        @dragover="onNavDragOver"
                        @dragleave="onNavDragLeave"/>

                    <FluxSecondaryButton
                        :aria-label="translate('flux.next')"
                        icon-leading="angle-right"
                        @click="navigateNext"
                        @dragenter="onNavDragEnter('next')"
                        @dragover="onNavDragOver"
                        @dragleave="onNavDragLeave"/>
                </FluxButtonGroup>
            </template>
        </FluxActionBar>

        <FluxCalendarMonthView
            v-if="resolvedView === 'month'"
            :dates="monthDates"
            :days="monthDays"
            :view-date="monthViewDate"
            :is-transitioning-to-past="monthIsTransitioningToPast"
            :draggable="draggable"
            :items="items"
            :has-active-drag="dragState !== null"
            :focused-date="monthFocusedDate"
            @cell-drop="onMonthCellDrop"/>

        <FluxCalendarTimeGridView
            v-else
            :view-dates="timeGridViewDates"
            :is-transitioning-to-past="timeGridIsTransitioningToPast"
            :draggable="draggable"
            :items="items"
            :has-active-drag="dragState !== null"
            :hour-range="effectiveHourRange"
            :pixels-per-minute="pixelsPerMinute"
            :snap-minutes="SNAP_MINUTES"
            :day-count="timeGridDayCount"
            @time-grid-drop="onTimeGridDrop"
            @all-day-drop="onAllDayDrop"
            @resize="onResize"/>

        <div
            v-if="isLoading"
            :class="$style.calendarLoader">
            <FluxSpinner/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import {
        defaultKeyboardGrabAnnounce,
        flattenVNodeTree,
        getComponentName,
        useCalendar,
        useCalendarMonthSwitcher,
        useCalendarTimeGrid,
        useCalendarYearSwitcher
    } from '@flux-ui/internals';
    import { DateTime } from 'luxon';
    import { computed, onBeforeUnmount, onMounted, provide, ref, unref, type VNode, watch } from 'vue';
    import useBreakpoints from '$flux/composable/useBreakpoints';
    import { useTranslate } from '$flux/composable/private';
    import type { FluxCalendarKeyboardDirection, FluxCalendarView } from '$flux/data/di';
    import { FluxCalendarInjectionKey } from '$flux/data';
    import FluxCalendarMonthView from './calendar/FluxCalendarMonthView.vue';
    import FluxCalendarTimeGridView from './calendar/FluxCalendarTimeGridView.vue';
    import FluxActionBar from './FluxActionBar.vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Calendar.module.scss';
    import $styleDatePicker from '$flux/css/component/DatePicker.module.scss';

    const SNAP_MINUTES = 30;
    const NAV_HOVER_INITIAL_DELAY_MS = 700;
    const NAV_HOVER_REPEAT_DELAY_MS = 450;

    const MONTH_KEY_DELTAS = {
        left: {day: -1},
        right: {day: 1},
        up: {day: -7},
        down: {day: 7}
    } as const;

    const TIME_GRID_KEY_DELTAS = {
        left: {day: -1},
        right: {day: 1},
        up: {minute: -SNAP_MINUTES},
        down: {minute: SNAP_MINUTES}
    } as const;

    const emit = defineEmits<{
        navigate: [DateTime, DateTime, DateTime];
        reschedule: [{ id: string | number; fromDate: DateTime; toDate: DateTime }];
        resize: [{ id: string | number; fromDate: DateTime; toDate: DateTime; fromDuration: number; toDuration: number }];
        dragStart: [{ id: string | number; fromDate: DateTime }];
        dragEnd: [{ id: string | number }];
        keyboardGrab: [{ id: string | number; fromDate: DateTime }];
        keyboardCancel: [{ id: string | number }];
    }>();

    const {
        initialDate = DateTime.now(),
        draggable = false,
        view,
        hourRange = [0, 24],
        pixelsPerMinute = 0.8
    } = defineProps<{
        readonly initialDate?: DateTime;
        readonly isLoading?: boolean;
        readonly draggable?: boolean;
        readonly view?: FluxCalendarView;
        readonly hourRange?: readonly [number, number];
        readonly pixelsPerMinute?: number;
    }>();

    const slots = defineSlots<{
        default?(): VNode[];
    }>();

    const translate = useTranslate();
    const {md, lg, xl} = useBreakpoints();

    const effectiveHourRange = computed<readonly [number, number]>(() => {
        const [from, to] = hourRange;

        if (from < 0 || to > 24 || from >= to) {
            if (import.meta.env.DEV) {
                console.warn(`[FluxCalendar] Invalid hourRange [${from}, ${to}], falling back to [0, 24].`);
            }

            return [0, 24] as const;
        }

        return [from, to] as const;
    });

    const resolvedView = computed<FluxCalendarView>(() => {
        if (view) {
            return view;
        }

        if (xl.value) {
            return 'month';
        }

        if (lg.value) {
            return 'week';
        }

        if (md.value) {
            return 'two-days';
        }

        return 'day';
    });

    const timeGridDayCount = computed<1 | 2 | 7>(() => {
        const v = unref(resolvedView);

        if (v === 'week') {
            return 7;
        }

        if (v === 'two-days') {
            return 2;
        }

        return 1;
    });

    // Top-level destructure for template auto-unwrap.
    const {
        isTransitioningToPast: monthIsTransitioningToPast,
        viewDate: monthViewDate,
        viewMonth: monthViewMonth,
        viewYear: monthViewYear,
        dates: monthDates,
        days: monthDays,
        setViewDate: setMonthViewDateRaw,
        nextMonth: nextMonthRaw,
        previousMonth: previousMonthRaw
    } = useCalendar(initialDate, {weekDayLength: 'long'});

    const {months} = useCalendarMonthSwitcher(monthViewDate, 'short');

    const {
        years,
        next: nextYears,
        previous: previousYears
    } = useCalendarYearSwitcher(monthViewDate);

    const {
        isTransitioningToPast: timeGridIsTransitioningToPast,
        viewDate: timeGridViewDate,
        viewDates: timeGridViewDates,
        rangeLabel: timeGridRangeLabel,
        setViewDate: setTimeGridViewDate,
        next: nextTimeGrid,
        previous: previousTimeGrid
    } = useCalendarTimeGrid(initialDate, timeGridDayCount);

    // Items uit slot.
    const items = computed<VNode[]>(() => {
        const flat = flattenVNodeTree(slots.default?.() ?? []);
        return flat.filter(en => getComponentName(en) === 'FluxCalendarItem');
    });

    // Drag-state.
    const root = ref<HTMLDivElement | null>(null);
    const dragState = ref<{ readonly id: string | number; readonly fromDate: DateTime } | null>(null);
    const grabbedId = ref<string | number | null>(null);
    const monthFocusedDate = ref<DateTime | null>(null);
    const itemRegistry = new WeakMap<Element, { readonly id: string | number }>();
    const itemElementsById = new Map<string | number, Element>();
    let navHoverTimer: ReturnType<typeof setTimeout> | null = null;

    function restoreItemFocus(id: string | number): void {
        requestAnimationFrame(() => {
            const elm = itemElementsById.get(id);

            if (elm instanceof HTMLElement) {
                elm.focus();
            }
        });
    }

    // Range label voor time-grid views.
    const rangeLabel = computed<string>(() => unref(timeGridRangeLabel));

    // Date-picker model voor flyout.
    const datePickerValue = computed<DateTime | null>(() => unref(timeGridViewDate));

    provide(FluxCalendarInjectionKey, {
        isDraggable: computed(() => draggable),
        resolvedView,
        hourRange: effectiveHourRange,
        pixelsPerMinute: computed(() => pixelsPerMinute),
        snapMinutes: computed(() => SNAP_MINUTES),
        grabbedId,

        registerItem(element, id) {
            itemRegistry.set(element, {id});
            itemElementsById.set(id, element);
        },

        unregisterItem(element) {
            const info = itemRegistry.get(element);

            if (info) {
                itemElementsById.delete(info.id);
            }

            itemRegistry.delete(element);
        },

        onItemDragStart(id, fromDate, evt) {
            dragState.value = {id, fromDate};

            if (evt.dataTransfer) {
                evt.dataTransfer.effectAllowed = 'move';
                evt.dataTransfer.setData('text/plain', String(id));
            }

            emit('dragStart', {id, fromDate});
        },

        onItemDragEnd(id) {
            if (dragState.value?.id !== id) {
                return;
            }

            dragState.value = null;
            cancelNavHoverTimer();
            emit('dragEnd', {id});
        },

        onItemKeyboardGrab(id, fromDate) {
            grabbedId.value = id;
            monthFocusedDate.value = unref(resolvedView) === 'month' ? fromDate.startOf('day') : null;
            emit('keyboardGrab', {id, fromDate});
            defaultKeyboardGrabAnnounce(translate('flux.grabbedAnnounce'));
        },

        onItemKeyboardMove(direction) {
            handleKeyboardMove(direction);
        },

        onItemKeyboardCommit() {
            commitKeyboardGrab();
        },

        onItemKeyboardCancel() {
            cancelKeyboardGrab();
        }
    });

    function onDatePicked(value: DateTime | DateTime[] | null, close: () => void): void {
        if (!value || Array.isArray(value)) {
            return;
        }

        if (unref(resolvedView) === 'month') {
            setMonthViewDateRaw(value);
        } else {
            setTimeGridViewDate(value);
        }

        close();
    }

    function setMonthViewMonth(month: DateTime, close: () => void): void {
        close();
        setMonthViewDateRaw(month);
    }

    function setMonthViewYear(year: number, close: () => void): void {
        close();
        setMonthViewDateRaw(unref(monthViewDate).set({year}));
    }

    function setToday(): void {
        const now = DateTime.now();

        if (unref(resolvedView) === 'month') {
            setMonthViewDateRaw(now);
        } else {
            setTimeGridViewDate(now);
        }
    }

    function navigateNext(): void {
        if (unref(resolvedView) === 'month') {
            nextMonthRaw();
        } else {
            nextTimeGrid();
        }
    }

    function navigatePrevious(): void {
        if (unref(resolvedView) === 'month') {
            previousMonthRaw();
        } else {
            previousTimeGrid();
        }
    }

    // Drop handlers naar reschedule-event.
    function onMonthCellDrop(toDate: DateTime): void {
        const drag = unref(dragState);

        if (!drag) {
            return;
        }

        emit('reschedule', {id: drag.id, fromDate: drag.fromDate, toDate});
        dragState.value = null;
        cancelNavHoverTimer();
    }

    function onTimeGridDrop(toDate: DateTime): void {
        const drag = unref(dragState);

        if (!drag) {
            return;
        }

        emit('reschedule', {id: drag.id, fromDate: drag.fromDate, toDate});
        dragState.value = null;
        cancelNavHoverTimer();
    }

    function onAllDayDrop(toDate: DateTime): void {
        const drag = unref(dragState);

        if (!drag) {
            return;
        }

        emit('reschedule', {id: drag.id, fromDate: drag.fromDate, toDate});
        dragState.value = null;
        cancelNavHoverTimer();
    }

    function onResize(payload: { id: string | number; fromDate: DateTime; toDate: DateTime; fromDuration: number; toDuration: number }): void {
        emit('resize', payload);
    }

    // Keyboard-grab routing.
    function findItemDate(id: string | number): DateTime | null {
        const item = unref(items).find(vn => {
            const props = (vn.props ?? {}) as { id?: string | number };
            return props.id === id;
        });

        if (!item) {
            return null;
        }

        const props = (item.props ?? {}) as { date?: DateTime };
        return props.date ?? null;
    }

    function handleKeyboardMove(direction: FluxCalendarKeyboardDirection): void {
        const id = unref(grabbedId);

        if (id == null) {
            return;
        }

        const currentDate = findItemDate(id);

        if (!currentDate) {
            return;
        }

        const v = unref(resolvedView);
        const delta = (v === 'month' ? MONTH_KEY_DELTAS : TIME_GRID_KEY_DELTAS)[direction];
        const newDate = currentDate.plus(delta);

        emit('reschedule', {id, fromDate: currentDate, toDate: newDate});

        if (v === 'month') {
            monthFocusedDate.value = newDate.startOf('day');

            if (newDate.month !== unref(monthViewDate).month) {
                setMonthViewDateRaw(newDate);
            }
        } else {
            const dates = unref(timeGridViewDates);
            const newSql = newDate.toSQLDate();
            const firstSql = dates[0]?.toSQLDate();
            const lastSql = dates[dates.length - 1]?.toSQLDate();

            if (firstSql && lastSql && newSql && (newSql < firstSql || newSql > lastSql)) {
                setTimeGridViewDate(newDate);
            }
        }

        restoreItemFocus(id);
    }

    function commitKeyboardGrab(): void {
        const id = unref(grabbedId);

        if (id == null) {
            return;
        }

        grabbedId.value = null;
        monthFocusedDate.value = null;
        defaultKeyboardGrabAnnounce(translate('flux.releasedAnnounce'));
    }

    function cancelKeyboardGrab(): void {
        const id = unref(grabbedId);

        if (id == null) {
            return;
        }

        grabbedId.value = null;
        monthFocusedDate.value = null;
        emit('keyboardCancel', {id});
        defaultKeyboardGrabAnnounce(translate('flux.releasedAnnounce'));
    }

    // Cancel keyboard-grab when view changes mid-grab.
    watch(resolvedView, () => {
        if (unref(grabbedId) !== null) {
            cancelKeyboardGrab();
        }
    });

    // Nav-hover (auto-advance during drag).
    function onNavDragEnter(direction: 'previous' | 'next'): void {
        if (!unref(dragState)) {
            return;
        }

        cancelNavHoverTimer();
        scheduleNavHoverTick(direction, NAV_HOVER_INITIAL_DELAY_MS);
    }

    function scheduleNavHoverTick(direction: 'previous' | 'next', delay: number): void {
        navHoverTimer = setTimeout(() => {
            if (direction === 'next') {
                navigateNext();
            } else {
                navigatePrevious();
            }

            scheduleNavHoverTick(direction, NAV_HOVER_REPEAT_DELAY_MS);
        }, delay);
    }

    function onNavDragOver(evt: DragEvent): void {
        if (!unref(dragState)) {
            return;
        }

        evt.preventDefault();

        if (evt.dataTransfer) {
            evt.dataTransfer.dropEffect = 'move';
        }
    }

    function onNavDragLeave(evt: DragEvent): void {
        const currentTarget = evt.currentTarget as HTMLElement | null;
        const relatedTarget = evt.relatedTarget as Node | null;

        if (currentTarget && relatedTarget && currentTarget.contains(relatedTarget)) {
            return;
        }

        cancelNavHoverTimer();
    }

    function cancelNavHoverTimer(): void {
        if (navHoverTimer !== null) {
            clearTimeout(navHoverTimer);
            navHoverTimer = null;
        }
    }

    function onDocumentDragEnd(): void {
        const drag = unref(dragState);

        if (!drag) {
            return;
        }

        dragState.value = null;
        cancelNavHoverTimer();
        emit('dragEnd', {id: drag.id});
    }

    onMounted(() => {
        document.addEventListener('dragend', onDocumentDragEnd);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('dragend', onDocumentDragEnd);
        cancelNavHoverTimer();
    });

    // Navigate-event aggregation.
    watch([
        () => unref(resolvedView),
        () => unref(monthViewDate),
        () => unref(timeGridViewDates)
    ], () => {
        if (unref(resolvedView) === 'month') {
            const dates = unref(monthDates);
            emit('navigate', unref(monthViewDate), dates[0], dates[dates.length - 1]);
        } else {
            const dates = unref(timeGridViewDates);
            emit('navigate', unref(timeGridViewDate), dates[0], dates[dates.length - 1]);
        }
    }, {immediate: true});

    watch(() => initialDate, (d) => {
        setMonthViewDateRaw(d);
        setTimeGridViewDate(d);
    });
</script>
