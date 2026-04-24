import type { InjectionKey, Ref } from 'vue';

export const FluxApplicationInjectionKey: InjectionKey<FluxApplicationInjection> = Symbol();

export type FluxApplicationInjection = {
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    readonly showDesktopMenuToggle: Ref<boolean>;
};

export type FluxApplicationLayout =
    | 'default'
    | 'full'
    | 'medium'
    | 'narrow';
