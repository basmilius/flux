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
import type { Ref } from 'vue';

export declare function useFocusTrapSubscription(
    listener: FocusTrapListener
): void;

export type FocusTrapListener = (isEnabled: boolean, focusTraps: object[]) => void;
```
