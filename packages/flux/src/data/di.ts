import type { ComponentInternalInstance, InjectionKey, Ref } from 'vue';
import type { Breakpoint, Breakpoints } from '@/composable';
import type { FluxFilterState, FluxFilterValue } from './filter';

export const FluxBreakpointsInjectionKey: InjectionKey<FluxBreakpointsInjection> = Symbol();
export const FluxDashboardInjectionKey: InjectionKey<FluxDashboardInjection> = Symbol();
export const FluxExpandableGroupInjectionKey: InjectionKey<FluxExpandableGroupInjection> = Symbol();
export const FluxFlyoutInjectionKey: InjectionKey<FluxFlyoutInjection> = Symbol();
export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();
export const FluxFormFieldInjectionKey: InjectionKey<FluxFormFieldInjection> = Symbol();
export const FluxTableInjectionKey: InjectionKey<FluxTableInjection> = Symbol();

export type FluxBreakpointsInjection = {
    readonly breakpoint: Ref<Breakpoint>;
    readonly breakpoints: Ref<Breakpoints>;
    readonly isDesktop: Ref<boolean>;
    readonly isMobile: Ref<boolean>;
    readonly maxWidth: Ref<number | null>;
    readonly width: Ref<number>;
};

export type FluxDashboardInjection = {
    readonly isNavigationCollapsed: Ref<boolean>;
};

export type FluxExpandableGroupInjection = {
    closeAll(): void;
    register(uid: number, expandable: ComponentInternalInstance): void;
    unregister(uid: number): void;
};

export type FluxFilterInjection = {
    readonly state: Ref<FluxFilterState>;

    back(): void;
    reset(name: string | number): void;
    getValue(name: string | number): FluxFilterValue | undefined;
    hasValue(name: string | number): boolean;
    setValue(name: string | number, value?: FluxFilterValue): void;
};

export type FluxFlyoutInjection = {
    readonly isClosing: Ref<boolean>;
    readonly isOpen: Ref<boolean>;
    readonly isOpening: Ref<boolean>;
};

export type FluxFormFieldInjection = {
    readonly id: Ref<string>;
};

export type FluxTableInjection = {
    readonly isBordered: Ref<boolean>;
    readonly isHoverable: Ref<boolean>;
    readonly isSeparated: Ref<boolean>;
    readonly isStriped: Ref<boolean>;
};
