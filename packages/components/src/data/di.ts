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
export const FluxItemControlInjectionKey: InjectionKey<FluxItemControlInjection> = Symbol();
export const FluxMenuFlyoutInjectionKey: InjectionKey<FluxMenuFlyoutInjection> = Symbol();
export const FluxMenuPersistentInjectionKey: InjectionKey<Readonly<Ref<boolean>>> = Symbol();
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

    close(): void;
};

export type FluxItemControlInjection = {
    readonly isControl: Readonly<Ref<boolean>>;

    register(id: string): void;
};

export type FluxMenuFlyoutPointer = {
    readonly x: number;
    readonly y: number;
    // Trailing "anchor" point: the pointer position from roughly TRAIL_LAG ago. Used as the apex
    // of the prediction cone so the safe triangle stays stable even when the pointer moves slowly.
    readonly tx: number;
    readonly ty: number;
    // Smoothed pointer velocity in px/ms (EMA), with its precomputed magnitude.
    readonly vx: number;
    readonly vy: number;
    readonly speed: number;
};

export type FluxMenuFlyoutCone = {
    readonly id: number;
    // Polygon corners. The forward cone is a triangle (a, b, c); the return cone is a trapezium
    // corridor that also uses the optional fourth corner (d).
    readonly ax: number;
    readonly ay: number;
    readonly bx: number;
    readonly by: number;
    readonly cx: number;
    readonly cy: number;
    // Fourth corner, only present for the return corridor (absent → forward triangle).
    readonly dx?: number;
    readonly dy?: number;
    // Pointer "head" position, used to draw the velocity vector in the debug overlay.
    readonly hx: number;
    readonly hy: number;
    // True for the return cone (aiming back from the submenu towards its opener) rather than the
    // forward cone (aiming from the opener into the submenu).
    readonly back: boolean;
};

export type FluxMenuFlyoutEntry = {
    readonly id: number;
    getTrigger(): HTMLElement | null;
    getPopup(): HTMLElement | null;
    readonly isOpen: Ref<boolean>;
    // Whether the pointer was inside this submenu's popup (or an open descendant) within the return
    // window — i.e. the pointer is genuinely travelling back from this submenu, not merely sweeping
    // past its opener. Gates the return cone so a vertical sweep through the column never sticks.
    wasRecentlyInside(): boolean;
    close(): void;
};

export type FluxMenuFlyoutInjection = {
    readonly debugCone: Ref<boolean>;
    readonly pointer: Readonly<Ref<FluxMenuFlyoutPointer>>;
    readonly pointerType: Readonly<Ref<string>>;
    readonly activeCone: Ref<FluxMenuFlyoutCone | null>;
    readonly keyboardStack: Ref<number[]>;

    register(entry: FluxMenuFlyoutEntry): void;
    unregister(entry: FluxMenuFlyoutEntry): void;
    closeOthers(self: FluxMenuFlyoutEntry): void;
    hasOpenDescendant(self: FluxMenuFlyoutEntry): boolean;
    isAimingAtOpenSubmenu(askTrigger: HTMLElement | null): boolean;
    isInsidePopups(target: Node | null): boolean;
    // Returns the trigger element of the flyout that currently owns the active cone, so a menu can tell
    // whether that cone belongs to one of its own items (and should dim only that menu's siblings).
    getActiveConeTrigger(): HTMLElement | null;
    closeAll(): void;
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
