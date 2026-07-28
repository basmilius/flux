# useFocusTrapSubscription

This composable function is used to subscribe to focus locking of a component instance.

## Usage

```ts
import { useFocusTrapSubscription } from '@flux-ui/internals';

useFocusTrapSubscription(() => {
    console.log('Focus trap changed!');
});
```

## Type declarations

```ts
export declare function useFocusTrapSubscription(
    listener: FocusTrapListener
): void;

interface FocusTrap {
    id: string;
    isEnabled: boolean;
    setEnabled(isEnabled: boolean): void;
}

export type FocusTrapListener = (isEnabled: boolean, focusTraps: FocusTrap[]) => void;
```
