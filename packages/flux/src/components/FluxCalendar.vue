<template>
    <FluxPane
        class="flux-calendar"
        :is-loading="isLoading">
        <FluxActionBar class="flux-calendar-actions">
            <template #primary>
                <div class="flux-calendar-current">
                    <FluxFlyout :width="300">
                        <template #opener="{open}">
                            <button
                                class="flux-calendar-current-month"
                                type="button"
                                @click="open">
                                {{ viewMonth }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div class="flux-date-picker-months">
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
                                class="flux-calendar-current-year"
                                type="button"
                                @click="open">
                                {{ viewYear }}
                            </button>
                        </template>

                        <template #default="{close}">
                            <div class="flux-date-picker-years">
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
                    :label="translate('flux_today')"
                    @click="setToday"/>

                <FluxSecondaryButton
                    icon-before="angle-left"
                    @click="previousMonth"/>

                <FluxSecondaryButton
                    icon-before="angle-right"
                    @click="nextMonth"/>
            </template>
        </FluxActionBar>

        <FluxWindowTransition :is-back="isTransitioningToPast">
            <div
                :key="viewDate.month"
                class="flux-calendar-cells">
                <template v-for="day of days">
                    <div class="flux-calendar-day">
                        {{ day }}
                    </div>
                </template>

                <template v-for="date of dates">
                    <div
                        class="flux-calendar-cell"
                        :class="{
                            'is-disabled': viewDate.month !== date.month
                        }">
                        <div class="flux-calendar-events">
                            <template v-for="event of getEventsForDate(date)">
                                <VNodeRenderer :vnode="event"/>
                            </template>
                        </div>

                        <span class="flux-calendar-cell-date">
                            {{ date.toLocaleString({day: 'numeric'}) }}
                        </span>
                    </div>
                </template>
            </div>
        </FluxWindowTransition>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { computed, unref, VNode, watch } from 'vue-demi';
    import { useCalendar, useCalendarMonthSwitcher, useCalendarYearSwitcher, useSlotVNodes, useTranslate } from '@/composables';
    import { FluxWindowTransition } from '@/transition';
    import { getNormalizedComponentName, getNormalizedComponentProps } from '@/utils';
    import { VNodeRenderer } from './primitive';
    import FluxActionBar from './FluxActionBar.vue';
    import FluxFlyout from '@/components/FluxFlyout.vue';
    import FluxPane from './FluxPane.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export interface Emits {
        (e: 'navigate', viewDate: DateTime, visibleFromDate: DateTime, visibleToDate: DateTime): void;
    }

    export interface Props {
        readonly initialDate?: DateTime;
        readonly isLoading?: boolean;
    }

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

    const eventNodes = useSlotVNodes();
    const translate = useTranslate();

    const events = computed(() => unref(eventNodes)
        .filter(en => getNormalizedComponentName(en) === 'flux-calendar-event'));

    function getEventsForDate(date: DateTime): VNode[] {
        return unref(events)
            .filter(e => date.toSQLDate() === getNormalizedComponentProps<{ date: DateTime; }>(e).date.toSQLDate());
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

<style lang="scss">
    .flux-calendar {
        &-actions {
            align-items: center;
        }

        &-current {
            display: flex;
            gap: 9px;

            &-month,
            &-year {
                padding: 0;
                background: none;
                border: 0;
                cursor: pointer;
                font-size: 30px;
                letter-spacing: -.05em;
                line-height: 1.5em;
                text-transform: capitalize;

                &:hover {
                    color: rgb(var(--primary-7));
                }
            }

            &-month {
                color: var(--foreground-prominent);
                font-weight: 700;
            }

            &-year {
                color: var(--foreground);
            }
        }

        &-cell,
        &-day {
            padding: 12px 21px;
            background: rgb(var(--gray-0));
        }

        &-cell {
            position: relative;
            min-height: 105px;
            padding-bottom: 39px;

            &s {
                display: grid;
                gap: 1px;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: auto repeat(6, auto);
                background: rgb(var(--gray-3));
            }

            &-date {
                position: absolute;
                right: 21px;
                bottom: 15px;
                color: var(--foreground);
                font-size: 15px;
                font-weight: 700;
                line-height: 1em;
            }

            &.is-disabled {
                background: rgb(var(--gray-1));
                color: var(--foreground-secondary);
                pointer-events: none;
            }

            &.is-disabled &-date {
                opacity: .5;
            }

            &.is-disabled .flux-calendar-events {
                opacity: .75;
                pointer-events: none;
            }
        }

        &-day {
            padding-left: 0;
            padding-right: 0;
            color: var(--foreground-secondary);
            font-size: 10px;
            line-height: 1em;
            text-align: center;
            text-transform: uppercase;
        }

        &-events {
            display: flex;
            flex-flow: column;
            gap: 3px;
        }
    }
</style>
