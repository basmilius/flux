import type { FluxFilterState, FluxFilterValue } from '@flux-ui/types';
import type { ComponentInternalInstance, InjectionKey, Ref } from 'vue';

export const FluxAdaptiveGroupInjectionKey: InjectionKey<FluxAdaptiveGroupInjection> = Symbol();
export const FluxDisabledInjectionKey: InjectionKey<Ref<boolean>> = Symbol();
export const FluxKanbanInjectionKey: InjectionKey<FluxKanbanInjection> = Symbol();
export const FluxExpandableGroupInjectionKey: InjectionKey<FluxExpandableGroupInjection> = Symbol();
export const FluxFlyoutInjectionKey: InjectionKey<FluxFlyoutInjection> = Symbol();
export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();
export const FluxFormFieldInjectionKey: InjectionKey<FluxFormFieldInjection> = Symbol();
export const FluxTableInjectionKey: InjectionKey<FluxTableInjection> = Symbol();
export const FluxTooltipInjectionKey: InjectionKey<FluxTooltipInjection> = Symbol();

export type FluxKanbanDragMode = 'pointer' | 'keyboard';

export type FluxKanbanDragState = {
    readonly mode: FluxKanbanDragMode;
    readonly cardId: string | number;
    readonly fromColumnId: string | number;
    readonly dropColumnId: string | number | null;
    readonly beforeCardId: string | number | null;
    readonly originBeforeCardId?: string | number | null;
};

export type FluxKanbanColumnDragState = {
    readonly columnId: string | number;
    readonly dropBeforeColumnId: string | number | null;
};

export type FluxKanbanKeyboardDirection = 'up' | 'down' | 'left' | 'right';

export type FluxKanbanInjection = {
    readonly disabled: Ref<boolean>;
    readonly reorderableColumns: Ref<boolean>;
    readonly dragState: Ref<FluxKanbanDragState | null>;
    readonly columnDragState: Ref<FluxKanbanColumnDragState | null>;
    readonly isDropAllowed: Ref<boolean>;

    registerCard(element: Element, cardId: string | number): void;
    unregisterCard(element: Element): void;
    getCardInfo(element: Element): { readonly cardId: string | number } | undefined;
    registerColumn(element: Element, columnId: string | number): void;
    unregisterColumn(element: Element): void;
    getColumnInfo(element: Element): { readonly columnId: string | number } | undefined;
    setBoardElement(element: Element | null): void;
    setColumnBodyElement(columnId: string | number, element: Element | null): void;

    startDrag(cardId: string | number, fromColumnId: string | number): void;
    endDrag(): void;
    updateDropTarget(columnId: string | number, beforeCardId: string | number | null): void;
    clearDropTarget(): void;
    commitDrop(): void;

    grabCard(cardId: string | number, fromColumnId: string | number): void;
    moveKeyboard(direction: FluxKanbanKeyboardDirection): void;
    commitKeyboardDrop(): void;
    cancelKeyboardDrop(): void;
    isCardGrabbed(cardId: string | number): boolean;

    startColumnDrag(columnId: string | number): void;
    endColumnDrag(): void;
    updateColumnDropTarget(beforeColumnId: string | number | null): void;
    commitColumnDrop(): void;
    onPointerMove(clientX: number, clientY: number): void;
};

export type FluxAdaptiveGroupChild = {
    readonly priority: Ref<number>;
    readonly desiredDefaultWidth: Ref<number>;
    readonly desiredFallbackWidth: Ref<number>;
    readonly isDefaultVisible: Ref<boolean>;
};

export type FluxAdaptiveGroupInjection = {
    register(uid: number, child: FluxAdaptiveGroupChild): void;
    unregister(uid: number): void;
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
