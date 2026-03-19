import type { FluxCommandSource, FluxCommandSourceItem, FluxCommandSubAction } from '@flux-ui/types';
import { computed, nextTick, type Ref, ref, unref, watch } from 'vue';

export type CommandPaletteResultItem = {
    readonly globalIndex: number;
    readonly sourceKey: string;
    readonly sourceLabel: string;
    readonly item: FluxCommandSourceItem;
};

export type CommandPaletteGroup = {
    readonly sourceKey: string;
    readonly sourceLabel: string;
    readonly startIndex: number;
    readonly items: CommandPaletteResultItem[];
};

export function useCommandPalette(params: {
    readonly sources: Ref<FluxCommandSource[]>;
    readonly itemRefs: Readonly<Ref<Array<{ readonly $el: HTMLElement; }> | null | undefined>>;
}): {
    readonly search: Ref<string>;
    readonly activeTab: Ref<string | null>;
    readonly highlightedIndex: Ref<number>;
    readonly subActionTarget: Ref<FluxCommandSourceItem | null>;
    readonly filteredItems: Ref<CommandPaletteResultItem[]>;
    readonly groupedItems: Ref<CommandPaletteGroup[]>;
    readonly subActions: Ref<FluxCommandSubAction[]>;
    readonly activeTabSource: Ref<FluxCommandSource | null>;
    readonly tabs: Ref<FluxCommandSource[]>;
    readonly totalItems: Ref<number>;
    setSearch: (value: string) => void;
    setActiveTab: (key: string | null) => void;
    enterSubActions: (item: FluxCommandSourceItem) => void;
    onKeyNavigate: (evt: KeyboardEvent, onClose: () => void) => void;
    reset: () => void;
} {
    const search = ref('');
    const activeTab = ref<string | null>(null);
    const highlightedIndex = ref(-1);
    const subActionTarget = ref<FluxCommandSourceItem | null>(null);
    const isKeyboardNav = ref(false);
    const savedState = ref<{ readonly search: string; readonly highlightedIndex: number; } | null>(null);

    const filteredItems = computed<CommandPaletteResultItem[]>(() => {
        const query = unref(search).toLowerCase().trim();
        const tab = unref(activeTab);
        const sources = unref(params.sources);
        const results: CommandPaletteResultItem[] = [];

        for (const source of sources) {
            if (tab && source.key !== tab) {
                continue;
            }

            for (const item of source.items) {
                if (query && !item.label.toLowerCase().includes(query) && !(item.subLabel?.toLowerCase().includes(query) ?? false)) {
                    continue;
                }

                results.push({
                    globalIndex: results.length,
                    sourceKey: source.key,
                    sourceLabel: source.label,
                    item
                });
            }
        }

        return results;
    });

    const groupedItems = computed<CommandPaletteGroup[]>(() => {
        const items = unref(filteredItems);
        const groups = new Map<string, CommandPaletteGroup>();

        for (const result of items) {
            if (!groups.has(result.sourceKey)) {
                groups.set(result.sourceKey, {
                    sourceKey: result.sourceKey,
                    sourceLabel: result.sourceLabel,
                    startIndex: result.globalIndex,
                    items: []
                });
            }

            (groups.get(result.sourceKey)!.items as CommandPaletteResultItem[]).push(result);
        }

        return Array.from(groups.values());
    });

    const tabs = computed(() => unref(params.sources).filter(source => source.tab));

    const activeTabSource = computed<FluxCommandSource | null>(() => {
        const tab = unref(activeTab);

        if (!tab) {
            return null;
        }

        return unref(tabs).find(source => source.key === tab) ?? null;
    });

    const subActions = computed(() => {
        const actions = unref(subActionTarget)?.subActions ?? [];
        const query = unref(search).toLowerCase().trim();

        if (!query) {
            return actions;
        }

        return actions.filter(action => action.label.toLowerCase().includes(query));
    });

    const totalItems = computed(() => {
        if (unref(subActionTarget)) {
            return unref(subActions).length;
        }

        return unref(filteredItems).length;
    });

    function setSearch(value: string): void {
        search.value = value;
        highlightedIndex.value = -1;
    }

    function setActiveTab(key: string | null): void {
        activeTab.value = key;
        search.value = '';
        highlightedIndex.value = -1;
        subActionTarget.value = null;
    }

    function selectHighlighted(): void {
        const index = unref(highlightedIndex);
        const target = unref(subActionTarget);

        if (target) {
            const action = unref(subActions)[index];

            if (action) {
                action.onActivate();
            }

            return;
        }

        const result = unref(filteredItems)[index];

        if (!result) {
            return;
        }

        if (result.item.subActions?.length) {
            enterSubActions(result.item);
        } else {
            result.item.onActivate();
        }
    }

    function enterSubActions(item: FluxCommandSourceItem): void {
        savedState.value = {search: unref(search), highlightedIndex: unref(highlightedIndex)};
        subActionTarget.value = item;
        search.value = '';
        highlightedIndex.value = 0;
    }

    function navigateTab(direction: number): void {
        const allTabs = unref(tabs);

        if (allTabs.length === 0) {
            return;
        }

        const tabKeys: (string | null)[] = [null, ...allTabs.map(tab => tab.key)];
        const currentIndex = tabKeys.indexOf(unref(activeTab));
        const nextIndex = (currentIndex + direction + tabKeys.length) % tabKeys.length;

        setActiveTab(tabKeys[nextIndex]);
    }

    function restoreState(): void {
        subActionTarget.value = null;
        const state = unref(savedState);

        if (state) {
            search.value = state.search;
            isKeyboardNav.value = true;
            highlightedIndex.value = state.highlightedIndex;
            savedState.value = null;
        } else {
            highlightedIndex.value = -1;
        }
    }

    function onKeyNavigate(evt: KeyboardEvent, onClose: () => void): void {
        const total = unref(totalItems);
        const current = unref(highlightedIndex);

        switch (evt.key) {
            case 'ArrowDown':
                evt.preventDefault();
                isKeyboardNav.value = true;
                highlightedIndex.value = Math.min(total - 1, current + 1);
                break;

            case 'ArrowUp':
                evt.preventDefault();
                isKeyboardNav.value = true;
                highlightedIndex.value = Math.max(0, current - 1);
                break;

            case 'ArrowLeft':
                if (!unref(search) && !unref(subActionTarget)) {
                    evt.preventDefault();
                    navigateTab(-1);
                }

                break;

            case 'ArrowRight':
                if (!unref(search) && !unref(subActionTarget)) {
                    evt.preventDefault();
                    navigateTab(1);
                }

                break;

            case 'Enter':
                evt.preventDefault();
                selectHighlighted();
                break;

            case 'Escape':
                evt.preventDefault();

                if (unref(subActionTarget)) {
                    restoreState();
                } else {
                    onClose();
                }

                break;

            case 'Backspace':
                if (!unref(search)) {
                    if (unref(subActionTarget)) {
                        evt.preventDefault();
                        restoreState();
                    } else if (unref(activeTab)) {
                        evt.preventDefault();
                        activeTab.value = null;
                        highlightedIndex.value = -1;
                    }
                }

                break;
        }
    }

    function reset(): void {
        search.value = '';
        activeTab.value = null;
        highlightedIndex.value = -1;
        subActionTarget.value = null;
    }

    watch(highlightedIndex, (index) => {
        if (index < 0 || !unref(isKeyboardNav)) {
            return;
        }

        isKeyboardNav.value = false;

        nextTick(() => unref(params.itemRefs)?.[index]?.$el?.scrollIntoView({block: 'nearest'}));
    });

    watch(totalItems, (total) => {
        const current = unref(highlightedIndex);

        if (current >= total) {
            highlightedIndex.value = Math.max(-1, total - 1);
        }
    });

    return {
        search,
        activeTab,
        activeTabSource,
        highlightedIndex,
        subActionTarget,
        filteredItems,
        groupedItems,
        subActions,
        tabs,
        totalItems,
        setSearch,
        setActiveTab,
        enterSubActions,
        onKeyNavigate,
        reset
    };
}
