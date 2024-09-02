<template>
    <div :class="styles.datePicker">
        <div :class="styles.datePickerHeader">
            <FluxFadeTransition>
                <FluxSecondaryButton
                    v-if="viewMode === 'date'"
                    :disabled="!isWithinBoundary(viewDatePrevious, 'month')"
                    icon-before="angle-left"
                    :aria-label="translate('flux.previous')"
                    @click="previousMonth"/>
            </FluxFadeTransition>

            <div
                :class="styles.datePickerHeaderView"
                :id="id"
                aria-live="polite"
                role="presentation">
                <button
                    :class="styles.datePickerHeaderViewButton"
                    type="button"
                    @click="setView('month')">
                    {{ viewMonth }}
                </button>

                <button
                    :class="styles.datePickerHeaderViewButton"
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
                    :aria-label="translate('flux.next')"
                    @click="nextMonth"/>
            </FluxFadeTransition>
        </div>

        <FluxVerticalWindowTransition :is-back="viewMode === 'date'">
            <div
                v-if="viewMode === 'date'"
                key="date"
                :class="styles.datePickerDates"
                :aria-labelledby="id">
                <FluxWindowTransition :is-back="isTransitioningToPast">
                    <div
                        :key="viewDate.month"
                        :class="styles.datePickerDatesGrid">
                        <template
                            v-for="day of days"
                            :key="day">
                            <span :class="styles.datePickerDay">{{ day }}</span>
                        </template>

                        <template
                            v-for="date of dates"
                            :key="date">
                            <button
                                :class="clsx(
                                    styles.datePickerDate,
                                    isDisabled(date) && styles.isDisabled,
                                    isWithinRange(date, 'end') && styles.isRangeEnd,
                                    isWithinRange(date) && styles.isRangeEntry,
                                    isWithinRange(date, 'start') && styles.isRangeStart,
                                    isWithinSelection(date, 'end') && styles.isSelectionEnd,
                                    isWithinSelection(date) && styles.isSelectionEntry,
                                    isWithinSelection(date, 'start') && styles.isSelectionStart,
                                    isSelected(date) && styles.isSelected
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
                :class="styles.datePickerMonths">
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
                :class="styles.datePickerYears">
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

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, ref, toRefs, unref } from 'vue';
    import { useId } from '@/composable';
    import { useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher, useTranslate } from '@/composable/private';
    import { FluxFadeTransition, FluxVerticalWindowTransition, FluxWindowTransition } from '@/transition';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import styles from '@/css/component/DatePicker.module.scss';

    export type Props = {
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly rangeMode?: 'range' | 'week' | 'month';
    };

    const modelValue = defineModel<DateTime | DateTime[] | null>({default: null});
    const props = defineProps<Props>();
    const {max, min, rangeMode} = toRefs(props);

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
