<template>
    <div :class="$style.calendar">
        <FluxActionBar :class="$style.calendarActions">
            <template #primary>
                <div
                    :class="$style.calendarCurrent"
                    role="presentation">
                    <FluxFlyout :width="300">
                        <template #opener="{open}">
                            <button
                                :class="$style.calendarCurrentMonth"
                                type="button"
                                @click="open">
                                {{ viewMonth }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div :class="$styleDatePicker.datePickerMonths">
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
                                :class="$style.calendarCurrentYear"
                                type="button"
                                @click="open">
                                {{ viewYear }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div :class="$styleDatePicker.datePickerYears">
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

            <template #actionsEnd>
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
                            viewDate.month !== date.month && $style.isDisabled
                        )"
                        role="gridcell">
                        <div :class="$style.calendarEvents">
                            <VNodeRenderer
                                v-for="event of getEventsForDate(date)"
                                :class="clsx(
                                    event.type === 'single' && $style.isSingle,
                                    event.type === 'start' && $style.isStart,
                                    event.type === 'end' && $style.isEnd,
                                    event.type === 'middle' && $style.isMiddle
                                )"
                                :style="{
                                    gridRow: event.index
                                }"
                                :vnode="event.vnode"/>
                        </div>

                        <span :class="$style.calendarEntryDate">
                            {{ date.toLocaleString({day: 'numeric'}) }}
                        </span>
                    </div>
                </template>
            </div>
        </FluxWindowTransition>

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
    import { flattenVNodeTree, getComponentName, getComponentProps, useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { computed, unref, VNode, watch } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { FluxWindowTransition } from '@/transition';
    import { VNodeRenderer } from './primitive';
    import FluxActionBar from './FluxActionBar.vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxSpinner from '@/component/FluxSpinner.vue';
    import $style from '@/css/component/Calendar.module.scss';
    import $styleDatePicker from '@/css/component/DatePicker.module.scss';

    type Event = {
        readonly index: number;
        readonly type: 'start' | 'end' | 'middle' | 'single';
        readonly vnode: VNode;
    };

    const emit = defineEmits<{
        navigate: [DateTime, DateTime, DateTime];
    }>();

    const {
        initialDate = DateTime.now()
    } = defineProps<{
        readonly initialDate?: DateTime;
        readonly isLoading?: boolean;
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();

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
    } = useCalendar(initialDate, {
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

    const translate = useTranslate();

    const eventNodes = computed(() => flattenVNodeTree(slots.default?.() ?? []));
    const events = computed(() => unref(eventNodes)
        .filter(en => getComponentName(en) === 'FluxCalendarEvent'));

    function getEventsForDate(forDate: DateTime): Event[] {
        const forDateStr = forDate.toSQLDate();

        return unref(events)
            .map<Event | null>((vnode, index) => {
                const {date} = getComponentProps<{ date: DateTime | [DateTime, DateTime]; }>(vnode);

                if (Array.isArray(date)) {
                    if (forDate < date[0] || forDate > date[1]) {
                        return null;
                    }

                    return {
                        type: forDateStr === date[0].toSQLDate() ? 'start' : (forDateStr === date[1].toSQLDate() ? 'end' : 'middle'),
                        index,
                        vnode
                    };
                }

                if (forDateStr !== date.toSQLDate()) {
                    return null;
                }

                return {
                    type: 'single',
                    index,
                    vnode
                };
            })
            .filter(e => e !== null);
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

    watch(() => initialDate, setViewDate);
</script>
