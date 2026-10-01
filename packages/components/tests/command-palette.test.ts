import { afterAll, afterEach, beforeAll, describe, expect, test } from 'bun:test';
import type { FluxCommandSource, FluxCommandSourceItem } from '@flux-ui/types';
import { effectScope, ref, type EffectScope } from 'vue';
import { useCommandPalette } from '../src/composable/private/useCommandPalette';

const scopes: EffectScope[] = [];
const originalAnimationFrame = globalThis.requestAnimationFrame;

beforeAll(() => {
    globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
});

afterAll(() => {
    globalThis.requestAnimationFrame = originalAnimationFrame;
});

afterEach(() => {
    scopes.splice(0).forEach(scope => scope.stop());
});

function createPalette() {
    const requests: {query: string; resolve(items: FluxCommandSourceItem[]): void}[] = [];
    const sources = ref<FluxCommandSource[]>([{
        key: 'remote', label: 'Remote', tab: true, items: [],
        fetchSearch: query => new Promise(resolve => requests.push({query, resolve}))
    }, {
        key: 'local', label: 'Local', tab: true,
        items: [{id: 'local', label: 'Local item', onActivate() {}}]
    }]);
    const scope = effectScope();
    scopes.push(scope);
    const palette = scope.run(() => useCommandPalette({sources, itemRefs: ref([])}))!;

    return {palette, requests, sources, scope};
}

function result(label: string): FluxCommandSourceItem[] {
    return [{id: label, label, onActivate() {}}];
}

async function waitFor(predicate: () => boolean): Promise<void> {
    const deadline = performance.now() + 2000;

    while (!predicate()) {
        if (performance.now() > deadline) {
            throw new Error('Search request did not start.');
        }

        await Bun.sleep(10);
    }
}

describe('command palette async searches', () => {
    test('ignores old results and loading updates during a new query debounce', async () => {
        const {palette, requests} = createPalette();
        palette.setSearch('a');
        await waitFor(() => requests.length === 1);
        palette.setSearch('ab');
        requests[0].resolve(result('Old result'));
        await Bun.sleep(0);

        expect(palette.filteredItems.value).toEqual([]);
        expect(palette.isLoading.value).toBe(true);
        await waitFor(() => requests.length === 2);
        expect(requests[1].query).toBe('ab');
        requests[1].resolve(result('New result'));
        await Bun.sleep(0);
        expect(palette.filteredItems.value.map(item => item.item.label)).toEqual(['New result']);
        expect(palette.isLoading.value).toBe(false);
        let activated: string | undefined;
        palette.onKeyNavigate({key: 'Enter', preventDefault() {}} as KeyboardEvent, () => {}, item => activated = item.label);
        expect(activated).toBe('New result');
    });

    test('invalidates a cleared query and can search the same text again', async () => {
        const {palette, requests} = createPalette();
        palette.setSearch('a');
        await waitFor(() => requests.length === 1);
        palette.setSearch('');
        requests[0].resolve(result('Old result'));
        await Bun.sleep(0);
        expect(palette.isLoading.value).toBe(false);

        palette.setSearch('a');
        expect(palette.filteredItems.value.filter(item => item.sourceKey === 'remote')).toEqual([]);
        await waitFor(() => requests.length === 2);
        requests[1].resolve(result('Fresh result'));
        await Bun.sleep(0);
        expect(palette.filteredItems.value[0].item.label).toBe('Fresh result');
    });

    test('keeps a local tab usable while a previous remote request finishes', async () => {
        const {palette, requests} = createPalette();
        palette.setSearch('a');
        await waitFor(() => requests.length === 1);
        palette.setActiveTab('local');
        requests[0].resolve(result('Old result'));
        await Bun.sleep(0);

        expect(palette.filteredItems.value.map(item => item.item.label)).toEqual(['Local item']);
        expect(palette.isLoading.value).toBe(false);
        palette.setSearch('Local');
        expect(palette.isLoading.value).toBe(false);
    });

    test('invalidates responses after reset and disposal', async () => {
        const {palette, requests, scope} = createPalette();
        palette.setSearch('a');
        await waitFor(() => requests.length === 1);
        palette.reset();
        requests[0].resolve(result('Before reset'));
        await Bun.sleep(0);
        expect(palette.filteredItems.value.map(item => item.item.label)).toEqual(['Local item']);

        palette.setSearch('ab');
        await waitFor(() => requests.length === 2);
        scope.stop();
        requests[1].resolve(result('After disposal'));
        await Bun.sleep(0);
        expect(palette.filteredItems.value).toEqual([]);
    });

    test('refetches when sources change without another keystroke', async () => {
        const {palette, requests, sources} = createPalette();
        palette.setSearch('a');
        await waitFor(() => requests.length === 1);
        sources.value = [{key: 'new', label: 'New', items: [], fetchSearch: async () => result('Replacement')}];
        requests[0].resolve(result('Old source'));
        await Bun.sleep(0);
        expect(palette.filteredItems.value.map(item => item.item.label)).toEqual(['Replacement']);
        expect(palette.isLoading.value).toBe(false);
    });
});
