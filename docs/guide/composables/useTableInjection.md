# useTableInjection

This composable provides access to the [Table](../../components/table/) layout context. It exposes the pinned column state and lets custom column headers register themselves so the table can compute its `grid-template-columns`.

## Usage

```ts
import { useTableInjection } from '@flux-ui/components';

const { pinnedEdges, pinnedOffsets, registerColumn } = useTableInjection();
```

## Type declarations

```ts
declare function useTableInjection(): {
    readonly pinnedEdges: Ref<{ readonly end: number; readonly start: number; }>;
    readonly pinnedOffsets: Ref<Map<number, number>>;

    registerColumn(element: Readonly<Ref<HTMLElement | null>>, column: Readonly<Ref<FluxTableColumnDef>>): () => void;
};
```

- `pinnedEdges`: the column index of the last start-pinned column and the first end-pinned column (`-1` when there is none). Used to render the scroll shadow on the outermost pinned column.
- `pinnedOffsets`: the sticky offset in pixels for each pinned column, keyed by column index.
- `registerColumn`: registers a column definition (sizing and pinning) for the table's `grid-template-columns`. Returns an unregister function.

## Used by

- [Table](../../components/table/)
    - [Row](../../components/table/row)
    - [Cell](../../components/table/cell)
    - [Header](../../components/table/header)
