import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import type { Account, Alert, AlertType, Campaign, CampaignStatus, Channel, ChannelStat, CountryStat, DayMetric, DeviceStat, DeviceType, EventLogRow, EventName, EventStat, FunnelStep, Goal, GoalType, HeatCell, NameCount, PageStat, ReferrerStat } from '@/types';

const NOW = DateTime.now().startOf('hour');
const TODAY = NOW.startOf('day');
const SERIES_DAYS = 180;

const CHANNELS: Channel[] = ['organic', 'direct', 'paid', 'social', 'referral', 'email'];
const CHANNEL_WEIGHTS: Record<Channel, number> = {
    organic: 0.34,
    direct: 0.23,
    paid: 0.16,
    social: 0.13,
    referral: 0.08,
    email: 0.06
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PAGE_DEFS: { path: string; title: string; section: string; weight: number }[] = [
    {path: '/', title: 'Home', section: 'Marketing', weight: 100},
    {path: '/pricing', title: 'Pricing', section: 'Marketing', weight: 46},
    {path: '/features', title: 'Features', section: 'Marketing', weight: 38},
    {path: '/blog', title: 'Blog index', section: 'Content', weight: 31},
    {path: '/blog/product-analytics-guide', title: 'The product analytics guide', section: 'Content', weight: 27},
    {path: '/blog/dashboard-design', title: 'Dashboard design tips', section: 'Content', weight: 22},
    {path: '/docs/getting-started', title: 'Getting started', section: 'Docs', weight: 24},
    {path: '/docs/api', title: 'API reference', section: 'Docs', weight: 19},
    {path: '/integrations', title: 'Integrations', section: 'Marketing', weight: 17},
    {path: '/customers', title: 'Customer stories', section: 'Marketing', weight: 14},
    {path: '/signup', title: 'Sign up', section: 'Conversion', weight: 21},
    {path: '/demo', title: 'Book a demo', section: 'Conversion', weight: 12},
    {path: '/login', title: 'Log in', section: 'App', weight: 26},
    {path: '/dashboard', title: 'App dashboard', section: 'App', weight: 33},
    {path: '/changelog', title: 'Changelog', section: 'Content', weight: 9},
    {path: '/about', title: 'About us', section: 'Company', weight: 7},
    {path: '/contact', title: 'Contact', section: 'Company', weight: 6},
    {path: '/careers', title: 'Careers', section: 'Company', weight: 8},
    {path: '/checkout', title: 'Checkout', section: 'Conversion', weight: 6},
    {path: '/blog/scaling-saas', title: 'Scaling a SaaS startup', section: 'Content', weight: 11}
];

const REFERRER_DEFS: { domain: string; channel: Channel }[] = [
    {domain: 'google.com', channel: 'organic'},
    {domain: 'bing.com', channel: 'organic'},
    {domain: 'duckduckgo.com', channel: 'organic'},
    {domain: 'twitter.com', channel: 'social'},
    {domain: 'linkedin.com', channel: 'social'},
    {domain: 'facebook.com', channel: 'social'},
    {domain: 'reddit.com', channel: 'social'},
    {domain: 'youtube.com', channel: 'social'},
    {domain: 'producthunt.com', channel: 'referral'},
    {domain: 'news.ycombinator.com', channel: 'referral'},
    {domain: 'github.com', channel: 'referral'},
    {domain: 'medium.com', channel: 'referral'},
    {domain: 'dev.to', channel: 'referral'}
];

const CAMPAIGN_DEFS: { name: string; source: string; medium: string }[] = [
    {name: 'Spring Launch', source: 'google', medium: 'cpc'},
    {name: 'Brand Awareness', source: 'facebook', medium: 'cpc'},
    {name: 'Retargeting Q2', source: 'google', medium: 'display'},
    {name: 'LinkedIn Leads', source: 'linkedin', medium: 'cpc'},
    {name: 'June Newsletter', source: 'newsletter', medium: 'email'},
    {name: 'Product Hunt Day', source: 'producthunt', medium: 'referral'},
    {name: 'YouTube Pre-roll', source: 'youtube', medium: 'video'},
    {name: 'Reddit Ads', source: 'reddit', medium: 'cpc'},
    {name: 'Webinar Promo', source: 'twitter', medium: 'social'},
    {name: 'Affiliate Push', source: 'partners', medium: 'affiliate'},
    {name: 'Holiday Sale', source: 'google', medium: 'cpc'},
    {name: 'Docs SEO', source: 'google', medium: 'organic'}
];

const COUNTRY_DEFS: { name: string; code: string; weight: number }[] = [
    {name: 'United States', code: 'US', weight: 100},
    {name: 'United Kingdom', code: 'GB', weight: 34},
    {name: 'Germany', code: 'DE', weight: 28},
    {name: 'India', code: 'IN', weight: 26},
    {name: 'Canada', code: 'CA', weight: 21},
    {name: 'France', code: 'FR', weight: 18},
    {name: 'Netherlands', code: 'NL', weight: 16},
    {name: 'Australia', code: 'AU', weight: 14},
    {name: 'Brazil', code: 'BR', weight: 13},
    {name: 'Spain', code: 'ES', weight: 11},
    {name: 'Japan', code: 'JP', weight: 9},
    {name: 'Sweden', code: 'SE', weight: 7}
];

const SEARCH_TERMS: string[] = [
    'pricing', 'api docs', 'export to csv', 'funnel report', 'integrations',
    'slack integration', 'retention cohort', 'dashboard templates', 'gdpr',
    'self hosting', 'team seats', 'sso saml', 'webhooks', 'data residency'
];

function weightedList<T extends { weight: number }>(defs: T[], total: number): number[] {
    const sum = defs.reduce((acc, def) => acc + def.weight, 0);
    return defs.map(def => Math.round((def.weight / sum) * total * faker.number.float({min: 0.92, max: 1.08})));
}

function makeMetrics(): DayMetric[] {
    const start = TODAY.minus({days: SERIES_DAYS - 1});
    const result: DayMetric[] = [];

    for (let index = 0; index < SERIES_DAYS; index++) {
        const date = start.plus({days: index});
        const weekend = date.weekday === 6 || date.weekday === 7;
        const growth = 1 + (index / SERIES_DAYS) * 0.55;
        const seasonal = weekend ? 0.7 : (date.weekday === 2 || date.weekday === 3 ? 1.08 : 1);
        const noise = faker.number.float({min: 0.86, max: 1.14});

        const visitors = Math.round(1450 * growth * seasonal * noise);
        const sessions = Math.round(visitors * faker.number.float({min: 1.18, max: 1.4}));
        const pageviews = Math.round(sessions * faker.number.float({min: 2.2, max: 3.9}));
        const bounceRate = Math.min(0.7, faker.number.float({min: 0.36, max: 0.5}) * (weekend ? 1.08 : 1));
        const bounces = Math.round(sessions * bounceRate);
        const avgSeconds = faker.number.int({min: 96, max: 208});
        const conversionRate = Math.min(0.06, faker.number.float({min: 0.019, max: 0.038}) * growth);
        const conversions = Math.round(sessions * conversionRate);
        const aov = faker.number.int({min: 52, max: 124});

        result.push({
            date,
            visitors,
            newVisitors: Math.round(visitors * faker.number.float({min: 0.56, max: 0.72})),
            sessions,
            pageviews,
            bounces,
            durationSeconds: sessions * avgSeconds,
            conversions,
            revenue: conversions * aov
        });
    }

    return result;
}

function makeChannels(metrics: DayMetric[]): ChannelStat[] {
    return CHANNELS.map(channel => {
        const weight = CHANNEL_WEIGHTS[channel];
        const daily = metrics.map(metric => Math.round(metric.sessions * weight * faker.number.float({min: 0.82, max: 1.18})));
        const sessions = daily.reduce((acc, value) => acc + value, 0);
        const conversionRate = Math.min(0.085, faker.number.float({min: 0.012, max: 0.05}) * (channel === 'paid' || channel === 'email' ? 1.5 : 1));
        const bounceRate = Math.min(0.78, faker.number.float({min: 0.34, max: 0.58}) * (channel === 'social' ? 1.2 : 1));
        const avgSeconds = faker.number.int({min: 78, max: 236});

        return {
            channel,
            sessions,
            conversionRate,
            bounceRate,
            avgSeconds,
            revenue: Math.round(sessions * conversionRate * faker.number.int({min: 52, max: 124})),
            daily
        };
    });
}

function makePages(): PageStat[] {
    return PAGE_DEFS
        .map((def, index) => {
            const pageviews = Math.round(def.weight * faker.number.int({min: 560, max: 720}));
            const bounceRate = Math.min(0.82, faker.number.float({min: 0.28, max: 0.66}));

            return {
                id: `pg${index + 1}`,
                path: def.path,
                title: def.title,
                section: def.section,
                pageviews,
                uniqueViews: Math.round(pageviews * faker.number.float({min: 0.62, max: 0.86})),
                avgSeconds: faker.number.int({min: 28, max: 268}),
                bounceRate,
                exitRate: Math.min(0.9, bounceRate * faker.number.float({min: 0.9, max: 1.35})),
                entrances: Math.round(pageviews * faker.number.float({min: 0.18, max: 0.62}))
            };
        })
        .sort((a, b) => b.pageviews - a.pageviews);
}

function makeReferrers(): ReferrerStat[] {
    return REFERRER_DEFS
        .map(def => ({
            domain: def.domain,
            channel: def.channel,
            sessions: faker.number.int({min: 320, max: 18500})
        }))
        .sort((a, b) => b.sessions - a.sessions);
}

function makeCampaigns(): Campaign[] {
    return CAMPAIGN_DEFS.map((def, index) => {
        const status = faker.helpers.arrayElement(['active', 'active', 'active', 'paused', 'ended'] as CampaignStatus[]);
        const clicks = faker.number.int({min: 1200, max: 28000});
        const sessions = Math.round(clicks * faker.number.float({min: 0.72, max: 0.94}));
        const conversions = Math.round(sessions * faker.number.float({min: 0.015, max: 0.07}));
        const cost = faker.number.int({min: 800, max: 14000});

        return {
            id: `cmp${index + 1}`,
            name: def.name,
            source: def.source,
            medium: def.medium,
            status,
            clicks,
            sessions,
            cost,
            conversions,
            revenue: conversions * faker.number.int({min: 60, max: 180})
        };
    });
}

function makeDevices(totalSessions: number): DeviceStat[] {
    const split: Record<DeviceType, number> = {desktop: 0.56, mobile: 0.38, tablet: 0.06};

    return (Object.keys(split) as DeviceType[]).map(device => ({
        device,
        sessions: Math.round(totalSessions * split[device] * faker.number.float({min: 0.95, max: 1.05})),
        bounceRate: faker.number.float({min: device === 'mobile' ? 0.46 : 0.34, max: device === 'mobile' ? 0.62 : 0.5}),
        avgSeconds: faker.number.int({min: device === 'desktop' ? 150 : 90, max: device === 'desktop' ? 240 : 170})
    }));
}

function makeNameCounts(names: string[], min: number, max: number): NameCount[] {
    return names
        .map(name => ({name, value: faker.number.int({min, max})}))
        .sort((a, b) => b.value - a.value);
}

function makeCountries(totalSessions: number): CountryStat[] {
    const sessions = weightedList(COUNTRY_DEFS, totalSessions);

    return COUNTRY_DEFS
        .map((def, index) => ({
            name: def.name,
            code: def.code,
            sessions: sessions[index],
            users: Math.round(sessions[index] * faker.number.float({min: 0.78, max: 0.92}))
        }))
        .sort((a, b) => b.sessions - a.sessions);
}

function makeEvents(): EventStat[] {
    const defs: { name: string; event: EventName; base: number; value?: number }[] = [
        {name: 'Pageview', event: 'pageview', base: 540000},
        {name: 'Scroll depth 75%', event: 'scroll', base: 188000},
        {name: 'Outbound click', event: 'click', base: 96000},
        {name: 'Site search', event: 'search', base: 41000},
        {name: 'CTA click', event: 'click', base: 38000},
        {name: 'Sign up started', event: 'signup', base: 14800},
        {name: 'Form submit', event: 'form_submit', base: 12600},
        {name: 'Video play', event: 'video_play', base: 9400},
        {name: 'Add to cart', event: 'add_to_cart', base: 7300, value: 64},
        {name: 'Download', event: 'download', base: 5200},
        {name: 'Purchase', event: 'purchase', base: 3100, value: 92}
    ];

    return defs
        .map(def => {
            const count = Math.round(def.base * faker.number.float({min: 0.9, max: 1.1}));

            return {
                name: def.name,
                event: def.event,
                count,
                users: Math.round(count * faker.number.float({min: 0.55, max: 0.82})),
                value: def.value ? Math.round(count * def.value) : 0
            };
        })
        .sort((a, b) => b.count - a.count);
}

function makeGoals(): Goal[] {
    const defs: { name: string; type: GoalType }[] = [
        {name: 'Trial sign-up', type: 'signup'},
        {name: 'Demo requested', type: 'contact'},
        {name: 'Newsletter subscribe', type: 'subscribe'},
        {name: 'Whitepaper download', type: 'download'},
        {name: 'Plan purchased', type: 'purchase'}
    ];

    return defs.map((def, index) => {
        const completions = faker.number.int({min: 480, max: 9200});
        const conversionRate = faker.number.float({min: 0.008, max: 0.06});
        const unitValue = def.type === 'purchase' ? faker.number.int({min: 80, max: 160}) : faker.number.int({min: 0, max: 40});

        return {
            id: `goal${index + 1}`,
            name: def.name,
            type: def.type,
            completions,
            conversionRate,
            value: completions * unitValue
        };
    });
}

function makeFunnel(): FunnelStep[] {
    const steps = ['Visited site', 'Viewed pricing', 'Started sign-up', 'Created account', 'Activated', 'Purchased'];
    let users = faker.number.int({min: 78000, max: 92000});

    return steps.map((name, index) => {
        const step = {name, users: Math.round(users)};
        users *= faker.number.float({min: index === 0 ? 0.36 : 0.52, max: index === 0 ? 0.48 : 0.78});
        return step;
    });
}

function makeHeatmap(): HeatCell[] {
    const cells: HeatCell[] = [];

    for (const weekday of WEEKDAYS) {
        const weekend = weekday === 'Sat' || weekday === 'Sun';

        for (let hour = 0; hour < 24; hour++) {
            const daylight = hour >= 8 && hour <= 20 ? 1 : 0.32;
            const peak = hour >= 9 && hour <= 17 ? 1.4 : 1;
            const base = 100 * daylight * peak * (weekend ? 0.6 : 1);

            cells.push({
                weekday,
                hour,
                value: Math.round(base * faker.number.float({min: 0.7, max: 1.25}))
            });
        }
    }

    return cells;
}

function makeEventLog(pages: PageStat[]): EventLogRow[] {
    const events: EventName[] = ['pageview', 'pageview', 'pageview', 'click', 'scroll', 'search', 'signup', 'form_submit', 'video_play', 'add_to_cart', 'download', 'purchase'];
    const devices: DeviceType[] = ['desktop', 'desktop', 'mobile', 'mobile', 'tablet'];

    return Array.from({length: 420}, (_, index) => {
        const event = faker.helpers.arrayElement(events);
        const value = event === 'purchase' ? faker.number.int({min: 39, max: 480}) : event === 'add_to_cart' ? faker.number.int({min: 19, max: 220}) : 0;

        return {
            id: `ev${index + 1}`,
            timestamp: NOW.minus({minutes: faker.number.int({min: 1, max: 7 * 24 * 60})}),
            event,
            page: faker.helpers.arrayElement(pages).path,
            channel: faker.helpers.arrayElement(CHANNELS),
            country: faker.helpers.arrayElement(COUNTRY_DEFS).name,
            device: faker.helpers.arrayElement(devices),
            value
        };
    }).sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
}

function makeAlerts(): Alert[] {
    const defs: { type: AlertType; title: string; body: string; to: Alert['to'] }[] = [
        {type: 'spike', title: 'Traffic spike detected', body: 'Visitors are up 38% versus the same hour last week, led by Product Hunt.', to: {name: 'acquisition'}},
        {type: 'goal', title: 'Goal milestone reached', body: 'Trial sign-ups passed 1,000 completions this month.', to: {name: 'conversions'}},
        {type: 'anomaly', title: 'Bounce rate anomaly', body: 'The /pricing page bounce rate jumped to 71% in the last 24 hours.', to: {name: 'behavior'}},
        {type: 'drop', title: 'Paid traffic dropped', body: 'Paid search sessions fell 22% — check the Holiday Sale campaign budget.', to: {name: 'acquisition'}},
        {type: 'spike', title: 'Mobile conversions rising', body: 'Mobile conversion rate is up 12% week over week.', to: {name: 'audience'}},
        {type: 'system', title: 'Weekly report ready', body: 'Your scheduled analytics digest for last week is available.', to: {name: 'reports'}}
    ];

    return defs.map((def, index) => ({
        id: `al${index + 1}`,
        type: def.type,
        title: def.title,
        body: def.body,
        createdAt: NOW.minus({hours: faker.number.int({min: 1, max: 70})}),
        read: faker.datatype.boolean({probability: 0.4}),
        to: def.to
    })).sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
}

export type Seed = {
    account: Account;
    metrics: DayMetric[];
    channels: ChannelStat[];
    pages: PageStat[];
    referrers: ReferrerStat[];
    campaigns: Campaign[];
    devices: DeviceStat[];
    browsers: NameCount[];
    operatingSystems: NameCount[];
    languages: NameCount[];
    ageGroups: NameCount[];
    genders: NameCount[];
    countries: CountryStat[];
    events: EventStat[];
    searchTerms: NameCount[];
    goals: Goal[];
    funnel: FunnelStep[];
    heatmap: HeatCell[];
    eventLog: EventLogRow[];
    alerts: Alert[];
};

export function createSeed(): Seed {
    // Re-seed on every call so a "reset" reproduces the exact initial data set.
    faker.seed(20260619);

    const metrics = makeMetrics();
    const totalSessions = metrics.reduce((acc, metric) => acc + metric.sessions, 0);

    const pages = makePages();

    return {
        account: {
            name: 'Avery Quinn',
            email: 'avery@pulse.io',
            initials: 'AQ',
            property: 'app.pulse.io'
        },
        metrics,
        channels: makeChannels(metrics),
        pages,
        referrers: makeReferrers(),
        campaigns: makeCampaigns(),
        devices: makeDevices(totalSessions),
        browsers: makeNameCounts(['Chrome', 'Safari', 'Edge', 'Firefox', 'Samsung Internet', 'Opera', 'Other'], 4200, 286000),
        operatingSystems: makeNameCounts(['Windows', 'macOS', 'iOS', 'Android', 'Linux', 'Other'], 5200, 264000),
        languages: makeNameCounts(['English (US)', 'English (UK)', 'German', 'French', 'Spanish', 'Dutch', 'Portuguese', 'Japanese'], 3400, 312000),
        ageGroups: [
            {name: '18–24', value: faker.number.int({min: 9, max: 16})},
            {name: '25–34', value: faker.number.int({min: 30, max: 38})},
            {name: '35–44', value: faker.number.int({min: 20, max: 27})},
            {name: '45–54', value: faker.number.int({min: 12, max: 18})},
            {name: '55–64', value: faker.number.int({min: 6, max: 11})},
            {name: '65+', value: faker.number.int({min: 3, max: 7})}
        ],
        genders: [
            {name: 'Male', value: faker.number.int({min: 52, max: 60})},
            {name: 'Female', value: faker.number.int({min: 36, max: 44})},
            {name: 'Other', value: faker.number.int({min: 2, max: 5})}
        ],
        countries: makeCountries(totalSessions),
        events: makeEvents(),
        searchTerms: makeNameCounts(SEARCH_TERMS, 60, 4200),
        goals: makeGoals(),
        funnel: makeFunnel(),
        heatmap: makeHeatmap(),
        eventLog: makeEventLog(pages),
        alerts: makeAlerts()
    };
}
