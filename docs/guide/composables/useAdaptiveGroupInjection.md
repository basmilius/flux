# useAdaptiveGroupInjection

This composable provides access to the [Adaptive group](../../components/adaptive-group) context. It lets a child register itself so the group can measure it and decide what fits, and drop out again when it unmounts.

## Usage

```ts
import { useAdaptiveGroupInjection } from '@flux-ui/components';

const { register, unregister } = useAdaptiveGroupInjection();
```

## Type declarations

```ts
declare function useAdaptiveGroupInjection(): FluxAdaptiveGroupInjection;

type FluxAdaptiveGroupInjection = {
    register(uid: number, child: FluxAdaptiveGroupChild): void;
    unregister(uid: number): void;
};
```

## Used by

- [Adaptive group](../../components/adaptive-group)
