import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { FluxPressableType, FluxTo } from '@flux-ui/types';

export const FluxApplicationInjectionKey: InjectionKey<FluxApplicationInjection> = Symbol();

export type FluxApplicationContextInfo = {
    readonly id: symbol;
    readonly title: string;
    readonly subtitle?: string;
    /**
     * Where this context's back-button navigates — i.e. one level up
     * (typically the parent route). Used by the header inside
     * `FluxApplicationMenuContext` only as a fallback when no parent
     * menu level exists in the slider.
     */
    readonly to?: FluxTo;
    /**
     * Where this context **lives** — i.e. the route that opens this
     * context itself. Used by breadcrumbs to "jump to this level".
     * Defaults to the matched route record's own name (auto-detected
     * via vue-router's `matchedRouteKey`).
     */
    readonly entryTo?: FluxTo;
    readonly href?: string;
    readonly type?: FluxPressableType;
};

export type FluxApplicationInjection = {
    readonly activeContext: ComputedRef<FluxApplicationContextInfo | undefined>;
    readonly contexts: ComputedRef<readonly FluxApplicationContextInfo[]>;
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    readonly showDesktopMenuToggle: Ref<boolean>;
    readonly totalLevels: ComputedRef<number>;
    readonly viewIndex: Ref<number>;
    goToChild(): void;
    goToCurrent(): void;
    goToLevel(index: number): void;
    goToMain(): void;
    goToParent(): void;
    pushContext(info: FluxApplicationContextInfo): void;
    removeContext(id: symbol): void;
};

export type FluxApplicationLayout =
    | 'default'
    | 'full'
    | 'medium'
    | 'narrow';
