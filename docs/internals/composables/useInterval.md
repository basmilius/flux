# useInterval

This composable function is used to run a function on an interval. The interval is automatically disposed when the component unmounts.

## Usage

```ts
import { useInterval } from '@flux-ui/internals';

useInterval(1000, () => {
    console.log('Another second has passed!');
});
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useInterval(
    interval: Ref<number> | number,
    fn: Function
): void;
```

## Used by

- [Fader](../../guide/components/fader)
