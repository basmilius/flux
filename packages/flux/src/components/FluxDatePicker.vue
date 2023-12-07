<template>
    <div class="flux-date-picker">
        <div class="flux-date-picker-header">
            <FluxFadeTransition>
                <FluxSecondaryButton
                    v-if="viewMode === 'date'"
                    :disabled="!isWithinBoundary(viewDatePrevious, 'month')"
                    icon-before="angle-left"
                    @click="previousMonth"/>
            </FluxFadeTransition>

            <div class="flux-date-picker-header-view">
                <button
                    type="button"
                    @click="setView('month')">
                    {{ viewMonth }}
                </button>

                <button
                    type="button"
                    @click="setView('year')">
                    {{ viewYear }}
                </button>
            </div>

            <FluxFadeTransition>
                <FluxSecondaryButton
                    v-if="viewMode === 'date'"
                    :disabled="!isWithinBoundary(viewDateNext, 'month')"
                    icon-before="angle-right"
                    @click="nextMonth"/>
            </FluxFadeTransition>
        </div>

        <FluxVerticalWindowTransition :is-back="viewMode === 'date'">
            <div
                v-if="viewMode === 'date'"
                key="date"
                class="flux-date-picker-dates">
                <FluxWindowTransition :is-back="isTransitioningToPast">
                    <div
                        :key="viewDate.month"
                        class="flux-date-picker-dates-grid">
                        <template
                            v-for="day of days"
                            :key="day">
                            <span class="flux-date-picker-day">{{ day }}</span>
                        </template>

                        <template
                            v-for="date of dates"
                            :key="date">
                            <button
                                class="flux-date-picker-date"
                                :class="{
                                    'is-disabled': isDisabled(date),
                                    'is-range-end': isWithinRange(date, 'end'),
                                    'is-range-entry': isWithinRange(date),
                                    'is-range-start': isWithinRange(date, 'start'),
                                    'is-selection-end': isWithinSelection(date, 'end'),
                                    'is-selection-entry': isWithinSelection(date),
                                    'is-selection-start': isWithinSelection(date, 'start'),
                                    'is-selected': isSelected(date)
                                }"
                                tabindex="-1"
                                type="button"
                                @click="setDate(date)"
                                @mouseover="onDateMouseOver(date)"
                                @mouseout="onDateMouseOut">
                                {{ date.toLocaleString({day: 'numeric'}) }}
                            </button>
                        </template>
                    </div>
                </FluxWindowTransition>
            </div>

            <div
                v-else-if="viewMode === 'month'"
                key="month"
                class="flux-date-picker-months">
                <template
                    v-for="month of months"
                    :key="month">
                    <FluxSecondaryButton
                        :disabled="!isWithinBoundary(month.date, 'month')"
                        :label="month.label"
                        tabindex="-1"
                        @click="setViewMonth(month.date)"/>
                </template>
            </div>

            <div
                v-else-if="viewMode === 'year'"
                key="year"
                class="flux-date-picker-years">
                <FluxSecondaryButton
                    icon-before="angle-left"
                    tabindex="-1"
                    @click="previousYears"/>

                <template
                    v-for="year of years"
                    :key="year">
                    <FluxSecondaryButton
                        :label="year.toString()"
                        tabindex="-1"
                        @click="setViewYear(year)"/>
                </template>

                <FluxSecondaryButton
                    icon-before="angle-right"
                    tabindex="-1"
                    @click="nextYears"/>
            </div>
        </FluxVerticalWindowTransition>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { computed, ref, toRefs, unref } from 'vue';
    import { useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher } from '@/composables';
    import { FluxFadeTransition, FluxVerticalWindowTransition, FluxWindowTransition } from '@/transition';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export interface Emits {
        (e: 'update:model-value', date: DateTime | DateTime[] | null): void;
    }

    export interface Props {
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly modelValue: (DateTime | object) | (DateTime | object)[] | null;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        modelValue: null
    });
    const {max, min, modelValue, rangeMode} = toRefs(props);

    const {
        isTransitioningToPast,
        viewDate,
        viewDateNext,
        viewDatePrevious,
        viewMonth,
        viewYear,
        dates,
        days,
        setViewDate,
        nextMonth,
        previousMonth
    } = useCalendar(getInitialDate());

    const {
        months
    } = useCalendarMonthSwitcher(viewDate, 'short');

    const {
        years,
        next: nextYears,
        previous: previousYears
    } = useCalendarYearSwitcher(viewDate);

    const selection = ref<[DateTime | null, DateTime | null]>([null, null]);
    const viewMode = ref<'date' | 'month' | 'year'>('date');

    const maxDate = computed(() => (unref(max) ?? DateTime.now().endOf('year').plus({year: 100})).startOf('day'));
    const minDate = computed(() => (unref(min) ?? DateTime.now().startOf('year').minus({year: 100})).startOf('day'));
    const normalizedSelection = computed(() => {
        const [start, end] = unref(selection);

        if (!start || !end) {
            return [start, end];
        }

        if (start > end) {
            return [end, start];
        } else {
            return [start, end];
        }
    });

    function getInitialDate(): DateTime {
        const value = unref(modelValue);
        let date: DateTime;

        if (!value) {
            date = DateTime.now();
        } else if (Array.isArray(value)) {
            date = value[1];
        } else {
            date = value as DateTime;
        }

        return date.startOf('day');
    }

    function isDisabled(date: DateTime): boolean {
        if (unref(viewDate).month !== date.month) {
            return true;
        }

        return !isWithinBoundary(date);
    }

    function isSelected(date: DateTime): boolean {
        if (unref(rangeMode)) {
            return false;
        }

        const value = unref(modelValue) as (DateTime | DateTime[]);

        if (!value || Array.isArray(value)) {
            return false;
        }

        return value.hasSame(date, 'day');
    }

    function isWithinBoundary(date: DateTime, unit?: 'month'): boolean {
        if (unit === 'month') {
            return unref(maxDate).endOf('month') >= date && unref(minDate).startOf('month') <= date;
        }

        return unref(maxDate) >= date && unref(minDate) <= date;
    }

    function isWithinRange(date: DateTime, edge?: 'start' | 'end'): boolean {
        if (!unref(rangeMode)) {
            return false;
        }

        const value = unref(modelValue);

        if (!value || !Array.isArray(value)) {
            return false;
        }

        if (edge) {
            const index = edge === 'start' ? 0 : 1;

            return value[index].hasSame(date, 'day');
        }

        return date >= value[0].startOf('day') && date <= value[1].startOf('day');
    }

    function isWithinSelection(date: DateTime, edge?: 'start' | 'end'): boolean {
        const [selectionStart, selectionEnd] = unref(normalizedSelection);

        if (!selectionStart || !selectionEnd) {
            return false;
        }

        if (edge) {
            return (edge === 'start' ? selectionStart : selectionEnd)?.hasSame(date, 'day');
        }

        return date >= selectionStart && date <= selectionEnd;
    }

    function setDate(date: DateTime): void {
        const mode = unref(rangeMode);

        switch (mode) {
            case 'range':
                const [start] = unref(selection);

                if (!start) {
                    selection.value = [date, date];
                } else {
                    if (date >= start) {
                        emit('update:model-value', [start, date]);
                    } else {
                        emit('update:model-value', [date, start]);
                    }

                    selection.value = [null, null];
                }
                break;

            case 'month':
                emit('update:model-value', [date.startOf('month'), date.endOf('month')]);
                break;

            case 'week':
                emit('update:model-value', [date.startOf('week'), date.endOf('week')]);
                break;

            default:
                emit('update:model-value', date);
                break;
        }
    }

    function setView(view: 'date' | 'month' | 'year'): void {
        viewMode.value = unref(viewMode) === view ? 'date' : view;
    }

    function setViewMonth(month: DateTime): void {
        setView('date');
        setViewDate(month);
    }

    function setViewYear(year: number): void {
        setView('date');
        setViewDate(unref(viewDate).set({year}));
    }

    function onDateMouseOver(date: DateTime): void {
        const mode = unref(rangeMode);

        if (!mode) {
            return;
        }

        switch (mode) {
            case 'range':
                selection.value = [selection.value[0], date];
                break;

            case 'month':
                selection.value = [date.startOf('month'), date.endOf('month')];
                break;

            case 'week':
                selection.value = [date.startOf('week'), date.endOf('week')];
                break;
        }
    }

    function onDateMouseOut(): void {
        const mode = unref(rangeMode);

        if (!mode || mode === 'range') {
            return;
        }

        selection.value = [null, null];
    }
