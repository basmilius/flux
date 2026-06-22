import { computed } from 'vue';
import type { DayMetric, Id, Period } from '@/types';
import { db } from './state';
import { useUiStore } from './useUiStore';

export type Totals = {
    visitors: number;
    newVisitors: number;
    returningVisitors: number;
    sessions: number;
    pageviews: number;
    conversions: number;
    revenue: number;
    bounceRate: number;
    avgDuration: number;
    conversionRate: number;
    pagesPerSession: number;
};

function periodDays(period: Period): number {
    return period === '7d' ? 7 : period === '28d' ? 28 : 90;
}

function totalsFor(rows: DayMetric[]): Totals {
    let visitors = 0, newVisitors = 0, sessions = 0, pageviews = 0, bounces = 0, durationSeconds = 0, conversions = 0, revenue = 0;

    for (const row of rows) {
        visitors += row.visitors;
        newVisitors += row.newVisitors;
        sessions += row.sessions;
        pageviews += row.pageviews;
        bounces += row.bounces;
        durationSeconds += row.durationSeconds;
        conversions += row.conversions;
        revenue += row.revenue;
    }

    return {
        visitors,
        newVisitors,
        returningVisitors: Math.max(0, visitors - newVisitors),
        sessions,
        pageviews,
        conversions,
        revenue,
        bounceRate: sessions ? bounces / sessions : 0,
        avgDuration: sessions ? durationSeconds / sessions : 0,
        conversionRate: sessions ? conversions / sessions : 0,
        pagesPerSession: sessions ? pageviews / sessions : 0
    };
}

export function useAnalyticsStore() {
    const ui = useUiStore();

    const days = computed(() => periodDays(ui.period.value));
    const metrics = computed(() => db.metrics);
    const current = computed(() => metrics.value.slice(-days.value));
    const previous = computed(() => metrics.value.slice(-days.value * 2, -days.value));
    const totals = computed(() => totalsFor(current.value));
    const previousTotals = computed(() => totalsFor(previous.value));

    const labels = computed(() => current.value.map(metric => metric.date.toFormat('LLL d')));
    const periodLabel = computed(() => `Last ${days.value} days`);

    // Per-channel aggregates restricted to the active period (with the period's
    // daily slice for stacked / time-series charts).
    const channelPeriod = computed(() => db.channels
        .map(channel => {
            const periodDaily = channel.daily.slice(-days.value);
            return {
                ...channel,
                periodDaily,
                periodSessions: periodDaily.reduce((acc, value) => acc + value, 0)
            };
        })
        .sort((a, b) => b.periodSessions - a.periodSessions));

    const unreadAlerts = computed(() => db.alerts.filter(alert => !alert.read).length);

    function markAlertRead(id: Id, read = true): void {
        const alert = db.alerts.find(entry => entry.id === id);
        if (alert) {
            alert.read = read;
        }
    }

    function markAllAlertsRead(): void {
        for (const alert of db.alerts) {
            alert.read = true;
        }
    }

    return {
        period: ui.period,
        days,
        metrics,
        current,
        previous,
        totals,
        previousTotals,
        labels,
        periodLabel,
        channelPeriod,
        channels: computed(() => db.channels),
        pages: computed(() => db.pages),
        referrers: computed(() => db.referrers),
        campaigns: computed(() => db.campaigns),
        devices: computed(() => db.devices),
        browsers: computed(() => db.browsers),
        operatingSystems: computed(() => db.operatingSystems),
        languages: computed(() => db.languages),
        ageGroups: computed(() => db.ageGroups),
        genders: computed(() => db.genders),
        countries: computed(() => db.countries),
        events: computed(() => db.events),
        searchTerms: computed(() => db.searchTerms),
        goals: computed(() => db.goals),
        funnel: computed(() => db.funnel),
        heatmap: computed(() => db.heatmap),
        eventLog: computed(() => db.eventLog),
        alerts: computed(() => db.alerts),
        account: computed(() => db.account),
        unreadAlerts,
        markAlertRead,
        markAllAlertsRead
    };
}
