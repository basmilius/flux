# useTooltipInjection

This composable provides access to the [Tooltip](../../components/tooltip) provider context. It exposes a `calculate` method that triggers tooltip position recalculation.

## Usage

```ts
import { useTooltipInjection } from '@flux-ui/components';

const { calculate } = useTooltipInjection();

// Trigger position recalculation
calculate();
```

## Type declarations

```ts
declare function useTooltipInjection(): {
    calculate(): void;
};
```

## Used by

- [Tooltip](../../components/tooltip)
