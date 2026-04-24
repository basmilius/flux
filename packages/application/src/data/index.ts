import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { FluxPressableType, FluxTo } from '@flux-ui/types';

export const FluxApplicationInjectionKey: InjectionKey<FluxApplicationInjection> = Symbol();

export type FluxApplicationContextInfo = {
    readonly id: symbol;
    readonly title: string;
    readonly subtitle?: string;
    readonly to?: FluxTo;
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
    | 'dashboard'
    | 'full'
    | 'medium'
    | 'narrow';
