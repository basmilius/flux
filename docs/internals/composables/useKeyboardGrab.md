# useKeyboardGrab

A generic keyboard-grab state machine, so anything that can be dragged with a pointer can be moved with a keyboard too. It maps <kbd>Space</kbd> and <kbd>Enter</kbd> onto grabbing and dropping, <kbd>Escape</kbd> onto cancelling and the arrow keys onto moving, and announces every one of those to assistive technology.

The movement itself is not part of the composable: `onMove` is called with a direction and the host decides what that means in its own topology.

## Usage

```ts
import { useKeyboardGrab } from '@flux-ui/internals';
import { ref } from 'vue';

const {isGrabbed, handleKeyDown, release} = useKeyboardGrab({
    isDraggable,
    itemId,
    grabbedId,
    onGrab: () => ({column: columnId.value, index: index.value}),
    onMove: direction => move(direction),
    onCommit: origin => commit(origin),
    onCancel: origin => restore(origin)
});
```

Bind `handleKeyDown` to the item's `keydown` and use `isGrabbed` to style the item while it is being moved.

::: tip
`grabbedId` is shared state: the id of the item that is currently grabbed, owned by the surrounding list. `itemId` is the item's own id, which is what makes `isGrabbed` true for exactly one item at a time.
:::

::: info
The value `onGrab` returns is handed back to `onCommit` and `onCancel` as `origin`, which is what makes a cancel restore the original position. It is best effort: a host that remounts mid-grab loses it, and both callbacks then receive `null`.
:::

## Announcements

Messages are announced through `defaultKeyboardGrabAnnounce`, which writes into a single polite live region appended to the document. Pass an `announce` of your own to route them elsewhere, for example through your application's own live region or to translate them.

```ts
import { defaultKeyboardGrabAnnounce } from '@flux-ui/internals';

defaultKeyboardGrabAnnounce('Dropped');
```

## Type declarations

```ts
import type { ComputedRef, Ref } from 'vue';

declare function useKeyboardGrab<TPos>(options: UseKeyboardGrabOptions<TPos>): UseKeyboardGrabReturn;

declare function defaultKeyboardGrabAnnounce(message: string): void;

type KeyboardGrabDirection = 'up' | 'down' | 'left' | 'right';

type UseKeyboardGrabOptions<TPos> = {
    readonly isDraggable: Ref<boolean>;
    readonly itemId: Ref<string | number | null | undefined>;
    readonly grabbedId: Ref<string | number | null>;
    onGrab(): TPos;
    onMove(direction: KeyboardGrabDirection): void;
    onCommit(origin: TPos | null): void;
    onCancel(origin: TPos | null): void;
    announce?(message: string): void;
};

type UseKeyboardGrabReturn = {
    readonly isGrabbed: ComputedRef<boolean>;
    handleKeyDown(evt: KeyboardEvent): void;
    release(): void;
};
```

## Used by

- [Calendar](../../components/calendar/)
- [Kanban item](../../components/kanban/item)
- [Repeater](../../components/form/repeater)
