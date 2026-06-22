import type { DateTime } from 'luxon';

export type Id = string;

export type Period = '7d' | '28d' | '90d';

export type Channel = 'direct' | 'organic' | 'social' | 'referral' | 'paid' | 'email';
export type DeviceType = 'desktop' | 'mobile' | 'tablet';
export type CampaignStatus = 'active' | 'paused' | 'ended';
export type GoalType = 'signup' | 'purchase' | 'subscribe' | 'contact' | 'download';
export type EventName = 'pageview' | 'click' | 'signup' | 'purchase' | 'add_to_cart' | 'form_submit' | 'video_play' | 'download' | 'search' | 'scroll';
export type AlertType = 'spike' | 'drop' | 'goal' | 'system' | 'anomaly';

export type DayMetric = {
    date: DateTime;
    visitors: number;
    newVisitors: number;
    sessions: number;
    pageviews: number;
    bounces: number;
    durationSeconds: number;
    conversions: number;
    revenue: number;
};

export type ChannelStat = {
    channel: Channel;
    sessions: number;
    conversionRate: number;
    bounceRate: number;
    avgSeconds: number;
    revenue: number;
    daily: number[];
};

export type PageStat = {
    id: Id;
    path: string;
    title: string;
    section: string;
    pageviews: number;
    uniqueViews: number;
    avgSeconds: number;
    bounceRate: number;
    exitRate: number;
    entrances: number;
};

export type ReferrerStat = {
    domain: string;
    channel: Channel;
    sessions: number;
};

export type Campaign = {
    id: Id;
    name: string;
    source: string;
    medium: string;
    status: CampaignStatus;
    clicks: number;
    sessions: number;
    cost: number;
    conversions: number;
    revenue: number;
};

export type DeviceStat = {
    device: DeviceType;
    sessions: number;
    bounceRate: number;
    avgSeconds: number;
};

export type NameCount = {
    name: string;
    value: number;
};

export type CountryStat = {
    name: string;
    code: string;
    sessions: number;
    users: number;
};

export type EventStat = {
    name: string;
    event: EventName;
    count: number;
    users: number;
    value: number;
};

export type Goal = {
    id: Id;
    name: string;
    type: GoalType;
    completions: number;
    conversionRate: number;
    value: number;
};

export type FunnelStep = {
    name: string;
    users: number;
};

export type HeatCell = {
    weekday: string;
    hour: number;
    value: number;
};

export type EventLogRow = {
    id: Id;
    timestamp: DateTime;
    event: EventName;
    page: string;
    channel: Channel;
    country: string;
    device: DeviceType;
    value: number;
};

export type Alert = {
    id: Id;
    type: AlertType;
    title: string;
    body: string;
    createdAt: DateTime;
    read: boolean;
    to: AlertLink | null;
};

export type AlertLink = {
    readonly name: string;
    readonly params?: Record<string, string>;
};

export type Account = {
    name: string;
    email: string;
    initials: string;
    property: string;
};

export type LiveEvent = {
    id: Id;
    event: EventName;
    page: string;
    country: string;
    device: DeviceType;
    secondsAgo: number;
};
