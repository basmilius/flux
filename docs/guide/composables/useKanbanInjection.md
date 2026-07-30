# useKanbanInjection

This composable provides access to the [Kanban](../../components/kanban/) context. It carries the drag state of the board and the registration an item or column needs to take part in it: which element belongs to which id, which column the pointer is over, and whether a drop is allowed there.

Reach for it when you render your own item or column and want it to be draggable like the ones that ship with it.

## Usage

```ts
import { useKanbanInjection } from '@flux-ui/components';

const {
    disabled,
    dragState,
    registerItem,
    unregisterItem,
    startDrag
} = useKanbanInjection();
```

## Type declarations

The context is wider than the fragment above; `FluxKanbanInjection` is exported, so the full shape is available to a consumer.

```ts
declare function useKanbanInjection(): FluxKanbanInjection;
```

## Used by

- [Kanban](../../components/kanban/)
