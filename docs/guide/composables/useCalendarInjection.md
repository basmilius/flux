# useCalendarInjection

This composable provides access to the [Calendar](../../components/calendar/) context. It carries everything an item needs to place itself on the grid and to be moved: the resolved view, the hour range, how many pixels a minute is worth, the snap interval, and the callbacks for dragging an item or moving it with the keyboard.

Reach for it when you render your own item inside a calendar view and want it to behave like the ones that ship with it.

## Usage

```ts
import { useCalendarInjection } from '@flux-ui/components';

const {
    isDraggable,
    resolvedView,
    pixelsPerMinute,
    registerItem,
    onItemDragStart
} = useCalendarInjection();
```

## Type declarations

The context is wider than the fragment above; `FluxCalendarInjection` is exported, so the full shape is available to a consumer.

```ts
declare function useCalendarInjection(): FluxCalendarInjection;

type FluxCalendarInjection = {
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
```

## Used by

- [Calendar](../../components/calendar/)
