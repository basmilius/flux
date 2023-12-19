import type { ComponentInternalInstance, ComputedRef, InjectionKey, Ref } from 'vue';
import type { Breakpoint, Breakpoints } from '@/composable';
import type { FluxFilterValue } from './filter';

export const FluxBreakpointsInjectionKey: InjectionKey<FluxBreakpointsInjection> = Symbol();
export const FluxDashboardInjectionKey: InjectionKey<FluxDashboardInjection> = Symbol();
export const FluxExpandableGroupInjectionKey: InjectionKey<FluxExpandableGroupInjection> = Symbol();
export const FluxFlyoutInjectionKey: InjectionKey<FluxFlyoutInjection> = Symbol();
export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();
export const FluxFormFieldInjectionKey: InjectionKey<FluxFormFieldInjection> = Symbol();
export const FluxSkeletonsInjectionKey: InjectionKey<FluxSkeletonsInjection> = Symbol();
export const FluxTableInjectionKey: InjectionKey<FluxTableInjection> = Symbol();

export interface FluxBreakpointsInjection {
    readonly breakpoint: Ref<Breakpoint>;
    readonly breakpoints: Ref<Breakpoints>;
    readonly isDesktop: Ref<boolean>;
    readonly isMobile: Ref<boolean>;
    readonly maxWidth: Ref<number | null>;
    readonly width: Ref<number>;
}

export interface FluxDashboardInjection {
    readonly isNavigationCollapsible: ComputedRef<boolean>;
    readonly isNavigationOpen: Ref<boolean>;
}

export interface FluxExpandableGroupInjection {
    closeAll(): void;

    register(uid: number, expandable: ComponentInternalInstance): void;

    unregister(uid: number): void;
}

export interface FluxFilterInjection {
    readonly state: Ref<Record<string, FluxFilterValue>>;

    back(): void;

    reset(name: string | number): void;

    getValue(name: string | number): FluxFilterValue | undefined;

    hasValue(name: string | number): boolean;

    setValue(name: string | number, value?: FluxFilterValue): void;
}

export interface FluxFlyoutInjection {
    readonly isClosing: Ref<boolean>;
    readonly isOpen: Ref<boolean>;
    readonly isOpening: Ref<boolean>;
}

export interface FluxFormFieldInjection {
    readonly id: Ref<string>;
}

export interface FluxSkeletonsInjection {
    readonly isEnabled: Ref<boolean>;
}

export interface FluxTableInjection {
    readonly isBordered: Ref<boolean>;
    readonly isHoverable: Ref<boolean>;
    readonly isSeparated: Ref<boolean>;
    readonly isStriped: Ref<boolean>;
}
