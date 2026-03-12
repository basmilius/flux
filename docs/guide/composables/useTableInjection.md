# useTableInjection

This composable provides access to the [Table](../components/table/) styling context. It supplies configuration flags that determine the table's visual appearance.

## Usage

```ts
import { useTableInjection } from '@flux-ui/components';

const { isBordered, isHoverable, isSeparated, isStriped } = useTableInjection();
```

## Type declarations

```ts
declare function useTableInjection(): {
    readonly isBordered: boolean;
    readonly isHoverable: boolean;
    readonly isSeparated: boolean;
    readonly isStriped: boolean;
};
```

## Used by

- [Table](../components/table/)
    - [Row](../components/table/row)
    - [Cell](../components/table/cell)
    - [Header](../components/table/header)
