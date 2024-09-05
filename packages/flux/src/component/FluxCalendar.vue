<template>
    <div :class="styles.calendar">
        <FluxActionBar :class="styles.calendarActions">
            <template #primary>
                <div
                    :class="styles.calendarCurrent"
                    role="presentation">
                    <FluxFlyout :width="300">
                        <template #opener="{open}">
                            <button
                                :class="styles.calendarCurrentMonth"
                                type="button"
                                @click="open">
                                {{ viewMonth }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div :class="datePickerStyles.datePickerMonths">
                                <template
                                    v-for="month of months"
                                    :key="month">
                                    <FluxSecondaryButton
                                        :label="month.label"
                                        tabindex="-1"
                                        @click="setViewMonth(month.date, close)"/>
                                </template>
                            </div>
                        </template>
                    </FluxFlyout>

                    <FluxFlyout :width="300">
                        <template #opener="{open}">
                            <button
                                :class="styles.calendarCurrentYear"
                                type="button"
                                @click="open">
                                {{ viewYear }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div :class="datePickerStyles.datePickerYears">
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
                                        @click="setViewYear(year, close)"/>
                                </template>

                                <FluxSecondaryButton
                                    icon-before="angle-right"
                                    tabindex="-1"
                                    @click="nextYears"/>
                            </div>
                        </template>
                    </FluxFlyout>
                </div>
            </template>

            <template #actions-end>
                <FluxSecondaryButton
                    :label="translate('flux.today')"
                    @click="setToday"/>

                <FluxButtonGroup>
                    <FluxSecondaryButton
                        icon-before="angle-left"
                        @click="previousMonth"/>

                    <FluxSecondaryButton
                        icon-before="angle-right"
                        @click="nextMonth"/>
                </FluxButtonGroup>
            </template>
        </FluxActionBar>

        <FluxWindowTransition :is-back="isTransitioningToPast">
            <div
                :key="viewDate.month"
                :class="styles.calendarCells"
                role="grid">
                <template v-for="day of days">
                    <div :class="styles.calendarDay">
                        {{ day }}
                    </div>
                </template>

                <template v-for="date of dates">
                    <div
                        :class="clsx(
                            styles.calendarEntry,
                            viewDate.month !== date.month && styles.isDisabled
                        )"
                        role="gridcell">
                        <div :class="styles.calendarEvents">
                            <template v-for="event of getEventsForDate(date)">
                                <VNodeRenderer :vnode="event"/>
                            </template>
                        </div>

                        <span :class="styles.calendarEntryDate">
                            {{ date.toLocaleString({day: 'numeric'}) }}
                        </span>
                    </div>
                </template>
            </div>
        </FluxWindowTransition>

        <div
            v-if="isLoading"
            :class="styles.calendarLoader">
            <FluxSpinner/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, unref, useSlots, VNode, watch } from 'vue';
    import { useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher, useTranslate } from '@/composable/private';
    import { FluxWindowTransition } from '@/transition';
    import { flattenVNodeTree, getComponentName, getComponentProps } from '@/util';
    import { VNodeRenderer } from './primitive';
    import FluxActionBar from './FluxActionBar.vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpinner from '@/component/FluxSpinner.vue';
    import styles from '@/css/component/Calendar.module.scss';
    import datePickerStyles from '@/css/component/DatePicker.module.scss';

    export type Emits = {
        navigate: [DateTime, DateTime, DateTime];
    };

    export type Props = {
        readonly initialDate?: DateTime;
        readonly isLoading?: boolean;
    };

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        initialDate: () => DateTime.now()
    });

    const {
        isTransitioningToPast,
        viewDate,
        viewMonth,
        viewYear,
        dates,
        days,
        nextMonth,
        previousMonth,
        setViewDate
    } = useCalendar(props.initialDate, {
        weekDayLength: 'long'
    });

    const {
        months
    } = useCalendarMonthSwitcher(viewDate, 'short');

    const {
        years,
        next: nextYears,
        previous: previousYears
    } = useCalendarYearSwitcher(viewDate);

    const slots = useSlots();
    const translate = useTranslate();

    const eventNodes = computed(() => flattenVNodeTree(slots.default?.() ?? []));
    const events = computed(() => unref(eventNodes)
        .filter(en => getComponentName(en) === 'FluxCalendarEvent'));

    function getEventsForDate(date: DateTime): VNode[] {
        return unref(events)
            .filter(e => date.toSQLDate() === getComponentProps<{ date: DateTime; }>(e).date.toSQLDate());
    }

    function setToday(): void {
        setViewDate(DateTime.now());
    }

    function setViewMonth(month: DateTime, close: () => void): void {
        close();
        setViewDate(month);
    }

    function setViewYear(year: number, close: () => void): void {
        close();
        setViewDate(unref(viewDate).set({year}));
    }

    watch([viewDate, dates], ([viewDate, dates]) => {
        emit('navigate', viewDate, dates[0], dates[dates.length - 1]);
    }, {immediate: true});

    watch(() => props.initialDate, setViewDate);
</script>
