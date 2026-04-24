import { computed, type ComputedRef, type Ref } from 'vue';
import type { FluxApplicationContextInfo, FluxApplicationLayout } from '../data';
import useApplicationInjection from './useApplicationInjection';

export default function (): UseApplicationMenu {
    const {
        activeContext,
        contexts,
        isMenuCollapsed,
        layout,
        totalLevels,
        viewIndex,
        goToChild,
        goToCurrent,
        goToLevel,
        goToMain,
        goToParent
    } = useApplicationInjection();

    const isMainMenuVisible = computed(() => viewIndex.value === 0);
    const canGoBack = computed(() => viewIndex.value > 0);
    const canGoForward = computed(() => viewIndex.value < totalLevels.value - 1);

    return {
        activeContext,
        canGoBack,
        canGoForward,
        contexts,
        isMainMenuVisible,
        isMenuCollapsed,
        layout,
        totalLevels,
        viewIndex,

        goToChild,
        goToCurrent,
        goToLevel,
        goToMain,
        goToParent,

        close: () => isMenuCollapsed.value = true,
        open: () => isMenuCollapsed.value = false,
        toggle: () => isMenuCollapsed.value = !isMenuCollapsed.value,

        // Convenience aliases mapping onto the viewIndex model.
        showMainMenu: goToMain,
        showContextMenu: goToCurrent,
        toggleMainMenu: () => {
            if (viewIndex.value === 0) {
                goToCurrent();
            } else {
                goToMain();
            }
        }
    };
}

type UseApplicationMenu = {
    readonly activeContext: ComputedRef<FluxApplicationContextInfo | undefined>;
    readonly canGoBack: ComputedRef<boolean>;
    readonly canGoForward: ComputedRef<boolean>;
    readonly contexts: ComputedRef<readonly FluxApplicationContextInfo[]>;
    readonly isMainMenuVisible: ComputedRef<boolean>;
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    readonly totalLevels: ComputedRef<number>;
    readonly viewIndex: Ref<number>;
    close(): void;
    goToChild(): void;
    goToCurrent(): void;
    goToLevel(index: number): void;
    goToMain(): void;
    goToParent(): void;
    open(): void;
    showContextMenu(): void;
    showMainMenu(): void;
    toggle(): void;
    toggleMainMenu(): void;
};
