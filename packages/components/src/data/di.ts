import type { FluxFilterDefinition, FluxFilterState, FluxFilterValue, FluxSize } from '@flux-ui/types';
import type { DateTime } from 'luxon';
import type { ComponentInternalInstance, ComputedRef, InjectionKey, Ref, VNode } from 'vue';

export const FluxAdaptiveGroupInjectionKey: InjectionKey<FluxAdaptiveGroupInjection> = Symbol();
export const FluxCalendarInjectionKey: InjectionKey<FluxCalendarInjection> = Symbol();
export const FluxDisabledInjectionKey: InjectionKey<Ref<boolean>> = Symbol();
export const FluxKanbanInjectionKey: InjectionKey<FluxKanbanInjection> = Symbol();
export const FluxExpandableGroupInjectionKey: InjectionKey<FluxExpandableGroupInjection> = Symbol();
export const FluxFlyoutInjectionKey: InjectionKey<FluxFlyoutInjection> = Symbol();
export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();
export const FluxFormCheckboxGroupInjectionKey: InjectionKey<FluxFormCheckboxGroupInjection> = Symbol();
export const FluxFormFieldInjectionKey: InjectionKey<FluxFormFieldInjection> = Symbol();
export const FluxFormRadioGroupInjectionKey: InjectionKey<FluxFormRadioGroupInjection> = Symbol();
export const FluxSegmentedControlInjectionKey: InjectionKey<FluxSegmentedControlInjection> = Symbol();
export const FluxSplitViewInjectionKey: InjectionKey<FluxSplitViewInjection> = Symbol();
export const FluxTabBarInjectionKey: InjectionKey<FluxTabBarInjection> = Symbol();
export const FluxTableInjectionKey: InjectionKey<FluxTableInjection> = Symbol();
export const FluxTooltipInjectionKey: InjectionKey<FluxTooltipInjection> = Symbol();

export type FluxKanbanDragMode = 'pointer' | 'keyboard';

