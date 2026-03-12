# FOCUS_TRAP_LOCKS

A stack-based focus trap manager. Maintains a LIFO (Last In, First Out) stack of focus traps. When a new trap is pushed, the previous one is disabled. When a trap is removed, the previous one is re-enabled.

## Usage

```ts
import { FOCUS_TRAP_LOCKS } from '@flux-ui/internals';

// Add a focus trap
FOCUS_TRAP_LOCKS.add('my-trap', (isEnabled) => {
    console.log('Trap enabled:', isEnabled);
});

// Check if a trap is currently active
if (FOCUS_TRAP_LOCKS.active) {
    console.log('Current trap:', FOCUS_TRAP_LOCKS.current);
}

// Subscribe to changes
const unsubscribe = FOCUS_TRAP_LOCKS.subscribe((isEnabled, focusTraps) => {
    console.log('Focus traps changed:', focusTraps);
});

// Remove the trap
FOCUS_TRAP_LOCKS.remove('my-trap');

// Cleanup subscription
unsubscribe();
```

## Type declarations

```ts
declare const FOCUS_TRAP_LOCKS: FocusTrapLockStack;

interface FocusTrap {
    id: string;
    isEnabled: boolean;
    setEnabled(isEnabled: boolean): void;
}

type FocusTrapListener = (isEnabled: boolean, focusTraps: FocusTrap[]) => void;

declare class FocusTrapLockStack {
    get active(): boolean;
    get current(): FocusTrap | null;
    add(id: string, setEnabled: Function, autoFocus?: boolean): void;
    remove(id: string): void;
    emit(): void;
    subscribe(listener: FocusTrapListener): () => void;
}
```

## Used by

- [useFocusTrap](../composables/useFocusTrap)
- [useFocusTrapLock](../composables/useFocusTrapLock)
- [useFocusTrapSubscription](../composables/useFocusTrapSubscription)
