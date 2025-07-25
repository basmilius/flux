<template>
    <div :class="$style.datePicker">
        <div :class="$style.datePickerHeader">
            <FluxFadeTransition>
                <FluxSecondaryButton
                    v-if="viewMode === 'date'"
                    :disabled="!isWithinBoundary(viewDatePrevious, 'month')"
                    icon-leading="angle-left"
                    :aria-label="translate('flux.previous')"
                    @click="previousMonth"/>
            </FluxFadeTransition>

            <div
                :class="$style.datePickerHeaderView"
                :id="id"
                aria-live="polite"
                role="presentation">
                <button
                    :class="$style.datePickerHeaderViewButton"
                    type="button"
                    @click="setView('month')">
                    {{ viewMonth }}
                </button>

                <button
                    :class="$style.datePickerHeaderViewButton"
                    type="button"
                    @click="setView('year')">
                    {{ viewYear }}
                </button>
            </div>

            <FluxFadeTransition>
                <FluxSecondaryButton
                    v-if="viewMode === 'date'"
                    :disabled="!isWithinBoundary(viewDateNext, 'month')"
                    icon-leading="angle-right"
                    :aria-label="translate('flux.next')"
                    @click="nextMonth"/>
            </FluxFadeTransition>
        </div>

        <FluxVerticalWindowTransition :is-back="viewMode === 'date'">
            <div
                v-if="viewMode === 'date'"
                key="date"
                :class="$style.datePickerDates"
                :aria-labelledby="id">
                <FluxWindowTransition :is-back="isTransitioningToPast">
                    <div
                        :key="viewDate.month"
                        :class="$style.datePickerDatesGrid">
                        <template
                            v-for="day of days"
                            :key="day">
                            <span :class="$style.datePickerDay">{{ day }}</span>
                        </template>

                        <template
                            v-for="date of dates"
                            :key="date">
                            <button
                                :class="clsx(
                                    $style.datePickerDate,
                                    isDisabled(date) && $style.isDisabled,
                                    isWithinRange(date, 'end') && $style.isRangeEnd,
                                    isWithinRange(date) && $style.isRangeEntry,
                                    isWithinRange(date, 'start') && $style.isRangeStart,
                                    isWithinSelection(date, 'end') && $style.isSelectionEnd,
                                    isWithinSelection(date) && $style.isSelectionEntry,
                                    isWithinSelection(date, 'start') && $style.isSelectionStart,
                                    isSelected(date) && $style.isSelected
                                )"
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
                :class="$style.datePickerMonths">
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
                :class="$style.datePickerYears">
                <FluxSecondaryButton
                    icon-leading="angle-left"
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
                    icon-leading="angle-right"
                    tabindex="-1"
                    @click="nextYears"/>
            </div>
        </FluxVerticalWindowTransition>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, ref, unref, useId, watch } from 'vue';
    import { useTranslate } from '$flux/composable/private';
    import { FluxFadeTransition, FluxVerticalWindowTransition, FluxWindowTransition } from '$flux/transition';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '$flux/css/component/DatePicker.module.scss';

    const modelValue = defineModel<DateTime | DateTime[] | null>({
        default: null,
        required: true
    });

    const {
        max,
        min,
        rangeMode
    } = defineProps<{
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }>();

    const id = useId();
    const translate = useTranslate();

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

    const maxDate = computed(() => (max ?? DateTime.now().endOf('year').plus({year: 100})).startOf('day'));
    const minDate = computed(() => (min ?? DateTime.now().startOf('year').minus({year: 100})).startOf('day'));
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

    watch(modelValue, () => {
        setViewDate(getInitialDate());
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
        if (rangeMode) {
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
        if (!rangeMode) {
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
        switch (rangeMode) {
            case 'range':
                const [start] = unref(selection);

                if (!start) {
                    selection.value = [date, date];
                } else {
                    if (date >= start) {
                        modelValue.value = [start, date];
                    } else {
                        modelValue.value = [date, start];
                    }

                    selection.value = [null, null];
                }
                break;

            case 'month':
                modelValue.value = [date.startOf('month'), date.endOf('month')];
                break;

            case 'week':
                modelValue.value = [date.startOf('week'), date.endOf('week')];
                break;

            default:
                modelValue.value = date;
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
        if (!rangeMode) {
            return;
        }

        switch (rangeMode) {
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
        if (!rangeMode || rangeMode === 'range') {
            return;
        }

        selection.value = [null, null];
    }
</script>
