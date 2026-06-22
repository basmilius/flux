import type { FluxColor, FluxIconName } from '@flux-ui/types';
import type { CampaignStatus, Channel, DeviceType, EventName, GoalType } from '@/types';

const integer = new Intl.NumberFormat('en-US');
const compact = new Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1});
const currency = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0});
const currencyCents = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2});

export function formatNumber(value: number): string {
    return integer.format(Math.round(value));
}

export function formatCompact(value: number): string {
    return compact.format(value);
}

export function formatCurrency(value: number): string {
    return currency.format(value);
}

export function formatCurrencyCents(value: number): string {
    return currencyCents.format(value);
}

// Formats a ratio (0..1) as a percentage string.
export function formatRate(value: number, fractionDigits = 1): string {
    return `${(value * 100).toFixed(fractionDigits)}%`;
}

// Formats an already-percentage number (0..100).
export function formatPercent(value: number, fractionDigits = 0): string {
    return `${value.toFixed(fractionDigits)}%`;
}

export function formatDuration(totalSeconds: number): string {
    const seconds = Math.max(0, Math.round(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;

    if (minutes === 0) {
        return `${rest}s`;
    }

    return `${minutes}m ${String(rest).padStart(2, '0')}s`;
}

export type Trend = {
    readonly value: string;
    readonly color: FluxColor;
    readonly icon: FluxIconName;
};

// Period-over-period delta. When `invert` is set (e.g. bounce rate), a decrease
// is the positive outcome.
export function trend(current: number, previous: number, options: { invert?: boolean } = {}): Trend {
    if (previous === 0) {
        return {value: '—', color: 'gray', icon: 'minus'};
    }

    const pct = ((current - previous) / previous) * 100;
    const up = pct >= 0;
    const good = options.invert ? !up : up;

    return {
        value: `${up ? '+' : ''}${pct.toFixed(1)}%`,
        color: Math.abs(pct) < 0.05 ? 'gray' : good ? 'success' : 'danger',
        icon: up ? 'arrow-trend-up' : 'arrow-trend-down'
    };
}

export type Meta<T extends string> = Record<T, {
    readonly label: string;
    readonly color: FluxColor;
    readonly icon: FluxIconName;
}>;

export const CHANNEL: Meta<Channel> = {
    direct: {label: 'Direct', color: 'gray', icon: 'house'},
    organic: {label: 'Organic search', color: 'success', icon: 'magnifying-glass'},
    social: {label: 'Social', color: 'info', icon: 'share-nodes'},
    referral: {label: 'Referral', color: 'primary', icon: 'link'},
    paid: {label: 'Paid search', color: 'warning', icon: 'bolt'},
    email: {label: 'Email', color: 'danger', icon: 'envelope'}
};

export const DEVICE: Meta<DeviceType> = {
    desktop: {label: 'Desktop', color: 'primary', icon: 'desktop'},
    mobile: {label: 'Mobile', color: 'info', icon: 'mobile'},
    tablet: {label: 'Tablet', color: 'success', icon: 'tablet'}
};

export const CAMPAIGN_STATUS: Meta<CampaignStatus> = {
    active: {label: 'Active', color: 'success', icon: 'circle-check'},
    paused: {label: 'Paused', color: 'warning', icon: 'pause'},
    ended: {label: 'Ended', color: 'gray', icon: 'circle-minus'}
};

export const EVENT: Meta<EventName> = {
    pageview: {label: 'Pageview', color: 'gray', icon: 'eye'},
    click: {label: 'Click', color: 'info', icon: 'arrow-pointer'},
    signup: {label: 'Sign up', color: 'primary', icon: 'user-plus'},
    purchase: {label: 'Purchase', color: 'success', icon: 'cart-shopping'},
    add_to_cart: {label: 'Add to cart', color: 'warning', icon: 'cart-shopping'},
    form_submit: {label: 'Form submit', color: 'info', icon: 'paper-plane'},
    video_play: {label: 'Video play', color: 'danger', icon: 'play'},
    download: {label: 'Download', color: 'primary', icon: 'download'},
    search: {label: 'Search', color: 'info', icon: 'magnifying-glass'},
    scroll: {label: 'Scroll depth', color: 'gray', icon: 'arrow-down'}
};

export const GOAL: Meta<GoalType> = {
    signup: {label: 'Sign up', color: 'primary', icon: 'user-plus'},
    purchase: {label: 'Purchase', color: 'success', icon: 'cart-shopping'},
    subscribe: {label: 'Subscription', color: 'info', icon: 'envelope'},
    contact: {label: 'Contact request', color: 'warning', icon: 'phone'},
    download: {label: 'Download', color: 'danger', icon: 'download'}
};

// A CSS custom-property reference, assignable to FluxStatisticsChartColor.
export type ChartColor = `var(--${string})`;

// Shared chart palette mapped onto the Flux semantic ramps.
export const CHART_PALETTE: ChartColor[] = [
    'var(--primary-400)',
    'var(--info-400)',
    'var(--success-400)',
    'var(--warning-400)',
    'var(--danger-400)',
    'var(--gray-400)'
];

export function paletteColor(index: number): ChartColor {
    return CHART_PALETTE[index % CHART_PALETTE.length];
}
