import { ref } from 'vue';
import type { Channel, DeviceType, EventName, LiveEvent } from '@/types';

type ActivePage = { path: string; title: string; users: number };
type ActiveCountry = { name: string; code: string; users: number };
type ActiveSource = { channel: Channel; users: number };
type ActiveDevice = { device: DeviceType; users: number };

const LIVE_PAGES: { path: string; title: string }[] = [
    {path: '/', title: 'Home'},
    {path: '/pricing', title: 'Pricing'},
    {path: '/blog/product-analytics-guide', title: 'The product analytics guide'},
    {path: '/docs/getting-started', title: 'Getting started'},
    {path: '/dashboard', title: 'App dashboard'},
    {path: '/signup', title: 'Sign up'},
    {path: '/features', title: 'Features'},
    {path: '/integrations', title: 'Integrations'}
];

const LIVE_COUNTRIES: { name: string; code: string }[] = [
    {name: 'United States', code: 'US'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'Germany', code: 'DE'},
    {name: 'India', code: 'IN'},
    {name: 'Canada', code: 'CA'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'France', code: 'FR'},
    {name: 'Australia', code: 'AU'}
];

const LIVE_EVENTS: EventName[] = ['pageview', 'pageview', 'pageview', 'click', 'scroll', 'search', 'signup', 'add_to_cart', 'purchase', 'video_play'];
const LIVE_DEVICES: DeviceType[] = ['desktop', 'mobile', 'tablet'];

const activeUsers = ref(0);
const perMinute = ref<number[]>([]);
const liveEvents = ref<LiveEvent[]>([]);
const activePages = ref<ActivePage[]>([]);
const activeCountries = ref<ActiveCountry[]>([]);
const activeSources = ref<ActiveSource[]>([]);
const activeDevices = ref<ActiveDevice[]>([]);

let timer: ReturnType<typeof setInterval> | null = null;
let seeded = false;
let counter = 0;

function pick<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function distribute<T>(items: T[], total: number, build: (item: T, users: number) => unknown): unknown[] {
    const weights = items.map(() => Math.random() + 0.15);
    const sum = weights.reduce((acc, value) => acc + value, 0);
    return items.map((item, index) => build(item, Math.max(1, Math.round((weights[index] / sum) * total))));
}

function newLiveEvent(): LiveEvent {
    const page = pick(LIVE_PAGES);
    return {
        id: `live${counter++}`,
        event: pick(LIVE_EVENTS),
        page: page.path,
        country: pick(LIVE_COUNTRIES).name,
        device: pick(LIVE_DEVICES),
        secondsAgo: 0
    };
}

function seedInitial(): void {
    activeUsers.value = randomInt(180, 320);
    perMinute.value = Array.from({length: 30}, () => randomInt(40, 160));
    liveEvents.value = Array.from({length: 8}, () => {
        const event = newLiveEvent();
        event.secondsAgo = randomInt(2, 90);
        return event;
    }).sort((a, b) => a.secondsAgo - b.secondsAgo);

    refreshBreakdowns();
    seeded = true;
}

function refreshBreakdowns(): void {
    const total = activeUsers.value;
    activePages.value = (distribute(LIVE_PAGES, total, (page, users) => ({...page, users})) as ActivePage[]).sort((a, b) => b.users - a.users).slice(0, 6);
    activeCountries.value = (distribute(LIVE_COUNTRIES, total, (country, users) => ({...country, users})) as ActiveCountry[]).sort((a, b) => b.users - a.users).slice(0, 6);
    activeSources.value = (distribute(['direct', 'organic', 'social', 'referral', 'paid', 'email'] as Channel[], total, (channel, users) => ({channel, users})) as ActiveSource[]).sort((a, b) => b.users - a.users);
    activeDevices.value = distribute(LIVE_DEVICES, total, (device, users) => ({device, users})) as ActiveDevice[];
}

function tick(): void {
    // Random walk on the active users count.
    activeUsers.value = Math.max(60, activeUsers.value + randomInt(-18, 20));

    // Shift the per-minute pageview series by one bucket.
    const next = [...perMinute.value.slice(1), randomInt(40, 170)];
    perMinute.value = next;

    // Age the existing events and occasionally prepend a fresh one.
    const aged = liveEvents.value.map(event => ({...event, secondsAgo: event.secondsAgo + 2}));
    if (Math.random() < 0.85) {
        aged.unshift(newLiveEvent());
    }
    liveEvents.value = aged.slice(0, 14);

    refreshBreakdowns();
}

export function useRealtimeStore() {
    function start(): void {
        if (!seeded) {
            seedInitial();
        }

        if (timer === null) {
            timer = setInterval(tick, 2000);
        }
    }

    function stop(): void {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    }

    return {
        activeUsers,
        perMinute,
        liveEvents,
        activePages,
        activeCountries,
        activeSources,
        activeDevices,
        start,
        stop
    };
}
