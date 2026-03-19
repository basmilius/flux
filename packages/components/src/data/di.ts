import type { FluxFilterState, FluxFilterValue } from '@flux-ui/types';
import type { ComponentInternalInstance, InjectionKey, Ref } from 'vue';

export const FluxDisabledInjectionKey: InjectionKey<Ref<boolean>> = Symbol();
export const FluxKanbanInjectionKey: InjectionKey<FluxKanbanInjection> = Symbol();
export const FluxExpandableGroupInjectionKey: InjectionKey<FluxExpandableGroupInjection> = Symbol();
export const FluxFlyoutInjectionKey: InjectionKey<FluxFlyoutInjection> = Symbol();
export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();
export const FluxFormFieldInjectionKey: InjectionKey<FluxFormFieldInjection> = Symbol();
export const FluxTableInjectionKey: InjectionKey<FluxTableInjection> = Symbol();
export const FluxTooltipInjectionKey: InjectionKey<FluxTooltipInjection> = Symbol();

export type FluxKanbanDragState = {
    readonly cardId: string | number;
    readonly fromColumnId: string | number;
    readonly dropColumnId: string | number | null;
    readonly beforeCardId: string | number | null;
};

export type FluxKanbanInjection = {
    readonly dragState: Ref<FluxKanbanDragState | null>;

    registerCard(element: Element, cardId: string | number): void;
    unregisterCard(element: Element): void;
    getCardInfo(element: Element): { readonly cardId: string | number } | undefined;
    startDrag(cardId: string | number, fromColumnId: string | number): void;
    endDrag(): void;
    updateDropTarget(columnId: string | number, beforeCardId: string | number | null): void;
    clearDropTarget(): void;
    commitDrop(): void;
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
    readonly id?: string;
};

export type FluxTableInjection = {
    readonly isBordered: boolean;
    readonly isHoverable: boolean;
    readonly isSeparated: boolean;
    readonly isStriped: boolean;
};

export type FluxTooltipInjection = {
    calculate(): void;
};