</script>

<style lang="scss">
    .flux-date-picker {
        display: flex;
        max-height: 420px;
        flex-flow: column;
        border-radius: inherit;
        overflow: auto;
        user-select: none;
        z-index: 0;

        &-dates,
        &-months,
        &-years,
        &-header {
            padding: 15px;
        }

        &-header {
            position: sticky;
            display: flex;
            top: 0;
            align-items: center;
            background: rgb(var(--gray-1));
            border-bottom: 1px solid rgb(var(--gray-3));
            z-index: 1;

            &-view {
                display: flex;
                height: 42px;
                margin-left: auto;
                margin-right: auto;
                align-items: center;
                gap: 9px;
                font-size: 16px;
                font-weight: 600;

                button {
                    padding: 0;
                    background: unset;
                    border: 0;
                    cursor: pointer;
                    text-transform: capitalize;
                }

                button:first-child {
                    color: var(--foreground-prominent);
                }

                button:last-child {
                    color: var(--foreground-secondary);
                }

                button:hover {
                    color: rgb(var(--primary-7));
                }
            }
        }

        &-date {
            display: flex;
            padding: 0;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1;
            background: unset;
            border: 0;
            border-radius: var(--radius);
            color: var(--foreground-prominent);
            cursor: pointer;
            font-size: 14px;
            outline: 0;
            transition: 180ms var(--swift-out);
            transition-property: background, border-radius, color, opacity;

            &:hover {
                background: rgb(var(--gray-3));
            }

            &:not(.is-range-entry, .is-range-end, .is-range-start, .is-selection-entry, .is-selection-start, .is-selection-end).is-disabled {
                opacity: .25;
                pointer-events: none;
            }

            &:not(.is-disabled) {
                font-weight: 500;
            }

            &.is-selected {
                background: rgb(var(--primary-7));
                color: rgb(var(--primary-1));
                font-weight: 700;
            }

            &.is-range {
                &-entry {
                    background: rgb(var(--primary-3));
                    border-radius: 0;
                    color: rgb(var(--primary-11));
                }

                &-start,
                &-end {
                    background: rgb(var(--primary-7));
                    color: rgb(var(--primary-1));
                    font-weight: 700;
                }

                &-entry:nth-child(7n + 8),
                &-start {
                    border-top-left-radius: var(--radius);
                    border-bottom-left-radius: var(--radius);
                }

                &-entry:nth-child(7n),
                &-end {
                    border-top-right-radius: var(--radius);
                    border-bottom-right-radius: var(--radius);
                }
            }

            &.is-selection {
                &-entry {
                    background: rgb(var(--gray-3));
                    border-radius: 0;
                    color: var(--foreground-prominent);
                }

                &-start,
                &-end {
                    background: rgb(var(--gray-4));
                    font-weight: 700;
                }

                &-entry:nth-child(7n + 8),
                &-start {
                    border-top-left-radius: var(--radius);
                    border-bottom-left-radius: var(--radius);
                }

                &-entry:nth-child(7n),
                &-end {
                    border-top-right-radius: var(--radius);
                    border-bottom-right-radius: var(--radius);
                }
            }
        }

        &-dates {
            position: relative;

            &-grid {
                display: grid;
                gap: 3px 0;
                grid-template-columns: repeat(7, 1fr);
            }
        }

        &-day {
            margin-bottom: 6px;
            color: var(--foreground-secondary);
            font-size: 11px;
            font-weight: 500;
            text-align: center;
            text-transform: uppercase;
        }

        &-months,
        &-years {
            display: grid;
            margin-left: auto;
            margin-right: auto;
            max-width: 300px;
            width: 100%;
            gap: 9px;
            grid-template-columns: repeat(3, 1fr);

            .flux-secondary-button {
                contain: size layout;
                contain-intrinsic-size: 0 42px;
                content-visibility: auto;
                text-transform: capitalize;
            }
        }
    }
</style>