export type FluxKanbanDragState = {
    readonly mode: FluxKanbanDragMode;
    readonly itemId: string | number;
    readonly fromColumnId: string | number;
    readonly dropColumnId: string | number | null;
    readonly beforeItemId: string | number | null;
    readonly originBeforeItemId?: string | number | null;
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
    readonly grabbedId: Ref<string | number | null>;
    readonly isOverColumnId: Ref<string | number | null>;
    readonly isDropAllowed: Ref<boolean>;

    registerItem(element: Element, itemId: string | number): void;
    unregisterItem(element: Element): void;
    getItemInfo(element: Element): { readonly itemId: string | number } | undefined;
    registerColumn(element: Element, columnId: string | number): void;
    unregisterColumn(element: Element): void;
    getColumnInfo(element: Element): { readonly columnId: string | number } | undefined;
    setBoardElement(element: Element | null): void;
    setColumnBodyElement(columnId: string | number, element: Element | null): void;
    enterColumn(columnId: string | number): void;
    leaveColumn(columnId: string | number): void;

    startDrag(itemId: string | number, fromColumnId: string | number): void;
    endDrag(): void;
    updateDropTarget(columnId: string | number, beforeItemId: string | number | null): void;
    clearDropTarget(): void;
    commitDrop(): void;

    grabItem(itemId: string | number, fromColumnId: string | number): void;
    moveKeyboard(direction: FluxKanbanKeyboardDirection): void;
    commitKeyboardDrop(): void;
    cancelKeyboardDrop(): void;
    isItemGrabbed(itemId: string | number): boolean;

    startColumnDrag(columnId: string | number): void;
    endColumnDrag(): void;
    updateColumnDropTarget(beforeColumnId: string | number | null): void;
    commitColumnDrop(): void;

    cancelAll(): void;
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

export type FluxCalendarView = 'month' | 'week' | 'two-days' | 'day';

export type FluxCalendarKeyboardDirection = 'up' | 'down' | 'left' | 'right';

export type FluxCalendarItemData = {
    readonly id: string | number;
    readonly date: DateTime;
    readonly duration?: number;
    readonly allDay: boolean;
    readonly isClickable: boolean;
    renderContent(): VNode[];
    handleClick(evt: MouseEvent): void;
};

export type FluxCalendarInjection = {
    readonly isDraggable: ComputedRef<boolean>;
    readonly resolvedView: ComputedRef<FluxCalendarView>;
    readonly hourRange: ComputedRef<readonly [number, number]>;
    readonly pixelsPerMinute: ComputedRef<number>;
    readonly snapMinutes: ComputedRef<number>;
    readonly grabbedId: Ref<string | number | null>;

    registerItem(id: string | number, data: FluxCalendarItemData): void;
    unregisterItem(id: string | number): void;

    registerItemElement(element: Element, id: string | number): void;
    unregisterItemElement(element: Element): void;

    onItemDragStart(id: string | number, fromDate: DateTime, evt: DragEvent): void;
    onItemDragEnd(id: string | number): void;

    onItemKeyboardGrab(id: string | number, fromDate: DateTime): void;
    onItemKeyboardMove(direction: FluxCalendarKeyboardDirection): void;
    onItemKeyboardCommit(): void;
    onItemKeyboardCancel(): void;
};

export type FluxExpandableGroupInjection = {
    closeAll(): void;
    register(uid: number, expandable: ComponentInternalInstance): void;
    unregister(uid: number): void;
};

export type FluxFilterInjection = {
    readonly state: Ref<FluxFilterState>;

    back(): void;
    clear(name: string | number): void;
    getDefinition(name: string | number): FluxFilterDefinition | undefined;
    getValue(name: string | number): FluxFilterValue | undefined;
    hasValue(name: string | number): boolean;
    reset(name: string | number): void;
    setValue(name: string | number, value?: FluxFilterValue): void;
};

export type FluxFlyoutInjection = {
    readonly isClosing: Ref<boolean>;
    readonly isOpen: Ref<boolean>;
    readonly isOpening: Ref<boolean>;
};

export type FluxFormFieldInjection = {
    readonly id?: string;
    readonly labelId?: string;
    readonly isGroup?: boolean;

    registerControl?(): string;
};

export type FluxFormCheckboxGroupValue = string | number | boolean;

export type FluxFormCheckboxGroupInjection = {
    readonly modelValue: Ref<FluxFormCheckboxGroupValue[]>;
    readonly disabled: Ref<boolean>;
    readonly isReadonly: Ref<boolean>;
    readonly error: Ref<string | null | undefined>;

    has(value: FluxFormCheckboxGroupValue): boolean;
    toggle(value: FluxFormCheckboxGroupValue): void;
};

export type FluxSplitViewPaneSpec = {
    readonly id: number;
    readonly defaultSize: Ref<number | string | undefined>;
    readonly minSize: Ref<number>;
    readonly maxSize: Ref<number | undefined>;
    readonly isResizable: Ref<boolean>;
};

export type FluxSplitViewInjection = {
    readonly direction: Ref<'horizontal' | 'vertical'>;
    readonly panes: Ref<readonly FluxSplitViewPaneSpec[]>;

    registerPane(spec: FluxSplitViewPaneSpec): void;
    unregisterPane(id: number): void;
    getPaneIndex(id: number): number;
};

export type FluxFormRadioGroupValue = string | number | boolean;

export type FluxFormRadioGroupInjection = {
    readonly name: string;
    readonly modelValue: Ref<FluxFormRadioGroupValue | undefined>;
    readonly disabled: Ref<boolean>;
    readonly isReadonly: Ref<boolean>;
    readonly error: Ref<string | null | undefined>;

    select(value: FluxFormRadioGroupValue): void;
};

export type FluxSegmentedControlValue = string | number;

export type FluxSegmentedControlInjection = {
    readonly modelValue: Ref<FluxSegmentedControlValue | undefined>;
    readonly size: Ref<FluxSize>;

    select(value: FluxSegmentedControlValue): void;
    registerItem(element: HTMLElement, value: FluxSegmentedControlValue): void;
    unregisterItem(element: HTMLElement): void;
};

export type FluxTabBarInjection = {
    readonly isPills: Ref<boolean>;

    registerItem(element: Element, isActive: Ref<boolean>): void;
    unregisterItem(element: Element): void;
};

export type FluxTableInjection = {
    readonly isBordered: Ref<boolean>;
    readonly isHoverable: Ref<boolean>;
    readonly isSeparated: Ref<boolean>;
    readonly isStriped: Ref<boolean>;
};

export type FluxTooltipInjection = {
    calculate(): void;
};
