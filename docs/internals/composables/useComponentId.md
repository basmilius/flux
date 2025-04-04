# useComponentId

This composable function returns the unique id of the component.

## Usage

```ts
import { useComponentId } from '@basmilius/flux-internals';

const componentId = useComponentId();
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useComponentId(): Ref<number>;
```

## Used by

- [Expandable](../../guide/components/expandable)
- [Visual](../../guide/components/visual)
    - [Animated colors](../../guide/components/visual/animated-colors)
